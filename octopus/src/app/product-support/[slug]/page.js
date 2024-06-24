'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getProductSupportTicket, updateProductStatus, updateProductProcess, updateProductResolution, addComment, toggleLoaner, deleteProductSupportTicket } from './action';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftCircle, PiggyBank, Trash2, Undo2, HandCoins, Replace } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function ProductSupportDetails() {
    const id = parseInt(usePathname().split('/').pop());
    const [productData, setProductData] = useState(null);
    const [newComment, setNewComment] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    async function fetchProduct(id) {
        const data = await getProductSupportTicket(id);
        setProductData(data);
    }

    const handleStatusChange = async (newStatus, itemId) => {
        await updateProductStatus(itemId, newStatus);
        fetchProduct(id);
    };

    const handleProcessChange = async (newProcess, itemId) => {
        await updateProductProcess(itemId, newProcess);
        fetchProduct(id);
    };

    const handleResolutionChange = async (resolution, itemId) => {
        await updateProductResolution(itemId, resolution);
        fetchProduct(id);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;
        await addComment(id, newComment);
        setNewComment('');
        fetchProduct(id);
    };

    const handleHasLoanerChange = async (itemId) => {
        await toggleLoaner(itemId);
        fetchProduct(id);
    };

    const navigateToProductSupport = () => {
        router.push('/product-support');
    }

    const handelDelete = async () => {
        await deleteProductSupportTicket(id);
        navigateToProductSupport();
    }


    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Product Support Details</h1>
                <div>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant='destructive'><Trash2 className='w-5 h-5 mr-2' />Delete</Button>

                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the ticket
                                    and remove the data from the server.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handelDelete()}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button variant="outline" className="ml-2" onClick={() => navigateToProductSupport()}><ArrowLeftCircle className='mr-2 h-5 w-5' /> Back</Button>

                </div>
            </div>
            <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Customer Name:</strong> {productData.customer_name}</p>
                    <p><strong>Phone:</strong> {productData.phone_number ? productData.phone_number : 'N/A'}</p>
                    <p><strong>Customer Type:</strong> {productData.isWholesale ? 'Wholesale' : 'Walk-in'}</p>
                    <p><strong>Dropoff Date:</strong> {format(new Date(productData.dropoff_date), 'PP')}</p>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>CCA</TableHead>
                            <TableHead>Voltage</TableHead>
                            <TableHead>Loaner</TableHead>
                            <TableHead>Process</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Resolution</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productData.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product} - {item.supportType}</TableCell>
                                <TableCell>{item.age}  </TableCell>
                                <TableCell>
                                    {item.cca}
                                </TableCell>
                                <TableCell>
                                    {item.voltage}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="loaner" checked={item.hasLoaner} onCheckedChange={() => handleHasLoanerChange(item.id)} />
                                        <Label htmlFor="loaner">Has loaner</Label>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-28 min-w-28">
                                    <Select id={`process-${item.id}`} defaultValue={item.process} onValueChange={(newProcess) => handleProcessChange(newProcess, item.id)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Process" />
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
                                </TableCell>
                                <TableCell className="max-w-28 min-w-28">
                                    <Select id={`status-${item.id}`} defaultValue={item.status} onValueChange={(newStatus) => handleStatusChange(newStatus, item.id)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Status" />
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
                                </TableCell>
                                <TableCell className="flex flex-col items-right ">
                                    <DropdownMenu key={item.id}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                {item.isResolved ? `${item.resolution} - ${format(new Date(productData.dropoff_date), 'PP')}` : 'Resolve'}
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

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                <div className="space-y-2">
                    {productData.comments.map(comment => (
                        <p key={comment.id}><strong>{format(new Date(comment.comment_date), 'PP')}</strong> {comment.comment}</p>
                    ))}
                </div>
                <Textarea
                    placeholder="Add a new comment..."
                    className="mt-4 bg-white"
                    rows={3}
                    value={newComment}
                    variant="primary"
                    onChange={(e) => setNewComment(e.target.value)}

                />
                <Button className="mt-2" onClick={handleCommentSubmit}>Submit</Button>
            </div>
        </div>
    );
}
