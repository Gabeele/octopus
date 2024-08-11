// SupportActionBar.js

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import NotificationTray from './notifications_tray';

const SupportActionBar = ({
    onSearchChange,
    includeResolved,
    onIncludeResolvedChange,
    returnType,
    onReturnTypeChange,
    onAddTicket
}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold w-1/4">Support Tickets</h2>
            <div className="flex space-x-4 w-3/4">
                <div className="flex items-center space-x-1 w-1/2">
                    <Input
                        placeholder="Search phone, name, product..."
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-white"
                    />
                </div>
                <div className="flex items-center space-x-1">
                    <Switch id="includeResolved" variant="outline" onCheckedChange={onIncludeResolvedChange} checked={includeResolved} />
                    <Label htmlFor="includeResolved">Show Resolved</Label>
                </div>
                <Select
                    id="returnType"
                    value={returnType}
                    onValueChange={onReturnTypeChange}
                >
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by Return Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Warranty Check">Warranty Check</SelectItem>
                        <SelectItem value="Recharge Check">Recharge Check</SelectItem>
                        <SelectItem value="Credit New">Credit New</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative inline-block">
                    <NotificationTray />
                </div>
                <Button variant="" onClick={onAddTicket}>
                    <PlusCircle className='h-5 w-5 mr-2' /> Add Ticket
                </Button>
            </div>
        </div>
    );
};

export default SupportActionBar;
