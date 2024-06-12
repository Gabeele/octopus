'use client';
import { useEffect, useState, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getSupportProducts } from './action';
import SupportRecord from './support_record';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, X } from 'lucide-react';

export default function SupportTable() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTicket, setNewTicket] = useState({
        name: '',
        phoneArea: '',
        phonePrefix: '',
        phoneLine: '',
        date: '',
        customerType: '',
        comment: '',
        products: [{ product: '', supportType: '', age: '', cca: '', voltage: '' }],
    });

    const areaRef = useRef(null);
    const prefixRef = useRef(null);
    const lineRef = useRef(null);

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

    const handleAddProduct = () => {
        setNewTicket({
            ...newTicket,
            products: [...newTicket.products, { product: '', supportType: '', age: '', cca: '', voltage: '' }]
        });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = newTicket.products.filter((_, i) => i !== index);
        setNewTicket({
            ...newTicket,
            products: updatedProducts
        });
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = newTicket.products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setNewTicket({
            ...newTicket,
            products: updatedProducts
        });
    };

    const handleChange = (field, value) => {
        setNewTicket({
            ...newTicket,
            [field]: value
        });
    };

    const handlePhoneChange = (field, value, nextFieldRef) => {
        if (field === 'phoneLine' && value.length > 4) return;
        if (value.length <= 3 || (field === 'phoneLine' && value.length <= 4)) {
            setNewTicket((prevTicket) => ({
                ...prevTicket,
                [field]: value,
            }));
            if (value.length === 3 && nextFieldRef) {
                nextFieldRef.current.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const formattedPhone = `${newTicket.phoneArea}${newTicket.phonePrefix}${newTicket.phoneLine}`;
        const finalTicket = { ...newTicket, phone: formattedPhone };

        // Implement ticket creation logic here with finalTicket
        // await createTicket(finalTicket);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Support Tickets</h2>
                <Dialog>
                    <DialogTrigger>
                        <Button variant=""><PlusCircle className='h-5 w-5 mr-2' /> Add Ticket</Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-fit">
                        <DialogHeader>
                            <DialogTitle>Add Ticket</DialogTitle>
                        </DialogHeader>
                        <div className="p-3">
                            <div className="grid gap-6">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter your name"
                                                value={newTicket.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <div className="flex items-center space-x-2">
                                                <span>(</span>
                                                <Input
                                                    id="phoneArea"
                                                    className="w-16 text-center"
                                                    placeholder="Area"
                                                    value={newTicket.phoneArea}
                                                    onChange={(e) => handlePhoneChange('phoneArea', e.target.value, prefixRef)}
                                                    ref={areaRef}
                                                    maxLength={3}
                                                />
                                                <span>)</span>
                                                <Input
                                                    id="phonePrefix"
                                                    className="w-16 text-center"
                                                    placeholder="Prefix"
                                                    value={newTicket.phonePrefix}
                                                    onChange={(e) => handlePhoneChange('phonePrefix', e.target.value, lineRef)}
                                                    ref={prefixRef}
                                                    maxLength={3}
                                                />
                                                <span>-</span>
                                                <Input
                                                    id="phoneLine"
                                                    className="w-24 text-center"
                                                    placeholder="Line"
                                                    value={newTicket.phoneLine}
                                                    onChange={(e) => handlePhoneChange('phoneLine', e.target.value)}
                                                    ref={lineRef}
                                                    maxLength={4}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={newTicket.date}
                                                onChange={(e) => handleChange('date', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customerType">Customer Type</Label>
                                            <Select
                                                id="customerType"
                                                value={newTicket.customerType}
                                                onValueChange={(value) => handleChange('customerType', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select customer type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Wholesale">Wholesale</SelectItem>
                                                    <SelectItem value="Walk-in">Walk-in</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Textarea
                                            id="comment"
                                            placeholder="Enter your comment"
                                            value={newTicket.comment}
                                            onChange={(e) => handleChange('comment', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">Products</h3>
                                        <Button size="sm" onClick={handleAddProduct}>Add Product</Button>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Support Type</TableHead>
                                                <TableHead>Age</TableHead>
                                                <TableHead>CCA</TableHead>
                                                <TableHead>Voltage</TableHead>
                                                <TableHead />
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {newTicket.products.map((product, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Input
                                                            placeholder="Enter product name"
                                                            value={product.product}
                                                            onChange={(e) => handleProductChange(index, 'product', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            id={`support-type-${index}`}
                                                            value={product.supportType}
                                                            onValueChange={(value) => handleProductChange(index, 'supportType', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select support type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Warranty Check">Warranty Check</SelectItem>
                                                                <SelectItem value="Recharge Check">Recharge Check</SelectItem>
                                                                <SelectItem value="Credit New">Credit New</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            placeholder="Enter age"
                                                            value={product.age}
                                                            onChange={(e) => handleProductChange(index, 'age', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            placeholder="Enter CCA"
                                                            value={product.cca}
                                                            onChange={(e) => handleProductChange(index, 'cca', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            placeholder="Enter voltage"
                                                            value={product.voltage}
                                                            onChange={(e) => handleProductChange(index, 'voltage', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button size="icon" variant="ghost" onClick={() => handleRemoveProduct(index)}>
                                                            <X className='w-5 h-5' />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit}>Create Ticket</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

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
        </div >
    );
}
