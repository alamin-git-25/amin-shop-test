import { cn } from '@/lib/utils'
import React from 'react'

export default function Heading({ title, className }) {
    return (

        <div className={cn("relative py-4 my-4 text-5xl mb-3 font-poppins", className)}>
            <h2 className="">{title}</h2>
            <div className=" border-t-4 border- border-black w-72"></div>
        </div>


    )
}

