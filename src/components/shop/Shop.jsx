"use client";
import React, { useState } from 'react';
import ShopLayout from '../custom-ui/ShopLayout';
import Container from '../custom-ui/Container';
import AnimatedDropdown from '../select/DropDown';
import SearchInput from './SearchBar';
import { motion } from 'framer-motion'
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { Button, LinearProgress } from '@mui/material';
import Image from 'next/image';
import Heading from '../Admin/Heading';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart/cart';
import { useRouter } from 'next/navigation';


export default function Shops() {
    const { data: products, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All Category");
    const searchProduct = (product) => {
        if (search) {
            return product?.name?.toLowerCase().includes(search.toLowerCase());
        }
        return product
    };
    const filteredProduct = (product) => {
        if (selectedCategory === 'All Category') {
            return product
        }
        return product.category == selectedCategory;


    }
    const filteredProducts = products?.result?.filter((product) => searchProduct(product) && filteredProduct(product));

    const dispatch = useDispatch();

    const addInCart = (id) => {
        dispatch(addToCart({
            productId: id,
            quantity: 1
        }))
        console.log("add");

    }
    const router = useRouter();
    const details = (public_id) => {
        router.push(`/details/${public_id}`)
    }
    return (
        <ShopLayout>
            <Container className={"min-h-screen mt-32 lg:block hidden"}>
                <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 relative'>
                    {/* Sidebar */}
                    <aside className='col-span-1 h-[100vh] sticky top-[13vh] border-2 '>
                        <h2 className="text-xl font-bold p-4">Sidebar</h2>
                        <ul className="space-y-4 px-4">
                            <SearchInput search={search} setSearch={setSearch} />
                            <AnimatedDropdown setSelectedCategory={setSelectedCategory} />
                        </ul>

                    </aside>

                    {/* Main Content */}
                    <main className='col-span-5 w-full min-h-[100vh] sticky top-[13vh] border-2 bg-white'>

                        <div className='no-scroll p-2 grid lg:grid-cols-4 gap-3 max-h-[80vh] overflow-auto w-full'>
                            <Heading value={selectedCategory} className="col-span-4" />
                            {
                                isLoading && <div className='col-span-4'>
                                    <LinearProgress />
                                </div>
                            }
                            {filteredProducts?.length ? (

                                filteredProducts?.map((item, id) => (
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, }}
                                        className="overflow-hidden shad rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                                        {/*  <!-- Image --> */}
                                        <figure className='p-1 rounded'>
                                            <Image
                                                src={item.image} // Dynamic product image
                                                alt={item.name} // Alt text for accessibility
                                                width={1920}
                                                height={1080}// Ensures the image fills the container
                                                className="aspect-video w-full"
                                            />
                                        </figure>
                                        {/*  <!-- Body--> */}
                                        <div className="p-6">
                                            <header className="mb-4">
                                                <h3 className="text-xl font-medium text-slate-700">
                                                    {item.title}
                                                </h3>
                                                <p className=" text-slate-400">${item.price}</p>
                                            </header>
                                            <p>
                                                {item.description}
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
                            ) : (
                                <div className="col-span-4 text-center text-gray-500">No products found</div>
                            )}
                        </div>
                    </main>
                </div>
            </Container>
            <div className='flex flex-col gap-5 mt-20 p-2 relative lg:hidden'>
                <div className='w-full '>
                    <SearchInput search={search} setSearch={setSearch} />
                    <AnimatedDropdown setSelectedCategory={setSelectedCategory} />
                </div>
                <Heading value={selectedCategory} className="text-sm" />
                <div className='w-full '>

                    <div className='no-scroll  grid md:grid-cols-2  grid-cols-1  gap-3 max-h-[80vh] overflow-auto w-full'>

                        {
                            isLoading && <div className='col-span-4'>
                                <LinearProgress />
                            </div>
                        }
                        {filteredProducts?.length ? (

                            filteredProducts?.map((item, id) => (
                                <motion.div
                                    key={id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, }}
                                    className="overflow-hidden shad rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                                    {/*  <!-- Image --> */}
                                    <figure className='p-1 rounded'>
                                        <Image
                                            src={item.image} // Dynamic product image
                                            alt={item.name} // Alt text for accessibility
                                            width={1920}
                                            height={1080}// Ensures the image fills the container
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
                        ) : (
                            <div className="col-span-4 text-center text-gray-500">No products found</div>
                        )}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}

