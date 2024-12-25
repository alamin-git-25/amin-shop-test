'use client';
import { Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Heading from '../../Heading';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useGetAllProductQuery, useUpdateProductMutation } from '@/redux/api/productApi';
import { useParams, useRouter } from 'next/navigation';
import { getBaseUrl } from '@/lib/apiConfig.js/config';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import Asynchronous from '@/components/select/Select';


export default function EditProduct() {
    const params = useParams();
    const { data: categorys, } = useGetAllCategoryQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const router = useRouter();
    const { data, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const product = data?.result?.find((item) => item.product_id.toString() === params.id)
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [isPublished, setIsPublished] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (product) {
            setName(product.name);
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            setCategory(product.category);
            setIsPublished(product.isPublished);
            setPreviewImages(product.image);
        }
    }, [product]);
    const [updateProduct] = useUpdateProductMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name, title, description, price, stock, category, isPublished,
        }
        setLoading(true)
        try {
            const res = await updateProduct({ id: params.id, ...formData }).unwrap();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Category updated successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/dashboard/product');
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Product updated Failed!!",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
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
                <Heading path="Product" value="Edit Product" />
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                            <div>
                                <label htmlFor="UserEmail" className="block text-xl font-semibold font-poppins tracking-wide"> Product Name </label>
                                <input
                                    type="text"
                                    id="UserEmail"
                                    name="name"
                                    value={name}

                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="john@rhcp.com"
                                    className="mt-1 w-full h-12 sub-shad outline-indigo-300 border bg-transparent border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Product Title </label>
                                <input
                                    type="text"
                                    id=""
                                    name="title"
                                    placeholder="john@rhcp.com"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 w-full h-12 outline-indigo-300 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Product Price </label>
                                <input
                                    type="Number"
                                    id=""
                                    name="price"
                                    placeholder="john@rhcp.com"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-1 w-full h-12 outline-indigo-300 sub-shad bg-transparent border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Product Quantity </label>
                                <input
                                    type="text"
                                    id=""
                                    name="stock"
                                    placeholder="john@rhcp.com"

                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="mt-1 w-full h-12 outline-indigo-300 sub-shad bg-transparent border border-gray-200  px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Product Category </label>
                                <Asynchronous setCategory={setCategory} data={categorys?.result} />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide">Is Pulished ?? </label>

                                <select
                                    value={isPublished}
                                    onChange={(e) => setIsPublished(e.target.value)}
                                    className="mt-1 w-full h-12 outline-indigo-300 sub-shad bg-transparent border border-gray-200 px-3 font-poppins rounded-md shadow-sm sm:text-xl"
                                >
                                    <option value="Published">Published</option>
                                    <option value="Not Published">Not Published</option>
                                </select>
                            </div>
                            <div className=' lg:col-span-2'>
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Product Description </label>

                                <div
                                    className="overflow-hidden rounded-lg bg-transparent sub-shad border border-gray-200 shadow-sm  "
                                >
                                    <textarea
                                        id="OrderNotes"
                                        value={description}

                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-4 outline-indigo-300 rounded-lg bg-transparent sub-shad resize-none  align-top  sm:text-sm"
                                        rows="4"
                                        name="description"
                                        placeholder="Enter any additional order notes..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="relative ">
                                <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Product Image </label>
                                <input
                                    id="id-dropzone02"
                                    name="image"
                                    type="file"

                                    // onChange={handleImageChange}
                                    className="peer hidden"
                                    accept=".gif,.jpg,.png,.jpeg"
                                    multiple
                                />
                                <label
                                    htmlFor="id-dropzone02"
                                    className="flex sub-shad border border-gray-200 cursor-pointer flex-col items-center gap-6 rounded  border-dashed  px-6 py-10 text-center"
                                >
                                    <span className="inline-flex h-24 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
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
                                <div className='grid grid-cols-4 gap-3 h-28  w-full p-3 rounded-lg sub-shad border border-gray-200 resize-none  align-top  sm:text-sm'>
                                    <img

                                        src={previewImages}
                                        className="h-20 w-full object-cover rounded border"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end w-full mt-5">
                        <Button disabled={loading} className='lg:w-32 w-full' type="submit" variant="contained" color="primary" >
                            {loading ? load : ' Upload'}
                        </Button>
                        <Button type="reset" variant="contained" color="warning">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div >
        </section >
    )
}


