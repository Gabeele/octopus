'use client';
import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import getSupportProducts from './actions';
import SupportRecord from './support_record';

export default function SupportTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const returns = await getSupportProducts();
        setProducts(returns);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Table>
            <TableCaption>Support Products</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dropoff Date</TableHead>
                    <TableHead>Customer Type</TableHead>
                    <TableHead>Phone Number</TableHead>

                </TableRow>

            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <SupportRecord key={product.id} {...product} />
                ))}
            </TableBody>
        </Table>
    );
}
