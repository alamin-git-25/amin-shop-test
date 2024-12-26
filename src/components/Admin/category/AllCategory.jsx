"use client";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import Heading from '../Heading';
import LineLoader from '@/components/loading/loading';


export default function AllCategory() {
    const { data, isLoading } = useGetAllCategoryQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = (id) => {
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
                try {
                    await deleteCategory(id).unwrap(); // Pass the cleaned ID
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        showCancelButton: false,
                    });
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire("Error", "Failed to delete product.", "error");
                }
            }
        });
    };

    const router = useRouter();

    return (
        <section className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
            <Heading path="Product" value="All Category" />
            <TableContainer component={Paper} className='bg-transparent '>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='sub-shad border border-gray-200'>
                        <TableRow >

                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Name</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Title</TableCell>
                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Description</TableCell>

                            <TableCell className='font-poppins text-black text-xl font-bold' align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading && <TableRow>
                                <TableCell className='w-full flex justify-center items-center'>
                                    <LineLoader />
                                </TableCell>
                            </TableRow>
                        }
                        {
                            data?.result?.length > 0 && data?.result?.map((category) => (
                                <TableRow
                                    className='sub-shad border border-gray-200'
                                    key={category.category_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{category.name}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">{category.title}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left"> {category.description}</TableCell>
                                    <TableCell className='font-poppins text-black text-xl font-semibold' align="left">
                                        <span className='flex gap-4 text-indigo-600 items-center cursor-pointer'><Tooltip title="Edit" placement="left"><Edit className='w-6 h-6' onClick={() => router.push(`/dashboard/category/edit-category/${category.category_id}`)} /></Tooltip><Tooltip title="Delete" placement="right"><DeleteRoundedIcon onClick={() => handleDelete(category.category_id)} className='w-7 h-7' /></Tooltip></span>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {
                        data?.result?.length <= 0 && <TableRow>
                            <TableCell align='center' colSpan="11">
                                <p className='font-poppins font-semibold text-xl'>No data avilable</p>
                            </TableCell>
                        </TableRow>
                    }
                </Table>
            </TableContainer>

        </section>
    )
}
