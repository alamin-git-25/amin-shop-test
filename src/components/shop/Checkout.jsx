// "use client"
// import React from 'react'
// import ShopLayout from '../custom-ui/ShopLayout'
// import Container from '../custom-ui/Container'
// import { useDispatch, useSelector } from 'react-redux'
// import { useGetAllProductQuery } from '@/redux/api/productApi'

// export default function Checkout() {
//     const cartItems = useSelector((state) => state.cart.items);
//     const { data, isLoading } = useGetAllProductQuery(undefined, {
//         refetchOnFocus: true,
//         refetchOnMountOrArgChange: true,
//     });


//     const dispatch = useDispatch();
//     const allCarts = cartItems?.map((cart) => {
//         const cartItem = data?.result?.find((item) => item.product_id === cart.productId);
//         return {
//             ...cartItem,
//             quantity: cartItem ? cart.quantity : 0,
//         };
//     });
//     console.log(allCarts);

//     return (
//         <ShopLayout>
//             <Container className={"min-h-screen mt-24"}>

//                 <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//                     <div className="mx-auto">
//                         <header className="text-center">
//                             <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
//                         </header>

//                         <div className="mt-8">
//                             <ul className="space-y-4">
//                                 {
//                                     allCarts?.map((item) => (
//                                         <li className="flex items-center gap-4">
//                                             <img
//                                                 src={item.image}
//                                                 alt=""
//                                                 className="size-24 rounded object-cover"
//                                             />

//                                             <div>
//                                                 <h3 className="text-sm text-gray-900">{item.name}</h3>

//                                                 <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
//                                                     <div>
//                                                         <dt className="inline">Size:</dt>
//                                                         <dd className="inline">XXS</dd>
//                                                     </div>

//                                                     <div>
//                                                         <dt className="inline">Color:</dt>
//                                                         <dd className="inline">White</dd>
//                                                     </div>
//                                                 </dl>
//                                             </div>

//                                             <div className="flex flex-1 items-center justify-end gap-2">
//                                                 <form>
//                                                     <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

//                                                     <input
//                                                         type="number"
//                                                         readOnly
//                                                         value={item.quantity}
//                                                         id="Line1Qty"
//                                                         className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
//                                                     />
//                                                 </form>

//                                                 <button className="text-gray-600 transition hover:text-red-600">
//                                                     <span className="sr-only">Remove item</span>

//                                                     <svg
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         fill="none"
//                                                         viewBox="0 0 24 24"
//                                                         strokeWidth="1.5"
//                                                         stroke="currentColor"
//                                                         className="size-4"
//                                                     >
//                                                         <path
//                                                             strokeLinecap="round"
//                                                             strokeLinejoin="round"
//                                                             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                                                         />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         </li>
//                                     ))
//                                 }

//                             </ul>

//                             <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
//                                 <div className="w-screen max-w-lg space-y-4">
//                                     <dl className="space-y-0.5 text-sm text-gray-700">
//                                         <div className="flex justify-between">
//                                             <dt>Subtotal</dt>
//                                             <dd>£250</dd>
//                                         </div>

//                                         <div className="flex justify-between">
//                                             <dt>VAT</dt>
//                                             <dd>£25</dd>
//                                         </div>

//                                         <div className="flex justify-between">
//                                             <dt>Discount</dt>
//                                             <dd>-£20</dd>
//                                         </div>

//                                         <div className="flex justify-between !text-base font-medium">
//                                             <dt>Total</dt>
//                                             <dd>£200</dd>
//                                         </div>
//                                     </dl>

//                                     <div className="flex justify-end">
//                                         <span
//                                             className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
//                                         >
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 24 24"
//                                                 strokeWidth="1.5"
//                                                 stroke="currentColor"
//                                                 className="-ms-1 me-1.5 size-4"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
//                                                 />
//                                             </svg>

//                                             <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
//                                         </span>
//                                     </div>

//                                     <div className="flex justify-end">
//                                         <a
//                                             href="#"
//                                             className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
//                                         >
//                                             Checkout
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </Container>
//         </ShopLayout>
//     )
// }


"use client";
import React, { useState } from "react";
import ShopLayout from "../custom-ui/ShopLayout";
import Container from "../custom-ui/Container";
import { useGetAllProductQuery } from "@/redux/api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useCreateOrderMutation } from "@/redux/api/ordersApi";
import { load } from "../loading/DotLoading";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/cart/cart";

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState("creditCard");
    const cartItems = useSelector((state) => state.cart.items);
    const { data, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const session = useSession();
    const router = useRouter()
    const dispatch = useDispatch();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setphone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [loading, setLoading] = useState(false);

    // Combine cart items with product data from API
    const allCarts = cartItems?.map((cart) => {
        const cartItem = data?.result?.find((item) => item.product_id === cart.productId);
        return {
            ...cartItem,
            quantity: cartItem ? cart.quantity : 0,
        };
    });


    // Calculate the total price
    const totalPrice = allCarts?.reduce((total, item) => {
        return total + (item.price || 0) * item.quantity;
    }, 0) || 0;
    const [createOrder] = useCreateOrderMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            name: fname + ' ' + lname,
            email: session?.data?.user?.email,
            phone: phone,
            address: address,
            city: city,
            postalcode: postalCode,
            paymentMethod: paymentMethod,
            products: allCarts,
            totalPrice: totalPrice,

        }
        console.log(orderData, "order");

        setLoading(true)
        try {
            const res = await createOrder(orderData).unwrap();
            console.log(res);

            if (res?.result?.insertId > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Order Has Been Placed`,
                    showConfirmButton: false,
                    timer: 1500
                });
                dispatch(clearCart())
                router.push('/user-dashboard');
            }


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <ShopLayout>
            <div className=" mt-24  flex justify-center items-center p-4">
                <form onSubmit={handleSubmit}>
                    <div className=" w-full bg-white shad rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

                        {/* Billing Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Billing Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    placeholder="First Name"
                                    className="w-full p-3 sub-shad border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    placeholder="Last Name"
                                    className="w-full p-3 border sub-shad border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="email"
                                    readOnly
                                    placeholder="Email Address"
                                    value={session?.data?.user?.email}
                                    className="w-full p-3 border sub-shad border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setphone(e.target.value)}
                                    placeholder="Phone Number"
                                    className="w-full p-3 border sub-shad border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full col-span-1 sub-shad md:col-span-2 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full p-3 border sub-shad border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full p-3 border sub-shad border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>
                            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                                <button
                                    type="button"
                                    className={`p-4 border sub-shad rounded-md w-full ${paymentMethod === "creditCard" ? "border-blue-500" : "border-gray-200"
                                        }`}
                                    onClick={() => setPaymentMethod("creditCard")}
                                >
                                    Credit Card
                                </button>
                                <button
                                    type="button"
                                    className={`p-4 border sub-shad rounded-md w-full ${paymentMethod === "paypal" ? "border-blue-500" : "border-gray-200"
                                        }`}
                                    onClick={() => setPaymentMethod("paypal")}
                                >
                                    PayPal
                                </button>
                                <button
                                    type="button"
                                    className={`p-4 border sub-shad rounded-md w-full ${paymentMethod === "bankTransfer" ? "border-blue-500" : "border-gray-200"
                                        }`}
                                    onClick={() => setPaymentMethod("bankTransfer")}
                                >
                                    Bank Transfer
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                            <div className="bg-gray-50 sub-shad border border-gray-200 p-4 rounded-md">
                                {allCarts?.map((cart, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between text-gray-700 mb-2"
                                    >
                                        <span>
                                            {cart.name} ${cart.price} x {cart.quantity}
                                        </span>
                                        <span>${(cart.price * cart.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between text-gray-700 mb-2">
                                    <span>Shipping</span>
                                    <span>$5.99</span>
                                </div>
                                <div className="flex justify-between text-gray-800 font-semibold border-t pt-2">
                                    <span>Total</span>
                                    <span>${(totalPrice).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-600 transition">
                                {loading ? load : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ShopLayout>
    );
}

