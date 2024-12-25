"use client";
import React from 'react'
import Container from '../custom-ui/Container'
import Heading from './Heading'
import { motion } from 'framer-motion';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart/cart';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Middle() {
    const { data: products, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const dispatch = useDispatch();

    const addInCart = (id) => {
        dispatch(addToCart({
            productId: id,
            quantity: 1
        }))

    }
    const router = useRouter();
    const details = (public_id) => {
        router.push(`/details/${public_id}`)
    }
    return (
        <Container>
            <Heading title="Top Sales" />
            <section className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4'>

                {
                    products?.result?.map((item, id) => (

                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: .5 }}
                            className="overflow-hidden shad rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                            {/*  <!-- Image --> */}
                            <figure className='p-1 rounded'>
                                <Image
                                    src={item.image} // Dynamic product image
                                    alt={item.name} // Alt text for accessibility
                                    width={1920}
                                    height={1080}// Ensures the image fills the container
                                    // Ensures the image scales properly
                                    className="aspect-video w-full"
                                />
                            </figure>
                            {/*  <!-- Body--> */}
                            <div className="p-6">
                                <header className="mb-4">
                                    <h3 className="text-xl font-medium text-slate-700">
                                        Greek breakfast
                                    </h3>
                                    <p className=" text-slate-400"> $8.99</p>
                                </header>
                                <p>
                                    Blueberry Superpower: Vanilla Greek Yogurt + Fresh Blueberries +
                                    Granola + Honey.
                                </p>
                            </div>
                            {/*  <!-- Action base sized basic button --> */}
                            <div className="flex justify-end gap-4 p-6 pt-0">
                                <Button onClick={() => details(item.product_id)} variant='outlined' color='success' className='w-full'>
                                    View Details
                                </Button>
                                <Button onClick={() => addInCart(item.product_id)} variant='contained' color='success' className='w-full'>
                                    Add To cart
                                </Button>
                            </div>
                        </motion.div>
                    ))
                }
            </section>
        </Container >
    )
}

