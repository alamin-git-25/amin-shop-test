"use client"
import { Search } from 'lucide-react';
import React, { useState } from 'react';

export default function SearchInput({ search, setSearch }) {




    return (
        <form className="relative w-full  mx-auto">
            {/* Search Icon */}
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search />
            </span>

            {/* Search Input */}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="mt-1 w-full h-12 pl-10 outline-indigo-300 bg-transparent sub-shad border border-gray-200 px-3 font-poppins rounded-md  shadow-sm sm:text-xl"
            />
        </form>
    );
}


