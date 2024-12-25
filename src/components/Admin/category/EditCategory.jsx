// "use client"
// import React, { useState } from 'react'
// import Heading from '../Heading'
// import { Button } from '@mui/material'
// import Swal from 'sweetalert2';
// import { useCreateCategoryMutation, useGetAllCategoryQuery, useUpdateCategoryMutation } from '@/redux/api/categoryApi';
// import { useParams } from 'next/navigation';

// export default function EditCategory() {
//     const params = useParams();
//     const { data, isLoading } = useGetAllCategoryQuery(undefined, {
//         refetchOnFocus: true,
//         refetchOnMountOrArgChange: true
//     });
//     const category = data?.result?.find((item) => item.category_id.toString() === params.id)
//     console.log(category);

//     const [name, setName] = useState(category?.name);
//     const [title, setTitle] = useState(category?.title);
//     const [description, setdescription] = useState(category?.description);
//     const [loading, setLoading] = useState(false);
//     const [updateCategory] = useUpdateCategoryMutation(params.id);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         const data = {
//             name, title, description
//         }
//         try {
//             const res = await updateCategory(data).unwrap();
//             console.log(res);

//             if (res?.result?.affectedRows) {
//                 Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: "Category created successfully",
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }

//         } catch (error) {
//             Swal.fire({
//                 position: "center",
//                 icon: "error",
//                 title: "Category creation Failed",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         } finally {
//             setLoading(false)
//         }
//     }
//     const load = <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-live="polite"
//         aria-busy="true"
//     >
//         <path
//             d="M7 10H3V14H7V10Z"
//             className="animate animate-bounce fill-emerald-500 "
//         />
//         <path
//             d="M14 10H10V14H14V10Z"
//             className="animate animate-bounce fill-emerald-500 [animation-delay:.2s]"
//         />
//         <path
//             d="M21 10H17V14H21V10Z"
//             className="animate animate-bounce fill-emerald-500 [animation-delay:.4s]"
//         />
//     </svg>
//     return (
//         <section>

//             <div className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
//                 <Heading path="Product" value="Edit Category" />
//                 <form onSubmit={handleSubmit}>
//                     <div className=''>
//                         <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
//                             <div>
//                                 <label htmlFor="UserEmail" className="block text-xl font-semibold font-poppins tracking-wide"> Category Name </label>
//                                 <input
//                                     type="text"
//                                     id="UserEmail"
//                                     name="name"
//                                     value={name}
//                                     defaultValue={category?.name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     placeholder="john@rhcp.com"
//                                     className="mt-1 w-full h-12 sub-shad border bg-transparent border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide">Category Title </label>
//                                 <input
//                                     type="text"
//                                     id=""
//                                     value={title}
//                                     defaultValue={category?.title}
//                                     name="title"
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     placeholder="john@rhcp.com"
//                                     className="mt-1 w-full h-12 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
//                                 />
//                             </div>
//                             <div className=' lg:col-span-2'>
//                                 <label htmlFor="" className="block text-xl font-semibold font-poppins tracking-wide"> Category Description </label>

//                                 <div
//                                     className="overflow-hidden rounded-lg bg-transparent sub-shad border border-gray-200 shadow-sm  "
//                                 >
//                                     <textarea
//                                         id="OrderNotes"
//                                         className="w-full p-4 rounded-lg bg-transparent sub-shad resize-none  align-top  sm:text-sm"
//                                         value={description}
//                                         defaultValue={category?.description}
//                                         rows="4"
//                                         name="description"
//                                         onChange={(e) => setdescription(e.target.value)}
//                                         placeholder="Enter any additional order notes..."
//                                     ></textarea>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                     <div className="flex gap-4 justify-end w-full mt-5">
//                         <Button disabled={loading} type="submit" variant="contained" color="primary" >
//                             {loading ? load : ' Update'}
//                         </Button>
//                         <Button type="reset" variant="contained" color="warning">
//                             Cancel
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     )
// }
"use client";
import React, { useState, useEffect } from 'react';
import Heading from '../Heading';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import {
    useCreateCategoryMutation,
    useGetAllCategoryQuery,
    useUpdateCategoryMutation,
} from '@/redux/api/categoryApi';
import { useParams, useRouter } from 'next/navigation';

export default function EditCategory() {
    const params = useParams();

    // Fetch categories and locate the specific category
    const { data, isLoading } = useGetAllCategoryQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const category = data?.result?.find(
        (item) => item.category_id.toString() === params.id
    );
    const router = useRouter();
    // Local state for form inputs
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateCategory] = useUpdateCategoryMutation();

    // Populate the form fields once the category data is available
    useEffect(() => {
        if (category) {
            setName(category.name || '');
            setTitle(category.title || '');
            setDescription(category.description || '');
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            name,
            title,
            description,
        };

        try {
            const res = await updateCategory({ id: params.id, ...data }).unwrap();
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Category updated successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/dashboard/category/all-category');

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Category update failed',
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setLoading(false);
        }
    };

    const load = (
        <svg
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
                className="animate animate-bounce fill-emerald-500"
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
    );

    return (
        <section>
            <div className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3">
                <Heading path="Product" value="Edit Category" />
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                            <div>
                                <label
                                    htmlFor="categoryName"
                                    className="block text-xl font-semibold font-poppins tracking-wide"
                                >
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter category name"
                                    className="mt-1 outline-indigo-300 w-full h-12 sub-shad border bg-transparent border-gray-200 px-3 font-poppins rounded-md shadow-sm sm:text-xl"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="categoryTitle"
                                    className="block text-xl font-semibold font-poppins tracking-wide"
                                >
                                    Category Title
                                </label>
                                <input
                                    type="text"
                                    id="categoryTitle"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter category title"
                                    className="mt-1 outline-indigo-300 w-full h-12 sub-shad border bg-transparent border-gray-200 px-3 font-poppins rounded-md shadow-sm sm:text-xl"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label
                                    htmlFor="categoryDescription"
                                    className="block  text-xl font-semibold font-poppins tracking-wide"
                                >
                                    Category Description
                                </label>
                                <textarea
                                    id="categoryDescription"
                                    className="w-full outline-indigo-300 p-4 rounded-lg bg-transparent sub-shad resize-none align-top sm:text-sm"
                                    value={description}
                                    rows="4"
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter category description"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end w-full mt-5">
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className='lg:w-32 w-full'
                        >
                            {loading ? load : 'Update'}
                        </Button>
                        <Button type="reset" className='lg:w-32 w-full' variant="contained" color="warning">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
