"use client"

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { DeleteIcon, Minus, Plus, ShoppingCartIcon } from 'lucide-react';
import { addToCart, changeQuantity, clearCart, removeCart } from '@/redux/cart/cart';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cartSVG } from '../loading/CartIcon';
import { Button } from '../ui/button';
import LineLoader from '../loading/loading';
export default function Cart({ openCart, setOpenCart }) {
    const cartItems = useSelector((state) => state.cart.items); // Update according to your slice
    const [totalQyt, setTotalQyt] = useState(0);
    // Fetch all products using RTK Query
    const { data, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const dispatch = useDispatch();
    const allCarts = cartItems?.map((cart) => {
        const cartItem = data?.result?.find((item) => item.product_id === cart.productId);
        return {
            ...cartItem,
            quantity: cartItem ? cart.quantity : 0,
        };
    });
    useEffect(() => {
        const total = allCarts.reduce((acc, item) => acc + (item?.quantity || 0), 0);
        setTotalQyt(total || 0);
    }, [allCarts]);
    const router = useRouter();
    const handleCheckout = () => {
        router.push('/checkout');
        setOpenCart(!openCart)
    }
    return (
        <section>
            <Button onClick={() => setOpenCart(!openCart)} variant="outlined" className="relative text-white flex  items-center space-x-2 hover:text-indigo-300" >
                <ShoppingCartIcon className='text-primary' />
                <span className=' rounded-full   border border-primary text-primary text-sm px-2 py-0.5'>{Number(totalQyt || 0)}</span>
            </Button>

            <div
                className={`absolute lg:top-[10vh] top-[8vh] lg:right-6 right-0 rounded-b-md
  flex flex-col justify-between shad
  transition-all duration-500 ease-linear
  ${openCart ? 'lg:w-[25vw] w-full h-[50vh]  pb-4 overflow-hidden bg-white' : 'lg:w-[25vw] w-full overflow-hidden pb-0 h-[0] bg-white'}`}
            >
                <section className="space-y-4 overflow-auto p-4 scroll-thin">
                    {isLoading && <li><LineLoader /></li>}
                    {
                        allCarts?.length > 0 &&
                        allCarts?.map((item, id) => (
                            <div
                                key={id}
                                className="flex items-center gap-4 bg-white p-2 rounded-lg sub-shad hover:shadow-lg transition duration-300 border border-gray-200"
                            >
                                {/* Product Image */}
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="w-16 h-16 rounded-md object-cover border"
                                />

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                    <dl className="mt-1 space-y-1 text-sm text-gray-600">
                                        <div className="flex gap-2">
                                            <dt className="font-medium">Price:</dt>
                                            <dd>${Number(item?.price || 0).toFixed(2)}</dd>
                                        </div>
                                        <div className="flex gap-2">
                                            <dt className="font-medium">Sub Total:</dt>
                                            <dd>${(Number(item?.price || 0) * Number(item?.quantity || 0)).toFixed(2)}</dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            dispatch(changeQuantity({ productId: item.product_id, quantity: Number(item.quantity - 1 || 0) }))
                                        }
                                        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>

                                    <input
                                        readOnly
                                        type="text"
                                        value={Number(item?.quantity || 0)}
                                        className="w-10 text-center text-gray-800 font-medium bg-gray-50 border border-gray-300 rounded-md"
                                    />

                                    <button
                                        onClick={() =>
                                            dispatch(changeQuantity({ productId: item.product_id, quantity: Number(item.quantity + 1 || 0) }))
                                        }
                                        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => dispatch(removeCart({ productId: item.product_id }))}
                                    className="text-gray-500 hover:text-red-600 transition"
                                >
                                    <DeleteIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ))
                    }

                    {
                        allCarts?.length <= 0 && (
                            <li className="flex flex-col items-center justify-center py-10 px-6 text-center  rounded-lg ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    width="48"
                                    height="48"
                                >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <p className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty!</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Looks like you haven't added anything to your cart yet.
                                </p>
                                <a
                                    href="/shop"
                                    className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600 transition"
                                >
                                    Shop Now
                                </a>
                            </li>
                        )
                    }

                </section>

                {
                    allCarts.length > 0 && <div id="actions" className="w-full mt-4 flex gap-2  px-4">

                        <Button
                            onClick={() => dispatch(clearCart())}
                            disabled={allCarts.length <= 0}
                            className="block w-full rounded bg-red-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 disabled:bg-red-400 disabled:text-gray-300"
                        >
                            Clear
                        </Button>
                        <Button
                            disabled={allCarts.length <= 0}
                            onClick={handleCheckout}
                            className="block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
                        >
                            Checkout
                        </Button>

                    </div>
                }
            </div>


        </section >
    )
}
