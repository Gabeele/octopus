'use client';

import { useEffect, useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSupportProducts, addSupportTicket } from './action';
import SupportRecord from './support_record';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import SupportActionBar from './support_bar';
import NewTicketDialog from './new_ticket_modal';
import { Button } from '@/components/ui/button';
import { toast, useToast } from '@/components/ui/use-toast';

export default function SupportTable() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [includeResolved, setIncludeResolved] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [returnType, setReturnType] = useState('All');

    const router = useRouter();
    const {toast} = useToast();

    const ticketsPerPage = 20;

    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const fetchData = async () => {
        setLoading(true);
        const { tickets, total } = await getSupportProducts(includeResolved, searchQuery, currentPage, ticketsPerPage, returnType);
        setTickets(tickets);
        setTotalPages(Math.ceil(total / ticketsPerPage));
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [includeResolved, searchQuery, currentPage, returnType]);

    const handleSubmitTicket = async (finalTicket) => {
        try{

            const createTicket = await addSupportTicket(finalTicket);
            router.push(`/product-support/${createTicket.id}`);

            toast({title:"Sweet success!", description:"Your ticket was saved."})
        }
        catch(e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your saving the ticket.",
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const debouncedSearch = debounce((value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 200);

    return (
        <div>
            <SupportActionBar
                onSearchChange={debouncedSearch}
                includeResolved={includeResolved}
                onIncludeResolvedChange={setIncludeResolved}
                returnType={returnType}
                onReturnTypeChange={setReturnType}
                onAddTicket={() => setIsModalOpen(true)}
            />

            <NewTicketDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitTicket}
            />

            {loading ? (
                <div>
                    <Skeleton className="w-[200px] h-[40px] mb-2 rounded" />
                    <Skeleton className="w-full h-[40px] mb-2 rounded" />
                    <Skeleton className="w-full h-[40px] mb-2 rounded" />
                    <Skeleton className="w-full h-[40px] mb-2 rounded" />
                </div>
            ) : (
                <div>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
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

                    <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button variant="outline" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
