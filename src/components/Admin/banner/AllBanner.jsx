// "use client"
// import { useDeleteBannerMutation, useGetAllBannerQuery, useUpdateBannerMutation } from "@/redux/api/bannerApi";
// import Heading from "../Heading";
// import Image from "next/image";
// import { Button, Tooltip } from "@mui/material";
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import { Edit, Plus } from "lucide-react";
// import Swal from "sweetalert2";
// import { useState } from "react";
// import ShowLoadder from "@/components/loading/ShowLoadder";
// import P from "../products/add-product/P";
// import { useRouter } from "next/navigation";
// export default function AllBanner() {
//     const { data, isLoading } = useGetAllBannerQuery(undefined, {
//         refetchOnFocus: true,
//         refetchOnMountOrArgChange: true
//     })
//     console.log(data);

//     const [loading, setLoading] = useState(false);
//     const [updateBanner] = useUpdateBannerMutation();
//     const handleUpdate = async (e, id, st) => {
//         e.preventDefault();
//         setLoading(true)
//         try {
//             let status = ''
//             if (st === 'Active') {
//                 status = 'Inactive'
//             } else {
//                 status = 'Active'
//             }
//             const res = await updateBanner({ id, ...status }).unwrap()
//             console.log(res);

//         }
//         catch (error) {
//             console.log(error.message);
//         } finally {
//             setLoading(false)
//         }
//     }
//     const [deleteBanner] = useDeleteBannerMutation();
//     const handleDelete = (publicId) => {
//         const cleanId = publicId.replace("banner/", "");
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 setLoading(true)
//                 try {
//                     await deleteBanner(cleanId).unwrap(); // Pass the cleaned ID
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "Your file has been deleted.",
//                         icon: "success"
//                     });
//                 } catch (error) {
//                     console.error("Error deleting product:", error);
//                     Swal.fire("Error", "Failed to delete product.", "error");
//                 } finally {
//                     setLoading(false)
//                 }
//             }
//         });
//     };
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
//     const router = useRouter()
//     return (
//         <section className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
//             <Heading path="Product" value="All BAnner" />
//             {loading && <ShowLoadder />}
//             <div className="grid gap-5">
//                 {
//                     data?.result?.map((banner) => (
//                         <div key={banner.public_id} className="overflow-hidden  rounded bg-white text-slate-500 shadow-md shadow-slate-200">
//                             {/*  <!--  Image --> */}
//                             <figure>
//                                 <img
//                                     src={banner.image}
//                                     alt="card image"
//                                     className="aspect-square w-full"
//                                 />
//                             </figure>
//                             {/*  <!-- Body--> */}
//                             <div className="p-6">
//                                 <div className="sm:flex sm:items-end gap-3  sm:justify-start">
//                                     <button
//                                         onClick={() => handleUpdate(banner.banner_id, banner.status)}
//                                         className="block bg-yellow-300 px-5 my-3 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
//                                     >
//                                         {loading ? load : banner.status}
//                                     </button>
//                                     <Tooltip title="Edit" placement="top">
//                                         <button

//                                             className="block bg-yellow-300 my-3 px-5 py-2.5 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
//                                         >
//                                             <Edit className='w-5 h-5' />
//                                         </button>
//                                     </Tooltip>
//                                     <Tooltip title="Delete" placement="top">
//                                         <button
//                                             onClick={() => handleDelete(banner.public_id)}
//                                             className="block bg-yellow-300 my-3 px-5 py-2.5 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
//                                         >
//                                             <DeleteRoundedIcon className='w-5 h-5' />
//                                         </button>
//                                     </Tooltip>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//             <div>

//                 {data?.result?.length <= 0 && <p className='font-poppins font-semibold text-xl'>No data avilable <Button onClick={() => router.push('/dashboard/banner/add-banner')} variant="contained" color="primary"><Plus />Add</Button></p>}
//             </div>
//         </section>
//     )
// }

"use client";
import { useDeleteBannerMutation, useGetAllBannerQuery, useUpdateBannerMutation } from "@/redux/api/bannerApi";
import Heading from "../Heading";
import Image from "next/image";
import { Button, Tooltip } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Edit, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import ShowLoadder from "@/components/loading/ShowLoadder";
import { useRouter } from "next/navigation";

export default function AllBanner() {
    const { data, isLoading } = useGetAllBannerQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const [loadingId, setLoadingId] = useState(null); // Track loading state per banner
    const [updateBanner] = useUpdateBannerMutation();
    const [deleteBanner] = useDeleteBannerMutation();
    const router = useRouter();

    const handleUpdate = async (id, currentStatus) => {
        setLoadingId(id);
        try {
            const status = currentStatus === "Active" ? "Inactive" : "Active";
            await updateBanner({ id, status }).unwrap();
        } catch (error) {
            console.error("Update error:", error.message);
        } finally {
            setLoadingId(null);
        }
    };

    const handleDelete = (publicId) => {
        const cleanId = publicId.replace("banner/", "");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoadingId(cleanId);
                try {
                    await deleteBanner(cleanId).unwrap();
                    Swal.fire("Deleted!", "Your banner has been deleted.", "success");
                } catch (error) {
                    console.error("Delete error:", error.message);
                    Swal.fire("Error", "Failed to delete the banner.", "error");
                } finally {
                    setLoadingId(null);
                }
            }
        });
    };

    if (isLoading) return <ShowLoadder />;
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
        <section className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3">
            <Heading path="Product" value="All Banners" />
            <div className="grid gap-5">
                {data?.result?.map((banner) => (
                    <div
                        key={banner.public_id}
                        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
                    >
                        <figure className="relative w-full h-64">
                            <Image
                                src={banner.image}
                                alt="Banner Image"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t"
                            />
                        </figure>
                        <div className="p-6">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleUpdate(banner.banner_id, banner.status)}
                                    disabled={loadingId === banner.banner_id}
                                    className="block bg-yellow-300 px-5 py-3 text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                                >
                                    {loadingId === banner.banner_id ? `Updating...` : banner.status}
                                </button>
                                <Tooltip title="Edit" placement="top">
                                    <button className="block bg-yellow-300 px-5 py-2.5 text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Delete" placement="top">
                                    <button
                                        onClick={() => handleDelete(banner.public_id)}
                                        disabled={loadingId === banner.public_id}
                                        className="block bg-yellow-300 px-5 py-2.5 text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                                    >
                                        {loadingId === banner.public_id ? (
                                            "Deleting..."
                                        ) : (
                                            <DeleteRoundedIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {data?.result?.length === 0 && (
                <p className="font-poppins font-semibold text-xl">
                    No data available
                    <Button
                        onClick={() => router.push("/dashboard/banner/add-banner")}
                        variant="contained"
                        color="primary"
                        className="ml-2"
                    >
                        <Plus /> Add
                    </Button>
                </p>
            )}
        </section>
    );
}

