import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function TicketModal() {
    return (

        <div>
            <div className="sm:max-w-[600px]">
                <div>
                    <div>Create Support Ticket</div>
                    <div>Fill out the form to create a new support ticket.</div>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="Enter your phone number" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customerType">Customer Type</Label>
                                <Select id="customerType">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select customer type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="residential">Residential</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                        <SelectItem value="industrial">Industrial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="comment">Comment</Label>
                            <Textarea id="comment" placeholder="Enter your comment" />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">Products</h3>
                            <Button size="sm">Add Product</Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Age</TableHead>
                                    <TableHead>CCA</TableHead>
                                    <TableHead>Voltage</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Input placeholder="Enter product name" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Enter age" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Enter CCA" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Enter voltage" />
                                    </TableCell>
                                    <TableCell>
                                        <Button size="icon" variant="ghost">
                                            <XIcon className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div>
                    <Button variant="outline" className="mr-auto">
                        Cancel
                    </Button>
                    <Button>Create Ticket</Button>
                </div>
            </div>
        </div>
    )
}
