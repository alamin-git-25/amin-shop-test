'use client';

import React, { useState } from 'react';
import 'swiper/css/bundle';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetAllBannerQuery } from '@/redux/api/bannerApi';

import ShowLoadder from '../loading/ShowLoadder';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Banner() {
    const { data, isLoading } = useGetAllBannerQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const m = Math.ceil(Math.random() * 2)
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setperPage] = useState(3)
    const lastPageIndex = currentPage * perPage;
    const fristPageIndex = lastPageIndex - perPage;
    const currentPages = data?.result?.slice(fristPageIndex, lastPageIndex);
    const router = useRouter();
    return (
        <section className="pt-28 lg:px-10 px-5">
            <div className="w-full bg-muted/50 sub-shad border border-gray-200 h-[80vh] rounded-lg overflow-hidden">
                {
                    isLoading && <ShowLoadder />
                }
                <Swiper
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    effect="fade"
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Navigation, Pagination, EffectFade]}
                >
                    {data?.result?.map((banner) => (
                        <SwiperSlide
                            key={banner.public_id}
                            className="relative"
                            style={{
                                backgroundImage: `url(${banner.image})`,
                                height: '800px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {banner?.title ? (
                                <div className="absolute top-[32%] left-44 text-white space-y-4">
                                    <h1 className=" banner text-4xl font-bold">{banner.title}</h1>
                                    <p className="text-xl banner">{banner.name}</p>
                                    {
                                        banner.link ? <button onClick={() => router.push(banner.link)} className="banner inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" >
                                            Buy Now
                                        </button> : <button className="banner inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" >
                                            Buy Now
                                        </button>
                                    }
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <button className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">Button</button>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Smaller Sections */}
            <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 mt-6">
                {
                    isLoading && <ShowLoadder />
                }
                {
                    currentPages?.map((banner) => (
                        <div key={banner.banner_id} className="relative bg-muted/50 sub-shad border border-gray-200 overflow-hidden h-[30vh] rounded-lg">
                            <img src={banner.image} alt="" className='w-full h-full object-cover' />
                            {banner?.title ? (
                                <div className="absolute top-[30%] left-10 text-white space-y-4">
                                    <h1 className="text-4xl font-bold">{banner.title}</h1>
                                    <p className="text-xl">{banner.name}</p>
                                    <button className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" >
                                        Buy Now
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <button className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">Button</button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
