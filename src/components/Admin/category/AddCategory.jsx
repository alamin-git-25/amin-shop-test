"use client"
import React, { useState } from 'react'
import Heading from '../Heading'
import { Button } from '@mui/material'
import Swal from 'sweetalert2';
import { useCreateCategoryMutation } from '@/redux/api/categoryApi';

export default function AddCategory() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [createCategory, isLoading] = useCreateCategoryMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            name, title, description
        }
        try {
            const res = await createCategory(data).unwrap();
            if (res?.result?.affectedRows) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Category created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setName('');
                setTitle('');
                setdescription('')
            }

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Category creation Failed",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false)
        }
    }
    const load = <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-live="polite"
        aria-busy="true"
    >
        <path
            d="M7 10H3V14H7V10Z"
            className="animate animate-bounce fill-emerald-500 "
        />
        <path
            d="M14 10H10V14H14V10Z"
            className="animate animate-bounce fill-emerald-500 [animation-delay:.2s]"
        />
        <path
            d="M21 10H17V14H21V10Z"
            className="animate animate-bounce fill-emerald-500 [animation-delay:.4s]"
        />
    </svg>
    return (
        <section>

            <div className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
                <Heading path="Product" value="Add Category" />
                <form onSubmit={handleSubmit}>
                    <div className=''>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
                            <div>
                                <label htmlFor="UserEmail" className="block text-xl font-semibold font-poppins tracking-wide"> Category Name </label>
                                <input
                                    type="text"
                                    id="UserEmail"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="john@rhcp.com"
                                    className="mt-1 outline-indigo-300 w-full h-12 sub-shad border bg-transparent border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide">Category Title </label>
                                <input
                                    type="text"
                                    id=""
                                    value={title}
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="john@rhcp.com"
                                    className="mt-1 outline-indigo-300 w-full h-12 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div className=' lg:col-span-2'>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Category Description </label>

                                <div
                                    className="overflow-hidden rounded-lg bg-transparent sub-shad border border-gray-200 shadow-sm  "
                                >
                                    <textarea
                                        id="OrderNotes"
                                        className="w-full outline-indigo-300 p-4 rounded-lg bg-transparent sub-shad resize-none  align-top  sm:text-sm"
                                        value={description}
                                        rows="4"
                                        name="description"
                                        onChange={(e) => setdescription(e.target.value)}
                                        placeholder="Enter  any additional order notes..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-4 justify-end w-full mt-5">
                        <Button disabled={loading} className='lg:w-32 w-full' type="submit" variant="contained" color="primary" >
                            {loading ? load : ' Upload'}
                        </Button>
                        <Button type="reset" className='lg:w-32 w-full' variant="contained" color="warning">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}
