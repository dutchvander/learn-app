    import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger, 
    DropdownMenuCheckboxItem 
    } from '@/components/ui/dropdown-menu';
    import { Menu, School } from 'lucide-react';
    import logo from "../assets/images/logo.jpg";
    import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from '@/DarkMode';
import {   Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger, } from './ui/sheet';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';

    const Navbar = () => {
    // State for dropdown menu checkboxes
    const [showStatusBar, setShowStatusBar] = useState(false);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    // Simulated user authentication state
    const user = false;

    return (
        <nav className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 flex items-center justify-between px-4'>
        <div className="flex items-center">
        <div className='flex md:hidden items-centeru justify-between px-4 h-full'><MobileNavbar/></div>
<div className='flex items-center max-w-7xl mx-auto hidden md:flex justify-between  mr-[-4px] h-full '>
<img 
            src={logo} 
            alt="Logo" 
            className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover mr-[-8px]"
            />
            
            <h1 className='hidden md:block font-extrabold text-2xl mr-6'>
            Eminence
            </h1>
</div>
            
        </div>

        <div className='flex items-center gap-5'>
            {user ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem

                >
                    My learning
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem

                    
                >
                    Edit Profile
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem

                >
                    Log out
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem

                >
                    Dashboared
                </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            ) : (
            <div className="flex items-center gap-2">
                <Button variant="outline">Login</Button>
                <Button>Signup</Button>
            </div>
            )}
            <DarkMode/>
        </div>
        
        
        
        </nav>
    );
    };

    export default Navbar;

    const MobileNavbar = () =>{
        return(
                <Sheet>
                <SheetTrigger asChild>
                <Button size='icon' className="rounded-full bg-slate-200 hover:bg-slate-200" variant="outline" >
                    <Menu/>
                </Button>
                </SheetTrigger>
                <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                    Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
                </SheetContent>
            </Sheet>
        )
    }