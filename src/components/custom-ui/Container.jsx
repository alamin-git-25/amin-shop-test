import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
    className,
    children,
}) {
    return (
        <section className={cn("lg:px-10 px-5 my-5 w-full h-full flex flex-1 flex-col", className)}>{children}</section>
    );
}