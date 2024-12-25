"use client"

import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import Banner from "./banner"
import Third from "./third"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Middle from "./middle"
import Service from "./Service"
import Footer from "../custom-ui/Footer"
import { useEffect } from "react"
import ShopLayout from "../custom-ui/ShopLayout"


export default function Main() {


    return (
        <ShopLayout>

            <Banner />
            <Middle />
            <Third />
            <Service />

        </ShopLayout>
    )
}
