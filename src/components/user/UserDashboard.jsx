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
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShopLayout from '../custom-ui/ShopLayout';
import Container from '../custom-ui/Container';
import { useGetOrderQuery } from '@/redux/api/ordersApi';
import { LinearProgress } from '@mui/material';
import { FormatDate } from '@/lib/utils';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
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
                <TableCell >
                    ORDX{row.id}
                </TableCell>
                <TableCell >
                    {FormatDate(row.created_at)}
                </TableCell>
                <TableCell >
                    {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>${row.totalPrice}</TableCell>
                <TableCell>
                    <span
                        className={`p-1 rounded text-white ${row.status === "Completed"
                            ? "bg-green-500"
                            : row.status === "Cancelled"
                                ? "bg-red-500"
                                : row.status === "Processing"
                                    ? "bg-yellow-500"
                                    : row.status === "Pending"
                                        ? "bg-blue-500"
                                        : "bg-gray-500"
                            }`}
                    >
                        {row.status}
                    </span>
                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9} className='sub-shad border border-gray-200'>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="products">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Sub Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {JSON.parse(row.products).map((product) => (
                                        <TableRow key={product.product_id} className='sub-sahd'>
                                            <TableCell><Image src={product.image} width={200} height={200} alt='' className='w-[100px] aspect-video object-cover rounded' /></TableCell>

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
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        totalPrice: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        products: PropTypes.string.isRequired,
    }).isRequired,
};

export default function CollapsibleTable() {
    const session = useSession();
    const { data, isLoading } = useGetOrderQuery(session?.data?.user?.email, undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    console.log(data);

    return (
        <ShopLayout>
            <Container className={"mt-28 min-h-screen"}>
                {isLoading && <LinearProgress />}

                <TableContainer component={Paper} className='shad'>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data?.result?.map((order) => (
                                <Row key={order.id} row={order} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ShopLayout>
    );
}
