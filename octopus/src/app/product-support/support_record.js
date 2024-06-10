'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateProductStatus, addComment } from './action';
import { Badge } from '@/components/ui/badge';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import Link from 'next/link';
import next from 'next';

export default function SupportRecord(product) {
    const [newComment, setNewComment] = useState('');

    const handleStatusChange = async (newStatus, productId) => {
        await updateProductStatus(productId, newStatus);
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        await addComment(product.id, newComment);
        setNewComment('');
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const mostRecentComment = product.comments.length > 0
        ? product.comments[product.comments.length - 1].comment
        : 'No comments';

    return (
        <TableRow key={product.id}>
            <TableCell>{product.customer_name}</TableCell>
            <TableCell>{product.product}</TableCell>
            <TableCell>
                <Select defaultValue={product.status} onValueChange={(newStatus) => handleStatusChange(newStatus, product.id)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Picked Up">Picked Up</SelectItem>
                        <SelectItem value="Charging">Charging</SelectItem>
                        <SelectItem value="Holding">Holding</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>{new Date(product.dropoff_date).toLocaleDateString()}</TableCell>
            <TableCell>{product.isWholesale ? 'Wholesale' : 'Walk-in'}</TableCell>
            <TableCell>{product.phone_number || 'N/A'}</TableCell>
            <TableCell style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="inline-flex items-center">
                            <span className='pr-1'>{truncateText(mostRecentComment, 50)}</span>
                            <Badge>{product.comments.length}</Badge>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className="p-4">
                            <h4 className="text-lg font-bold">Comments</h4>
                            <ul>
                                {product.comments.length > 0 ? (
                                    product.comments.map(comment => (
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
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">+ Comment</Button>
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
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Link href={`/product-support/${product.id}`}>
                    <Button variant="outline" className="ml-2">View</Button>
                </Link>
                <Button variant="primary" className="ml-2">Resolve</Button>
            </TableCell>
        </TableRow>
    );
}
