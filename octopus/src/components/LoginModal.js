'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function LoginModal({ getUsers, validateUser, onLoginSuccess }) {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [pin, setPin] = useState('');
    const [isInvalidPin, setIsInvalidPin] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [users, setUsers] = useState(null);

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (selectedUserId && pin) {
            const isValid = await validateUser(selectedUserId, pin);
            if (isValid) {
                onLoginSuccess(selectedUserId);
                setIsDialogOpen(false);
            } else {
                setIsInvalidPin(true);
            }
        } else {
            setIsInvalidPin(true);
        }
    };

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users);
        });
    }, [getUsers]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSignIn}>
                    <div className="grid gap-4 py-4">
                        <RadioGroup value={selectedUserId} onValueChange={setSelectedUserId}>
                            {users == null ? (
                                <p>Looks like there is no one here</p>
                            ) : (
                                users.map((user) => (
                                    <div className="flex items-center space-x-2" key={user.id}>
                                        <RadioGroupItem value={user.id} id={`user-${user.id}`} />
                                        <Label htmlFor={`user-${user.id}`}>{user.firstName} {user.lastName}</Label>
                                    </div>
                                ))
                            )}
                        </RadioGroup>

                        <div className="space-y-2">
                            <Label htmlFor="pin">Enter your PIN</Label>
                            <Input
                                id="pin"
                                type="password"
                                maxLength={8}
                                value={pin}
                                onChange={(e) => {
                                    setPin(e.target.value);
                                    setIsInvalidPin(false);
                                }}
                                className={isInvalidPin ? 'border-red-500' : ''}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Sign In</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default LoginModal;
