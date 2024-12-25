"use client";
import Container from '@/components/custom-ui/Container';
import ShopLayout from '@/components/custom-ui/ShopLayout';
import Heading from '@/components/home/Heading';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { addToCart } from '@/redux/cart/cart';
import { Button, LinearProgress } from '@mui/material';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function Details() {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const { data, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });


    const product = data?.result?.find((item) => item.product_id == params.id);

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(quantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: product.product_id,
            quantity: quantity
        }))
    };

    const handleBuyNow = () => {
        console.log('Buy now:', { productId: product.id, quantity });
    };
    const filtedProduct = data?.result?.filter((item) => item.category === product.category && item.product_id !== product.product_id);


    return (
        <ShopLayout>
            <Container className="mt-24 min-h-[80vh]">
                <div className="container mx-auto px-6 lg:px-16 py-12">
                    {isLoading && <LinearProgress />}
                    {
                        product && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Product Image */}
                            <div className="bg-gray-100 rounded-lg overflow-hidden p-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col space-y-6">
                                {/* Breadcrumb (Optional) */}
                                <p className="text-sm text-gray-500">Home / Furniture</p>

                                {/* Title and Pricing */}
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl font-semibold text-primary">${Number(product.price).toFixed(2)}</span>

                                    <span className="bg-red-500 text-white text-sm font-semibold py-1 px-2 rounded">Sale</span>
                                </div>

                                {/* Sold Info */}


                                {/* SKU */}
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">{product.description}</span>
                                </p>

                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600 hover:bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={quantity}
                                        className="w-12 text-center border rounded-lg text-gray-700 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600 hover:bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart and Buy Now */}
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="bg-black text-white text-sm font-semibold py-3 px-6 rounded-lg hover:bg-gray-800"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="bg-green-600 text-white text-sm font-semibold py-3 px-6 rounded-lg hover:bg-green-500"
                                    >
                                        Buy It Now
                                    </button>
                                </div>

                                {/* Category */}
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Categories:</span> {product.category}
                                </p>

                                {/* Stock Availability */}
                                <div className="space-y-2">
                                    <p className="text-sm text-green-600 font-medium">
                                        ✅ Hurry up! Only {product.stock} left in stock!
                                    </p>

                                </div>

                                {/* Share Button */}
                                {/* <button className="bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-green-500">
                                Share
                            </button> */}
                            </div>
                        </div>
                    }
                </div>
                {filtedProduct.length > 0 && <Heading title="Similer Products" className="mt-20 text-3xl" />}
                <div className='grid grid-cols-6 w-full gap-4 mb-20 '>
                    {
                        filtedProduct && filtedProduct.map((similer) => <Link href={`/details/${similer.product_id}`} key={similer.product_id} className="p-4 sub-shad border rounded-md shadow-sm">
                            <img
                                src={similer?.image}
                                alt={similer?.name}
                                className="w-full h-40 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-lg font-semibold">{similer?.name}</h3>
                            <p className="text-sm text-gray-600">{similer?.category}</p>
                            <p className="text-lg font-bold">${similer?.price}</p>
                        </Link>)
                    }
                </div>
            </Container>
        </ShopLayout>
    );

}
