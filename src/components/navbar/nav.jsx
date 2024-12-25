"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Swal from 'sweetalert2';
import SearchBar from './Search';
import Cart from './cart';
import { usePathname } from 'next/navigation';
import ActiveLink from './ActiveLink';
export default function Nav() {
    const [navOpen, setNavOpen] = useState(false);
    const links = [
        { title: 'Home', path: '/', icon: <HomeRoundedIcon /> },
        { title: 'Shop', path: '#s', icon: <ShoppingBagRoundedIcon /> }
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
            <div className='bg-black flex fixed top-0 left-0 z-[999] w-full justify-between p-4 lg:hidden'><h1 className='text-white'>Logo</h1><span className='inline-flex gap-4'><Cart openCart={openCart} setOpenCart={setOpenCart} /> {!navOpen ? <MenuIcon className=' text-white w-10 h-10 ' onClick={() => setNavOpen(!navOpen)} /> : <CloseIcon className='  w-10 h-10 text-white' onClick={() => setNavOpen(!navOpen)} />}</span></div>
            <nav className='hidden border-b fixed top-0 left-0 lg:flex  justify-between px-10 items-center w-full h-[10vh] bg-[#ffffff] z-[999]' >
                <div className='text-primary'>Logo</div>
                <ul className='flex ml-10 font-roboto  flex-row space-x-8'>
                    <ActiveLink href='/'><HomeRoundedIcon /> Home</ActiveLink>
                    <ActiveLink href='/shop'><ShoppingBagRoundedIcon /> Shop</ActiveLink>
                    {
                        session?.data?.user?.role === 'admin' && <li className="relative text-primary flex items-center space-x-2 " >
                            <DashboardRoundedIcon />
                            <Link href='/dashboard' className=''>
                                Dashboard
                            </Link>
                        </li>
                    }
                    {
                        session?.data?.user?.role === 'user' && <li className="relative text-primary flex items-center space-x-2 " >
                            <DashboardRoundedIcon />
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
                    <Button onClick={() => setOpenBox(!openBox)} variant="outlined" className='text-primary' startIcon={<SearchRoundedIcon />}>
                        Search
                    </Button>

                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                    {
                        !session?.data?.user ? <Link href='/auth/login'>
                            <Button variant="outlined" className='text-primary' startIcon={<LoginRoundedIcon />}>
                                SignIn
                            </Button>
                        </Link> :
                            <Button onClick={logOut} variant="outlined" className='text-primary' endIcon={<LogoutIcon />}>
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
                        <LoginRoundedIcon />
                        <Link href="/">
                            Login
                        </Link>
                    </li>
                </ul>

            </nav>
        </header>
    )
}
