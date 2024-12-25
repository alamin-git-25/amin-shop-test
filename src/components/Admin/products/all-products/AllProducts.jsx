"use client";
import Heading from '../../Heading'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Alert, AlertTitle, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Image from 'next/image';
import { Edit, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDeleteProductMutation, useGetAllProductQuery } from '@/redux/api/productApi';
import { useState } from 'react';


export default function AllProducts() {
    const { data, isLoading } = useGetAllProductQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [deleteProduct] = useDeleteProductMutation();

    const [loading, setLoading] = useState(false);

    const handleDelete = (publicId) => {
        const cleanId = publicId.replace("product_image/", "");

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
                setLoading(true)
                try {
                    await deleteProduct(cleanId).unwrap(); // Pass the cleaned ID
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire("Error", "Failed to delete product.", "error");
                } finally {
                    setLoading(false)
                }
            }
        });
    };

    const router = useRouter();

    return (
        <section className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
            <Heading path="Product" value="All Product" />
            <TableContainer component={Paper} className='bg-transparent '>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='sub-shad border border-gray-200'>
                        <TableRow >
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Product Image</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Name</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Title</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Price</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Category</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Stock</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Status</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading && <TableRow>
                                <TableCell className='w-full flex justify-center items-center'>
                                    <LinearProgress />
                                </TableCell>
                            </TableRow>
                        }
                        {
                            loading && <TableRow>
                                <TableCell className='w-full flex justify-center items-center'>
                                    <LinearProgress />
                                </TableCell>
                            </TableRow>
                        }
                        {
                            data?.result?.map((product) => (
                                <TableRow
                                    className='sub-shad border border-gray-200'
                                    key={product.product_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >
                                        <Image
                                            src={product.image} // Access the first URL from the parsed array
                                            alt="Product Image"
                                            width={500}
                                            height={500}
                                            className="w-28 aspect-video object-cover rounded border"
                                        />
                                    </TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{product.name}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{product.title}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">$ {product.price}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{product.category}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{product.stock}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{product.isPublished}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">
                                        <span className='flex gap-4 text-indigo-600 items-center cursor-pointer'><Tooltip title="Edit" placement="left"><Edit className='w-6 h-6' onClick={() => router.push(`/dashboard/product/edit-product/${product.product_id}`)} /></Tooltip><Tooltip title="Delete" placement="right"><DeleteRoundedIcon onClick={() => handleDelete(product.public_id)} className='w-7 h-7' /></Tooltip></span>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {
                        data?.result.length <= 0 && <TableRow>
                            <TableCell align='center' colSpan="11">
                                <p className='font-poppins font-semibold text-xl'>No data avilable <Button onClick={() => router.push('/dashboard/product/add-product')} variant="contained" color="primary"><Plus />Add</Button></p>
                            </TableCell>
                        </TableRow>
                    }
                </Table>
            </TableContainer>

        </section>
    )
}
