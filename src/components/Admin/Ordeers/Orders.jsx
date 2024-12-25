// 'use client';

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { LinearProgress, MenuItem, Select } from '@mui/material';
// import { FormatDate } from '@/lib/utils';
// import Image from 'next/image';
// import { useSession } from 'next-auth/react';
// import ShopLayout from '@/components/custom-ui/ShopLayout';
// import Container from '@/components/custom-ui/Container';
// import { useGetAllOrderQuery, useUpdateOrderMutation } from '@/redux/api/ordersApi';
// import Heading from '../Heading';
// import axios from 'axios';



// function Row(props) {
//     const { row, onUpdateStatus } = props;
//     const [open, setOpen] = useState(false);
//     const [statas, setStatus] = useState(row.statas || "Pending");


//     const handleStatusChange = async (newStatus) => {
//         try {
//             // Update the status locally
//             setStatus(newStatus);

//             // Optional: Call a backend API to persist the status change
//             await onUpdateStatus(row.id, newStatus);
//         } catch (error) {
//             console.error("Failed to update status:", error);
//             // Optionally reset the status in case of an error
//             setStatus(row.statas);
//         }
//     };

//     return (
//         <React.Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell>ORDX{row.id}</TableCell>
//                 <TableCell>{FormatDate(row.created_at)}</TableCell>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>{row.phone}</TableCell>
//                 <TableCell>{row.address}</TableCell>
//                 <TableCell>{row.city}</TableCell>
//                 <TableCell>${row.totalPrice}</TableCell>
//                 <TableCell>
//                     <Select
//                         value={statas} // Ensure this matches the current status
//                         onChange={(e) => handleStatusChange(e.target.value)}
//                         size="small"
//                         displayEmpty
//                         renderValue={(selected) => {
//                             if (!selected) {
//                                 return <em>Select Status</em>;
//                             }
//                             return selected;
//                         }}
//                     >
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Processing">Processing</MenuItem>
//                         <MenuItem value="Completed">Completed</MenuItem>
//                         <MenuItem value="Cancelled">Cancelled</MenuItem>
//                     </Select>
//                 </TableCell>

//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} className="sub-shad border border-gray-200">
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 Ordered Items
//                             </Typography>
//                             <Table size="small" aria-label="products">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Product ID</TableCell>
//                                         <TableCell>Product</TableCell>
//                                         <TableCell>Name</TableCell>
//                                         <TableCell>Price</TableCell>
//                                         <TableCell>Quantity</TableCell>
//                                         <TableCell>Sub Total</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {JSON.parse(row.products).map((product) => (
//                                         <TableRow key={product.product_id} className="sub-sahd">
//                                             <TableCell>{product.product_id}</TableCell>
//                                             <TableCell>
//                                                 <Image
//                                                     src={product.image}
//                                                     width={200}
//                                                     height={200}
//                                                     alt=""
//                                                     className="w-[100px] aspect-video object-cover rounded"
//                                                 />
//                                             </TableCell>
//                                             <TableCell>{product.name}</TableCell>
//                                             <TableCell>${product.price}</TableCell>
//                                             <TableCell>{product.quantity}</TableCell>
//                                             <TableCell>${product.price * product.quantity}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }

// Row.propTypes = {
//     row: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//         phone: PropTypes.string.isRequired,
//         city: PropTypes.string.isRequired,
//         totalPrice: PropTypes.string.isRequired,
//         status: PropTypes.string.isRequired,
//         products: PropTypes.string.isRequired,
//     }).isRequired,
// };

// export default function CollapsibleTable() {

//     const { data, isLoading } = useGetAllOrderQuery(undefined, {
//         refetchOnFocus: true,
//         refetchOnMountOrArgChange: true
//     });
//     const [updateOrder] = useUpdateOrderMutation();
//     const handleUpdateStatus = async (id, newStatus) => {
//         try {
//             // const res = await updateOrder({ id, ...newStatus }).unwrap();
//             const res = axios.put(`/api/order/${id}`, newStatus)
//             console.log(res);

//         } catch (error) {
//             console.error(error);
//             alert("Could not update status. Please try again.");
//         }
//     };


//     return (

//         <section className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3 ">
//             <Heading path="Product" value="All Orders" />
//             {isLoading && <LinearProgress />}

//             <TableContainer className='sub-shad border border-gray-200 max-h-[70vh] scroll-thin'>
//                 <Table aria-label="collapsible table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell />
//                             <TableCell>Order ID</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Phone</TableCell>
//                             <TableCell>Address</TableCell>
//                             <TableCell>City</TableCell>
//                             <TableCell>Total Price</TableCell>
//                             <TableCell>Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>

//                         {data?.result?.map((order) => (
//                             <Row key={order.id} row={order} onUpdateStatus={handleUpdateStatus} />
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </section>

//     );
// }
'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useGetAllOrderQuery, useUpdateOrderMutation } from '@/redux/api/ordersApi';
import Heading from '../Heading';

function Row(props) {
    const { row, onUpdateStatus } = props;
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(row.status || "Pending");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setIsUpdating(true);
        try {
            setStatus(newStatus);
            await onUpdateStatus(row.id, newStatus);
        } catch (error) {
            console.error("Failed to update status:", error);
            setStatus(row.status); // Revert to original on error
        } finally {
            setIsUpdating(false);
        }
    };

    const products = Array.isArray(row.products)
        ? row.products
        : JSON.parse(row.products);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>ORDX{row.id}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>${row.totalPrice}</TableCell>
                <TableCell>
                    <Select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        size="small"
                        disabled={isUpdating}
                    >
                        {isUpdating && <MenuItem value=""><em>Updating...</em></MenuItem>}
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} className='sub-shad border border-gray-200'>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Ordered Items
                            </Typography>
                            <Table size="small" aria-label="products">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Sub Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.product_id}>
                                            <TableCell>{product.product_id}</TableCell>
                                            <TableCell>
                                                <Image
                                                    src={product.image}
                                                    width={100}
                                                    height={100}
                                                    alt=""
                                                    className="rounded"
                                                />
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>${product.price}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>${product.price * product.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        status: PropTypes.string,
        products: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    }).isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
};

export default function CollapsibleTable() {
    const { data, isLoading } = useGetAllOrderQuery();
    const [updateOrder] = useUpdateOrderMutation();


    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateOrder({ id, status }).unwrap();
            console.log("Order updated successfully:", response);
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };
    return (
        <section className="flex flex-1 flex-col gap-4 shad p-4 rounded m-3">
            <Heading path="Product" value="All Orders" />
            {isLoading && <LinearProgress />}
            <TableContainer className='sub-shad border border-gray-200'>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.result?.map((order) => (
                            <Row key={order.id} row={order} onUpdateStatus={handleUpdateStatus} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}
