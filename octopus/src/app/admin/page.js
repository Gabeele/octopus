"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getAllUsers } from "./action";

export default function Component() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        pin: "",
        status: "Active",
    });
    const [editingUser, setEditingUser] = useState(null);
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        async function fetchUsers() {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        }
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setNewUser({
            firstName: "",
            lastName: "",
            pin: "",
            status: "Active",
        });
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleSaveUser = () => {
        if (editingUser) {
            setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...newUser } : user)));
        } else {
            setUsers([...users, { id: users.length + 1, ...newUser }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <Button onClick={handleAddUser}>Add User</Button>
            </div>

            <div className="flex space-x-4 mb-6">
                <Button variant={activeTab === "users" ? "default" : "outline"} onClick={() => setActiveTab("users")}>
                    Users
                </Button>
                <Button variant={activeTab === "settings" ? "default" : "outline"} onClick={() => setActiveTab("settings")}>
                    Settings
                </Button>
            </div>

            {activeTab === "users" && (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Pin</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.pin}</TableCell>
                                    <TableCell>
                                        <Badge className={`${user.status === "Active" ? "bg-green-500 text-green-50" : "bg-red-500 text-red-50"}`}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setNewUser(user);
                                                    setEditingUser(user);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                <FilePenIcon className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.id)}>
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {activeTab === "settings" && (
                <div>
                    <h2 className="text-xl font-bold">Settings</h2>
                    {/* Add your settings components here */}
                </div>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="firstName" className="text-right">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={newUser.firstName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        firstName: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="lastName" className="text-right">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={newUser.lastName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        lastName: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="pin" className="text-right">
                                Pin
                            </Label>
                            <Input
                                id="pin"
                                value={newUser.pin}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        pin: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                id="status"
                                value={newUser.status}
                                className="col-span-3"
                                onValueChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        status: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveUser}>{editingUser ? "Save" : "Add User"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function FilePenIcon(props) {
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
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    );
}

function TrashIcon(props) {
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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}
