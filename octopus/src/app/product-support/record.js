'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import isArchive from './actions';

function Record({ battery, name, phone, voltage, cca, type, status, date, notes, id, refresh }) {
    const [isArchiving, setIsArchiving] = useState(false);

    function handleArchive(id) {
        isArchive(id);
    };

    return (
        <TableRow key={id}>
            <TableCell>{battery}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{voltage}</TableCell>
            <TableCell>{cca}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>
                <Select defaultValue={status}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Holding">Holding</SelectItem>
                        <SelectItem value="CCG">CCG</SelectItem>
                        <SelectItem value="NG">NG</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
            <TableCell>{notes}</TableCell>
            <TableCell className="text-right">
                <Button size="icon" variant="outline" onclick={handleArchive(id)}>
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                </Button>

            </TableCell>
        </TableRow>
    );
}

function PencilIcon(props) {
    return (
        <svg
            {...props}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            width="24px"
            height="24px"
        >
            <path
                fill="#000000"
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8"
            />
        </svg>
    );
}

export default Record;
