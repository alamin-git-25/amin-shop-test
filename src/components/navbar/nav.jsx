"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import SearchBar from './Search';
import Cart from './cart';
import { usePathname } from 'next/navigation';
import ActiveLink from './ActiveLink';
import { Home, HomeIcon, LayoutDashboardIcon, LogInIcon, LogOutIcon, MenuIcon, Search, ShoppingBag, ShoppingBagIcon, X } from 'lucide-react';
import { Button } from '../ui/button';
export default function Nav() {
    const [navOpen, setNavOpen] = useState(false);
    const links = [
        { title: 'Home', path: '/', icon: <Home /> },
        { title: 'Shop', path: '#s', icon: <ShoppingBag /> }
    ]
    const [openBox, setOpenBox] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const session = useSession();
    console.log(session);

    const logOut = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Logged Out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut()
                Swal.fire({
                    title: "Logged out!",
                    icon: "success"
                });
            }
        });
    }
    return (
        <header className=''>
            <div className='bg-black flex fixed top-0 left-0 z-[999] w-full justify-between p-4 lg:hidden'><h1 className='text-white'>Logo</h1><span className='inline-flex gap-4'><Cart openCart={openCart} setOpenCart={setOpenCart} /> {!navOpen ? <MenuIcon className=' text-white w-10 h-10 ' onClick={() => setNavOpen(!navOpen)} /> : <X className='  w-10 h-10 text-white' onClick={() => setNavOpen(!navOpen)} />}</span></div>
            <nav className='hidden border-b fixed top-0 left-0 lg:flex  justify-between px-10 items-center w-full h-[10vh] bg-[#ffffff] z-[999]' >
                <div className='text-primary'>Logo</div>
                <ul className='flex ml-10 font-roboto  flex-row space-x-8'>
                    <ActiveLink href='/'><HomeIcon /> Home</ActiveLink>
                    <ActiveLink href='/shop'><ShoppingBagIcon /> Shop</ActiveLink>
                    {
                        session?.data?.user?.role === 'admin' && <li className="relative text-primary flex items-center space-x-2 " >
                            <LayoutDashboardIcon />
                            <Link href='/dashboard' className=''>
                                Dashboard
                            </Link>
                        </li>
                    }
                    {
                        session?.data?.user?.role === 'user' && <li className="relative text-primary flex items-center space-x-2 " >
                            <LayoutDashboardIcon />
                            <Link href='/user-dashboard' className=''>
                                Dashboard
                            </Link>
                        </li>
                    }

                </ul>
                <ul className='flex flex-row space-x-5 '>
                    <SearchBar
                        openBox={openBox}
                        setOpenBox={setOpenBox}
                    />
                    <Button onClick={() => setOpenBox(!openBox)} variant="outlined" className='text-primary' >
                        Search
                    </Button>

                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                    {
                        !session?.data?.user ? <Link href='/auth/login'>
                            <Button variant="outlined" className='text-primary' >
                                SignIn
                            </Button>
                        </Link> :
                            <Button onClick={logOut} variant="outlined" className='text-primary' >
                                Log out
                            </Button>

                    }
                </ul>
            </nav>

            <nav className={` ${navOpen ? 'lg:hidden z-50 mt-16 fixed top-0 left-0  flex justify-start pl-4  items-center w-full h-[30vh] bg-indigo-300 transition-all duration-500 ease-out overflow-hidden' : 'lg:hidden flex pl-4 z-50 fixed top-0 left-0 transition-all duration-500 ease-out  items-center w-full h-0 overflow-hidden bg-indigo-300'}`}>
                <ul className='flex flex-col space-y-5 '>{links.map((link, id) => (
                    <li className="text-white flex items-center space-x-2" key={id}>
                        {link.icon}
                        <Link href={link.path} onClick={() => setNavOpen(!navOpen)}>
                            {link.title}
                        </Link>
                    </li>
                ))}
                    <li className="text-white flex items-center space-x-2" >
                        <LogInIcon />
                        <Link href="/">
                            Login
                        </Link>
                    </li>
                </ul>

            </nav>
        </header>
    )
}
