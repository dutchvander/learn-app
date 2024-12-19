import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent> */}
      </Card>
    </div>
  );
};

export default Dashboard;
