'use client';
import {
    TableRow,
    TableCell,
    Table
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateProductStatus, addComment, updateProductProcess, updateProductResolution, getProductSupportTicket } from './action'; // Import the new function
import { Badge } from '@/components/ui/badge';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { format } from 'date-fns';
import { ReceiptText, MessageSquareDiff, PiggyBank, HandCoins, Trash2, Undo2, Replace } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SupportRecord(initialProduct) {
    const [newComment, setNewComment] = useState('');
    const [record, setRecord] = useState(initialProduct);
    const closeDialogRef = useRef(null); // Reference for DialogClose

    useEffect(() => {
        fetchProduct(record.id);
    }, [record.id]);

    const fetchProduct = async (id) => {
        const data = await getProductSupportTicket(id);
        setRecord(data);
    };

    const handleStatusChange = async (newStatus, itemId) => {
        await updateProductStatus(itemId, newStatus);
        fetchProduct(record.id);
    };

    const handleProcessChange = async (newProcess, itemId) => {
        await updateProductProcess(itemId, newProcess);
        fetchProduct(record.id);
    };

    const handleResolutionChange = async (resolution, itemId) => {
        await updateProductResolution(itemId, resolution);
        fetchProduct(record.id);
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        await addComment(record.id, newComment);
        setNewComment('');
        fetchProduct(record.id);

        // Close the dialog programmatically
        if (closeDialogRef.current) {
            closeDialogRef.current.click();
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const mostRecentComment = record.comments.length > 0
        ? record.comments[record.comments.length - 1].comment
        : 'No comments';

    return (
        <TableRow key={record.id} className="border-gray-400 ">
            <TableCell className="max-w-xs"><div><span className='font-bold'>{record.customer_name}</span>{record.phone_number ? ', ' + record.phone_number : ' '}</div><div>
                {format(new Date(record.dropoff_date), 'PP')}, {record.isWholesale ? 'Wholesale' : 'Walk-in'}</div></TableCell>

            <TableCell className="max-w-sm">
                {record.items.map((item, index) => (
                    <div key={item.id} className={`${index !== record.items.length - 1 ? 'mb-8' : ''}`}>
                        {item.product} - {item.supportType}
                    </div>
                ))}
            </TableCell>
            <TableCell className="max-w-28 min-w-28">
                {record.items.map((item, index) => (
                    <Select key={item.id} id="process" defaultValue={item.process} onValueChange={(newProcess) => handleProcessChange(newProcess, item.id)} >
                        <SelectTrigger className={`${index !== record.items.length - 1 ? 'mb-4' : ''} bg-white`}>
                            <SelectValue placeholder="Select process" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Inspecting">Inspecting</SelectItem>
                            <SelectItem value="Charging">Charging</SelectItem>
                            <SelectItem value="Sitting">Sitting</SelectItem>
                            <SelectItem value="Stock">Stock</SelectItem>
                            <SelectItem value="Calling">Calling</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                ))}
            </TableCell>
            <TableCell className="max-w-28 min-w-28">
                {record.items.map((item, index) => (
                    <Select key={item.id} defaultValue={item.status} onValueChange={(newStatus) => handleStatusChange(newStatus, item.id)}>
                        <SelectTrigger className={`${index !== record.items.length - 1 ? 'mb-4' : ''} bg-white`}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" - "> - </SelectItem>
                            <SelectItem value="Broken">Broken</SelectItem>
                            <SelectItem value="Dead Cell">Dead Cell</SelectItem>
                            <SelectItem value="Worn">Worn</SelectItem>
                            <SelectItem value="Not Holding Charge">Not Holding Charge</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                        </SelectContent>
                    </Select>
                ))}
            </TableCell>
            <TableCell className="max-w-28 min-w-28">
                <div className="flex flex-col">
                    {record.items.map((item, index) => (
                        <DropdownMenu key={item.id}>
                            <DropdownMenuTrigger asChild>
                                <Button className={`${index !== record.items.length - 1 ? 'mb-4' : ''} ${item.isResolved ? 'bg-gray-300' : ''}`} variant="outline">
                                    {item.isResolved ? `${item.resolution}` : 'Resolve'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-w-xs">
                                <DropdownMenuItem onClick={() => handleResolutionChange('Credited', item.id)}>
                                    <PiggyBank className="mr-2 h-5 w-5" /> Credited
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResolutionChange('Scrapped', item.id)}>
                                    <Trash2 className="mr-2 h-5 w-5" /> Scrapped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResolutionChange('Returned', item.id)}>
                                    <Undo2 className="mr-2 h-5 w-5" /> Returned
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResolutionChange('Refunded', item.id)}>
                                    <HandCoins className="mr-2 h-5 w-5" /> Refunded
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResolutionChange('Warrantied', item.id)}>
                                    <Replace className="mr-2 h-5 w-5" /> Warrantied
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResolutionChange('Recon', item.id)}>
                                    <Replace className="mr-2 h-5 w-5" /> Recon
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>
            </TableCell>
            <TableCell className="max-w-40 break-words text-center">
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="inline-flex items-center text-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className=""><MessageSquareDiff /></Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Add Comment</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        <Input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Type your comment here"
                                            className="w-full"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleAddComment} className="mr-2">Submit</Button>
                                        <DialogClose asChild>
                                            <Button ref={closeDialogRef} type="button" variant="secondary">
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Badge className='ml-2'>{record.comments.length}</Badge>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className="p-4 text-left">
                            <h4 className="text-lg font-bold">Comments</h4>
                            <ul>
                                {record.comments.length > 0 ? (
                                    record.comments.map(comment => (
                                        <li key={comment.id} className='py-2'>
                                            <div>{comment.comment}</div>
                                            <small>{new Date(comment.comment_date).toLocaleDateString()}</small>
                                        </li>
                                    ))
                                ) : (
                                    <li>No comments available</li>
                                )}
                            </ul>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </TableCell>

            <TableCell className="max-w-xs text-right">

                <Link href={`/product-support/${record.id}`}>
                    <Button variant="outline" className=""><ReceiptText className='h-5 w-5' />
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    );
}
