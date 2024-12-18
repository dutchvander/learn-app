/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import logo from "../assets/images/logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useLogoutUserMutation } from "@/feutures/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  // Simulated user authentication state
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <nav className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <MobileNavbar />
        </div>
        <div className="flex items-center max-w-7xl mx-auto justify-between mr-[-4px] h-full">
          {/* Logo visible only on medium and larger screens */}
          <img
            src={logo}
            alt="Logo"
            className="hidden md:block h-12 w-12 md:h-16 md:w-16 rounded-full object-cover mr-[-8px]"
          />
          {/* Title visible only on mobile */}
          <h1 className="font-extrabold text-2xl block md:hidden">Eminence</h1>
          {/* Title visible only on medium and larger screens */}
          <h1 className="font-extrabold text-2xl hidden md:block">Eminence</h1>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="my-learning">My learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link to="profile">Edit Profile</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {user?.role === "instructor" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2 hidden md:flex">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button>Signup</Button>
          </div>
        )}
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-slate-200 hover:bg-slate-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>Eminence</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
