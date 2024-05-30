/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VvP4KWxP0xH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import fetchUsers from "@/components/actions";

export default function signinModal(buttonTrigger, ...props) {

    const users = fetchUsers();

    return (
        <Dialog defaultOpen>
            <DialogTrigger asChild>
                <Button variant="outline">{buttonTrigger}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogDescription>Select your account or enter your PIN to sign in.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
                            prefetch={false}
                        >
                            <Avatar className="h-10 w-10">
                                <img src="/placeholder.svg" alt="John Doe" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">John Doe</div>
                        </Link>
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
                            prefetch={false}
                        >
                            <Avatar className="h-10 w-10">
                                <img src="/placeholder.svg" alt="Jane Smith" />
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">Jane Smith</div>
                        </Link>
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
                            prefetch={false}
                        >
                            <Avatar className="h-10 w-10">
                                <img src="/placeholder.svg" alt="Bob Johnson" />
                                <AvatarFallback>BJ</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">Bob Johnson</div>
                        </Link>
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
                            prefetch={false}
                        >
                            <Avatar className="h-10 w-10">
                                <img src="/placeholder.svg" alt="Emily Davis" />
                                <AvatarFallback>ED</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">Emily Davis</div>
                        </Link>
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
                            prefetch={false}
                        >
                            <Avatar className="h-10 w-10">
                                <img src="/placeholder.svg" alt="Michael Wilson" />
                                <AvatarFallback>MW</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">Michael Wilson</div>
                        </Link>
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
                            prefetch={false}
                        >
                            <Avatar className="h-10 w-10">
                                <img src="/placeholder.svg" alt="Sarah Lee" />
                                <AvatarFallback>SL</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">Sarah Lee</div>
                        </Link>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pin">Enter PIN</Label>
                        <Input id="pin" type="password" placeholder="Enter your PIN" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">{buttonTrigger}</Button>
                    <div>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}