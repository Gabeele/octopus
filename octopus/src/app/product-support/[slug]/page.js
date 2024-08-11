'use client';
import { useState, useEffect, useRef } from 'react';
import { format, addDays } from 'date-fns';
import { getProductSupportTicket, updateProductStatus, updateProductProcess, updateProductResolution, addComment, toggleLoaner, deleteProductSupportTicket } from './action';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftCircle, PiggyBank, Trash2, Undo2, HandCoins, Replace, Recycle, Printer, PackageOpen } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton'; 
import { useToast } from '@/components/ui/use-toast'; 

export default function ProductSupportDetails() {
    const id = parseInt(usePathname().split('/').pop());
    const [productData, setProductData] = useState(null);
    const [newComment, setNewComment] = useState('');
    const router = useRouter();
    const printRef = useRef();
    const { toast } = useToast();

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
        try {
            await updateProductStatus(itemId, newStatus);
            fetchProduct(id);
            toast({
                title: "Status Updated!",
                description: "The battery is feeling good about its new status!",
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "The status update hit a snag.",
            });
        }
    };

    const handleProcessChange = async (newProcess, itemId) => {
        try {
            await updateProductProcess(itemId, newProcess);
            fetchProduct(id);
            toast({
                title: "Process Updated!",
                description: "The process is moving along smoothly!",
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "The process got stuck in traffic.",
            });
        }
    };

    const handleResolutionChange = async (resolution, itemId) => {
        try {
            await updateProductResolution(itemId, resolution);
            fetchProduct(id);
            toast({
                title: "Resolution Updated!",
                description: "Another mystery has been resolved!",
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "The resolution is still a mystery.",
            });
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;
        try {
            await addComment(id, newComment);
            setNewComment('');
            fetchProduct(id);
            toast({
                title: "Comment Added!",
                description: "Your thoughts have been captured!",
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Your comment got lost in the ether.",
            });
        }
    };

    const handleHasLoanerChange = async (itemId) => {
        try {
            await toggleLoaner(itemId);
            fetchProduct(id);
            toast({
                title: "Loaner Status Updated!",
                description: "Loaner status toggled successfully!",
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "The loaner status toggle failed.",
            });
        }
    };

    const navigateToProductSupport = () => {
        router.push('/product-support');
    }

    const handelDelete = async () => {
        try {
            await deleteProductSupportTicket(id);
            toast({
                title: "Product Support Ticket Deleted!",
                description: "The ticket has been successfully deleted!",
            });
            navigateToProductSupport();
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "The ticket could not be deleted.",
            });
        }
    }

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    if (!productData) {
        return (
            <div>
                <Skeleton className="w-[200px] h-[40px] mb-2 rounded" />
                <Skeleton className="w-full h-[40px] mb-2 rounded" />
                <Skeleton className="w-full h-[40px] mb-2 rounded" />
                <Skeleton className="w-full h-[40px] mb-2 rounded" />
            </div>
        );
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Product Support Details</h1>
                <div>
                    <Button variant="outline" className="mr-2" onClick={() => navigateToProductSupport()}><ArrowLeftCircle className='mr-2 h-5 w-5' /> Back</Button>
                    <Button variant="outline" className="mr-2" onClick={handlePrint}><Printer className='h-5 w-5 mr-2' />Print</Button>
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
                            <TableHead>Voltage</TableHead>
                            <TableHead>CCA</TableHead>
                            <TableHead>Loaner</TableHead>
                            <TableHead>Process</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Resolution</TableHead>
                            <TableHead>Last Pickup Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productData.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product} - {item.supportType}</TableCell>
                                <TableCell>{item.age}</TableCell>
                                <TableCell>{item.voltage}</TableCell>
                                <TableCell>{item.cca}</TableCell>
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
                                                {item.isResolved ? `${item.resolution} on ${format(new Date(item.resolveDate), 'PP')}` : 'Resolve'}
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="max-w-xs">
                                            <DropdownMenuItem onClick={() => handleResolutionChange('null', item.id)}>
                                                <PackageOpen className="mr-2 h-5 w-5" /> Reopen (Null)
                                            </DropdownMenuItem>
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
                                                <Recycle className="mr-2 h-5 w-5" /> Recon
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell>
                                    {format(addDays(new Date(productData.dropoff_date), 30), 'PP')}
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

            {/* Hidden print content */}
            <div className="hidden" >
                <div ref={printRef}>
                    <div className="flex text-left mb-5 text-sm">
                        <img src="/BW-logo.jpg" alt="Battery Wholesale" className="w-20" />
                        <div className="pl-2">
                            <p>320 Lawrence Ave, Kitchener N2M 1Y4</p>
                            <p>(519) 743-2087 sales@batterywholesale.ca</p>
                        </div>
                    </div>
                    <hr />
                    <h1 className="text-center text-lg font-bold mt-4">Product Support Details</h1>
                    <hr className="my-4" />
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
                                    <TableHead>Voltage</TableHead>
                                    <TableHead>CCA</TableHead>
                                    <TableHead>Loaner</TableHead>
                                    <TableHead>Process</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Resolution</TableHead>
                                    <TableHead>Last Pickup Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productData.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product} - {item.supportType}</TableCell>
                                        <TableCell>{item.age}</TableCell>
                                        <TableCell>{item.voltage}</TableCell>
                                        <TableCell>{item.cca}</TableCell>
                                        <TableCell>{item.hasLoaner ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{item.process}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.isResolved ? `${item.resolution} on ${format(new Date(item.resolveDate), 'PP')}` : 'Pending'}</TableCell>
                                        <TableCell>                                    {format(addDays(new Date(productData.dropoff_date), 30), 'PP')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mb-6">
                        {productData.comments.length > 0 && <h2 className="text-xl font-semibold mb-2">Comments</h2>}
                        <div className="space-y-2">
                            {productData.comments.map(comment => (
                                <p key={comment.id}><strong>{format(new Date(comment.comment_date), 'PP')}</strong> {comment.comment}</p>
                            ))}
                        </div>
                    </div>
                    <div className="fixed bottom-2 w-full text-xs text-gray-400 text-left">
                        <p><strong>Disclaimer:</strong> Products must be collected within 30 days of the drop-off date. Items not picked up within this period may be discarded, and Battery Wholesale is not liable for unclaimed products. It is the customer's responsibility to maintain communication regarding their items. Battery Wholesale is not responsible for damages or loss during the warranty period or while in storage. All warranties provided by Battery Wholesale and their manufacturers are strictly limited to defects in materials or manufacturing, not abuse or misuse. The validity and execution of warranties are at the discretion of Battery Wholesale and the manufacturer. Lack of communication from Battery Wholesale does not relieve customers of their responsibility to collect items or address concerns within the 30-day period. Battery Wholesale is not liable for consequential or incidental damages, including but not limited to loss of use, data, or business profits, related to the storage or handling of customer products.</p>
                    </div>
                </div>
            </div>

        </div >
    );
}
