import { cn } from '@/lib/utils'
import React from 'react'

export default function Heading({ path, value, className }) {
    return (
        <span className={cn("sub-shad p-3 w-full text-3xl font-neun rounded mb-3 border border-gray-200", className)}>
            <h3 className=''>{value}</h3>
        </span>
    )
}
