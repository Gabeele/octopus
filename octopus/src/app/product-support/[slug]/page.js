'use client';
import { useState, useEffect } from 'react';
import { getProductSupportItem } from './action';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';

export default function ProductSupportDetails({ params }) {
    const id = usePathname().split('/').pop();
    const [productData, setProductData] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    async function fetchProduct(id) {
        const data = await getProductSupportItem(id);
        setProductData(data);
    }

    const handleCommentSubmit = () => {
        // Handle comment submission logic here
        console.log(newComment);
    };

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Product Support Details</h1>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">Resolve</Button>
                    <Button variant="outline">Close</Button>
                    <Button variant="outline">Escalate</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="customer-name">Customer Name</Label>
                            <p id="customer-name" className="text-gray-500 dark:text-gray-400">
                                {productData.customer_name}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="phone-number">Phone Number</Label>
                            <p id="phone-number" className="text-gray-500 dark:text-gray-400">
                                {productData.phone_number || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="process">Process</Label>
                            <Select id="process" defaultValue={productData.process}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select process" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Inspecting">Inspecting</SelectItem>
                                    <SelectItem value="Charging">Charging</SelectItem>
                                    <SelectItem value="Holding">Holding</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select id="status" defaultValue={productData.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Broken">Broken</SelectItem>
                                    <SelectItem value="Dead Cell">Dead Cell</SelectItem>
                                    <SelectItem value="Worn">Worn</SelectItem>
                                    <SelectItem value="Not Holding Charge">Not Holding Charge</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="dropoff-date">Dropoff Date</Label>
                            <p id="dropoff-date" className="text-gray-500 dark:text-gray-400">
                                {new Date(productData.dropoff_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="wholesale-status">Customer Type</Label>
                            <p id="wholesale-status" className="text-gray-500 dark:text-gray-400">
                                {productData.isWholesale ? 'Wholesale' : 'Retail'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="product-details">Product Details</Label>
                            <p id="product-details" className="text-gray-500 dark:text-gray-400">
                                {productData.product}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <p id="age" className="text-gray-500 dark:text-gray-400">
                                {productData.age || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="cca">CCA</Label>
                            <p id="cca" className="text-gray-500 dark:text-gray-400">
                                {productData.cca || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="voltage">Voltage</Label>
                            <p id="voltage" className="text-gray-500 dark:text-gray-400">
                                {productData.voltage || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="has-loaner">Has Loaner</Label>
                            <Checkbox id="has-loaner" defaultChecked={productData.hasLoaner} />
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Comments</h2>
                        <div className="space-y-4">
                            {productData.comments.map(comment => (
                                <div key={comment.id} className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="font-medium">{comment.name}</div>
                                        <div className="text-gray-500 text-sm">{new Date(comment.comment_date).toLocaleDateString()}</div>
                                    </div>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Add a new comment..."
                            className="w-full"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button onClick={handleCommentSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
