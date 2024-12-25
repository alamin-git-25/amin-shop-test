"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, children, icon }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <li className="relative  pb-1.5 text-primary flex items-center space-x-2 ">
            {icon}
            <Link href={href} className={` ${isActive && 'line'}`}>
                {children}
            </Link>
        </li>
    )
}
