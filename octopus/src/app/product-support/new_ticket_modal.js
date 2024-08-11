// NewTicketDialog.js
'use client'
import React, { useState, useRef, useEffect } from 'react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const NewTicketDialog = ({ isOpen, onClose, onSubmit }) => {
    const [newTicket, setNewTicket] = useState({
        name: '',
        phoneArea: '',
        phonePrefix: '',
        phoneLine: '',
        date: new Date().toISOString().split('T')[0],
        customerType: '',
        comment: '',
        products: [{ product: '', supportType: '', age: '', cca: '', voltage: '' }],
    });

    const areaRef = useRef(null);
    const prefixRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setNewTicket({
                name: '',
                phoneArea: '',
                phonePrefix: '',
                phoneLine: '',
                date: new Date().toISOString().split('T')[0],
                customerType: '',
                comment: '',
                products: [{ product: '', supportType: '', age: '', cca: '', voltage: '' }],
            });
        }
    }, [isOpen]);

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
        if (!/^\d*$/.test(value)) return;
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

    const isFormValid = () => {
        return (
            newTicket.name &&
            newTicket.date &&
            newTicket.customerType &&
            newTicket.products.every(product => product.product && product.supportType)
        );
    };

    const handleSubmit = () => {
        const phoneArea = newTicket.phoneArea ? newTicket.phoneArea : '';
        const phonePrefix = newTicket.phonePrefix ? newTicket.phonePrefix : '';
        const phoneLine = newTicket.phoneLine ? newTicket.phoneLine : '';

        const formattedPhone = phoneArea && phonePrefix && phoneLine
            ? `(${phoneArea}) ${phonePrefix}-${phoneLine}`
            : '';

        const finalTicket = {
            customer_name: newTicket.name,
            dropoff_date: newTicket.date,
            isWholesale: newTicket.customerType === 'Wholesale',
            phone_number: formattedPhone,
            products: newTicket.products.map(product => ({
                product: product.product,
                supportType: product.supportType,
                age: product.age,
                cca: parseInt(product.cca, 10),
                voltage: parseFloat(product.voltage)
            })),
            ...(newTicket.comment && { comment: newTicket.comment })
        };

        onSubmit(finalTicket);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="min-w-fit">
                <DialogHeader>
                    <DialogTitle>Add Ticket</DialogTitle>
                </DialogHeader>
                <div className="p-3">
                    <div className="grid gap-6">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name*</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter customer name"
                                        value={newTicket.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        required
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
                                            className="w-20 text-center"
                                            placeholder="Prefix"
                                            value={newTicket.phonePrefix}
                                            onChange={(e) => handlePhoneChange('phonePrefix', e.target.value, lineRef)}
                                            ref={prefixRef}
                                            maxLength={3}
                                        />
                                        <span>-</span>
                                        <Input
                                            id="phoneLine"
                                            className="w-16 text-center"
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
                                    <Label htmlFor="date">Date*</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={newTicket.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customerType">Customer Type*</Label>
                                    <Select
                                        id="customerType"
                                        value={newTicket.customerType}
                                        onValueChange={(value) => handleChange('customerType', value)}
                                        required
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
                                <h3 className="font-medium">Products*</h3>
                                <Button size="sm" onClick={handleAddProduct}>Add Product</Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Support Type</TableHead>
                                        <TableHead>Age</TableHead>
                                        <TableHead>Voltage</TableHead>
                                        <TableHead>CCA</TableHead>
                                        <TableHead />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {newTicket.products.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    placeholder="Enter product name*"
                                                    value={product.product}
                                                    onChange={(e) => handleProductChange(index, 'product', e.target.value)}
                                                    required
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
                                                    placeholder="Enter age (F11)"
                                                    value={product.age}
                                                    onChange={(e) => handleProductChange(index, 'age', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder="Enter voltage"
                                                    value={product.voltage}
                                                    onChange={(e) => handleProductChange(index, 'voltage', parseFloat(e.target.value, 10))}
                                                    type="number"
                                                    required
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder="Enter CCA"
                                                    value={product.cca}
                                                    onChange={(e) => handleProductChange(index, 'cca', parseInt(e.target.value, 10))}
                                                    type="number"
                                                    required
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
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={!isFormValid()}>Create Ticket</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NewTicketDialog;
