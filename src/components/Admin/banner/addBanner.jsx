"use client"
import React, { useState } from 'react'
import Heading from '../Heading'
import { Button } from '@mui/material'
import { useCreateBannerMutation } from '@/redux/api/bannerApi';
import Swal from 'sweetalert2';

export default function AddBanner() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('active');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [prev, setPrev] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImage(files[0]);
        const previews = files.map(file => URL.createObjectURL(file));
        setPrev(previews);
    };
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
    const [createBanner] = useCreateBannerMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('status', status);
        formData.append('link', link);
        if (image) formData.append('image', image);
        setLoading(true)
        try {
            const res = await createBanner(formData).unwrap();
            console.log(res);

            if (res.result.insertId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Banner created successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setName('');
                setImage('');
                setPrev([]);
                setTitle('');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <section>
            <div className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
                <Heading path="Product" value="Add Banner" />
                <form onSubmit={handleSubmit}>
                    <div className=''>
                        <div className='grid lg:grid-cols-4 grid-cols-1 gap-2'>
                            <div>
                                <label htmlFor="UserEmail" className="block text-xl font-semibold font-poppins tracking-wide"> Banner Name </label>
                                <input
                                    type="text"
                                    id="UserEmail"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="john@rhcp.com"
                                    className="mt-1 w-full h-12 outline-indigo-300 sub-shad border bg-transparent border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide">Banner Title </label>
                                <input
                                    type="text"
                                    id=""
                                    value={title}
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="john@rhcp.com"
                                    className="mt-1 w-full h-12 outline-indigo-300 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide">Link </label>
                                <input
                                    type="text"
                                    id=""
                                    value={link}
                                    name="link"
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder="john@rhcp.com"
                                    className="mt-1 w-full h-12 outline-indigo-300 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide">Banner Status</label>
                                <select
                                    name='status'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mt-1 w-full h-12 outline-indigo-300 sub-shad bg-transparent border border-gray-200 px-3 font-poppins rounded-md shadow-sm sm:text-xl"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className=' lg:col-span-4'>
                                <div>
                                    <div className="relative ">
                                        <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Banner Image </label>
                                        <input
                                            id="id-dropzone02"
                                            name="image"
                                            type="file"
                                            onChange={handleImageChange}
                                            className="peer hidden"
                                            accept=".gif,.jpg,.png,.jpeg"
                                            multiple
                                        />
                                        <label
                                            htmlFor="id-dropzone02"
                                            className="flex sub-shad border border-gray-200 cursor-pointer flex-col items-center gap-6 rounded  border-dashed  px-6 py-10 text-center"
                                        >
                                            <span className="inline-flex h-12 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-label="File input icon"
                                                    role="graphics-symbol"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                    />
                                                </svg>
                                            </span>
                                            <p className="flex flex-col items-center justify-center gap-1 text-sm">
                                                <span className="text-emerald-500 hover:text-emerald-500">
                                                    Upload media
                                                    <span className="text-slate-500"> or drag and drop </span>
                                                </span>
                                                <span className="text-slate-600"> PNG, JPG or GIF up to 10MB </span>
                                            </p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="" className="block text-xl font-semibold  font-poppins tracking-wide"> Image Prview </label>
                                        <div className=' h-80  w-full p-3 rounded-lg sub-shad border border-gray-200 resize-none  align-top  sm:text-sm'>
                                            {prev.map((src, index) => (
                                                <img
                                                    key={index}
                                                    src={src}
                                                    alt={`Preview ${index}`}
                                                    className="h-full w-full object-cover rounded border"
                                                />
                                            ))}
                                        </div>
                                    </div>
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
