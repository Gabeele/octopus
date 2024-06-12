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
import { getSupportProducts } from './action';
import SupportRecord from './support_record';
import Link from 'next/link';

export default function SupportTable() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const tickets = await getSupportProducts();
        setTickets(tickets);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Dropoff Date</TableHead>
                    <TableHead>Customer Type</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Process</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-center">Comments</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tickets.map((ticket) => (
                    <SupportRecord key={ticket.id} {...ticket} />
                ))}
            </TableBody>
        </Table>
    );
}
