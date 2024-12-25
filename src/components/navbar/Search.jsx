"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { X } from 'lucide-react';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { useRouter } from 'next/navigation';
export default function SearchBar({ openBox, setOpenBox }) {
    const { data: products, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const [search, setSearch] = useState('');

    const filteredProducts = products?.result?.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = product.category.toLowerCase().includes(search.toLowerCase());
        return matchesName || matchesCategory;
    });
    const route = useRouter();
    const handleClick = (id) => {
        route.push(`/details/${id}`);
        setOpenBox(!openBox)
    }
    return (
        <section>
            <Dialog open={openBox} >
                <DialogContent className="lg:max-w-screen-xl overflow-hidden  z-[99999] [&_.closeBtn]:hidden">
                    <div>
                        <span className='flex justify-end'>
                            <X className='' onClick={() => setOpenBox(!openBox)} />
                        </span>
                        <div className="relative">
                            <label htmlFor="Search" className="sr-only"> Search </label>
                            <input
                                type="text"
                                id="Search"
                                placeholder="Search by name or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="mt-6 outline-indigo-300 w-full h-12 sub-shad border bg-transparent border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
                            />

                            <SearchRoundedIcon className='absolute top-9 right-6' />
                        </div>
                        <div className='mt-5 scroll-thin pr-1 overflow-auto gap-4 grid lg:grid-cols-4 grid-cols-1 max-h-[60vh] '>
                            {filteredProducts?.length ? (
                                filteredProducts.map((product) => (
                                    <div onClick={() => handleClick(product.product_id)} key={product.product_id} className="p-4 sub-shad border rounded-md shadow-sm">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-40 object-cover rounded-md mb-2"
                                        />
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-sm text-gray-600">{product.category}</p>
                                        <p className="text-lg font-bold">${product.price}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-4 text-center text-gray-500">No products found</div>
                            )}

                        </div>
                    </div>
                </DialogContent>
            </Dialog>






        </section >
    )
}
