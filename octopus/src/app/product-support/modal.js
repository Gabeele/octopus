'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import {
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { newReturn } from "./actions";

const AddReturnModal = () => {
    const [battery, setBattery] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [voltage, setVoltage] = useState("");
    const [cca, setCca] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [open, setOpen] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            name,
            phone,
            battery,
            voltage: parseFloat(voltage),
            cca: parseInt(cca, 10),
            type,
            date: date ? new Date(date) : null,
            status,
            notes,
        };
        newReturn(data);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Return
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Return</DialogTitle>
                    <DialogDescription>
                        Fill out the details to add a new battery return.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="battery">Battery</Label>
                            <Input
                                id="battery"
                                value={battery}
                                onChange={(e) => setBattery(e.target.value)}
                                placeholder="Enter battery details"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter customer name"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="voltage">Voltage</Label>
                            <Input
                                id="voltage"
                                value={voltage}
                                onChange={(e) => setVoltage(e.target.value)}
                                placeholder="Enter voltage"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="cca">CCA</Label>
                            <Input
                                id="cca"
                                value={cca}
                                onChange={(e) => setCca(e.target.value)}
                                placeholder="Enter CCA"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                id="type"
                                value={type}
                                onValueChange={(value) => setType(value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select customer type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="walk-in">Walk-in</SelectItem>
                                    <SelectItem value="wholesale">Wholesale</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                id="status"
                                value={status}
                                onValueChange={(value) => setStatus(value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter any notes"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Return</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const PlusIcon = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
};

export default AddReturnModal;
