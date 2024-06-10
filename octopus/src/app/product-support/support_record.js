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
import updateProductStatus from './actions';

export default function SupportRecord(product) {

    const handleStatusChange = async (newStatus, productId) => {

        await updateProductStatus(productId, newStatus);
        console.log('Status changed to:', newStatus, 'for product:', productId)
    };

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
                </Select></TableCell>
            <TableCell>{new Date(product.dropoff_date).toLocaleDateString()}</TableCell>
            <TableCell>{product.isWholesale ? 'Wholesale' : 'Walk-in'}</TableCell>
            <TableCell>{product.phone_number || 'N/A'}</TableCell>
            <TableCell>Most recent </TableCell>
            <TableCell><Button>Resolve</Button></TableCell>
        </TableRow>
    );
}