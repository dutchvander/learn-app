import Stripe from "stripe";
// import { Course } from "../models/course.model";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    // Taux de change fixe (1 USD = 137.5 DZD ici, vous devez utiliser un taux réel)
    const exchangeRate = 137.5; // Exemple : 1 USD = 137.5 DZD
    const amountInDZD = Math.round(course.coursePrice * exchangeRate * 100); // Conversion en centimes de DZD

    // Créer un nouvel enregistrement d'achat de cours
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Créer la session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "dzd", // Devise : DZD (Dinar algérien)
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: amountInDZD, // Montant en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // Redirection après paiement réussi
      cancel_url: `http://localhost:5173/course-detail/${courseId}`, // Redirection après annulation
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["DZ"], // Optionnellement, restreindre aux pays autorisés (ici, Algérie)
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Sauvegarder l'enregistrement d'achat
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Retourner l'URL Stripe de la session
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Webhook pour traiter les événements Stripe (par exemple, paiement réussi)
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Gérer l'événement "checkout.session.completed"
  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100; // Convertir les centimes en DZD
      }
      purchase.status = "completed";

      // Rendre toutes les leçons visibles en définissant `isPreviewFree` à true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Mettre à jour les cours de l'utilisateur
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // Mettre à jour le cours pour ajouter l'ID de l'utilisateur aux étudiants inscrits
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};
/* -------------------THIS IS THE PRICE WITH $ dollar  ----------------------------------

const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
        {
            price_data: {
                currency: "usd", // Change currency to USD
                product_data: {
                    name: course.courseTitle,
                    images: [course.courseThumbnail],
                },
                unit_amount: Math.round(course.coursePrice * 100), // Convert price to cents (assuming course.coursePrice is in USD)
            },
            quantity: 1,
        },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
    cancel_url: `http://localhost:5173/course-detail/${courseId}`,
    metadata: {
        courseId: courseId,
        userId: userId,
    },
    shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
    },
});

*/
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({
        message: "course not found !",
      });
    }
    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased , false else
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
