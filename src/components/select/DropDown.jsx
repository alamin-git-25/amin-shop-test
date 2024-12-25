"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';

export default function AnimatedDropdown({ setSelectedCategory }) {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const { data: categorys, isLoading } = useGetAllCategoryQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    useEffect(() => {
        if (Array.isArray(categorys?.result)) {
            const addCategory = { category_id: 0, name: 'All Category' };
            setCategory([addCategory, ...categorys?.result]);
        } else {
            setCategory([]);
        }
    }, [categorys]);


    // Toggle the dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Variants for animation
    const dropdownVariants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };
    const handleClick = (value) => {
        setSelectedCategory(value)
    }
    return (
        <div className="mt-1 w-full relative h-12 outline-indigo-300 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl">
            {/* Dropdown Toggle Button */}
            <button
                onClick={toggleDropdown}
                className="w-full py-3 text-left"
            >
                Category
            </button>

            {/* Dropdown Content */}
            <motion.div
                className="absolute left-0  top-full mt-2  bg-white rounded-md shadow-lg overflow-hidden w-full h-12 outline-indigo-300 bg-transparent sub-shad border border-gray-200 px-3 font-poppins    sm:text-xl"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={dropdownVariants}
            >
                <ul className="p-2">
                    {
                        category?.map((cat) => (
                            <li onClick={() => handleClick(cat.name)} key={cat.name} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                                {cat.name}
                            </li>
                        ))
                    }
                </ul>
            </motion.div>
        </div>
    );
}
