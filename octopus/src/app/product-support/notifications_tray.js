'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { getNotifications, dismissNotification } from './action';
import Link from 'next/link';
import { ScrollArea } from "@/components/ui/scroll-area"


const NotificationTray = () => {
    const [notifications, setNotifications] = React.useState([]);
    const [notificationCount, setNotificationCount] = React.useState(0);

    const fetchNotifications = async () => {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
        setNotificationCount(fetchedNotifications.length);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleDismissNotification = async (notificationId) => {
        await dismissNotification(notificationId);
        fetchNotifications();
    };

    return (
        <Drawer >
            <DrawerTrigger asChild>
                <Button variant="outline">
                    Notifications
                    {notificationCount > 0 && (
                        <Badge className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-600">
                            {notificationCount}
                        </Badge>
                    )}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="w-1/2 m-auto h-1/2">
                <DrawerHeader>
                    <DrawerTitle>Notifications</DrawerTitle>
                    <DrawerDescription>Check your pending notifications</DrawerDescription>
                </DrawerHeader>
                <ScrollArea className=" rounded-md border p-4">
                    <div className="space-y-4">
                        {notifications.length === 0 ? (
                            <div>No notifications available.</div>
                        ) : (
                            notifications.map((notification) => {
                                const daysPast = Math.floor(
                                    (new Date().getTime() - new Date(notification.ticket.dropoff_date).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                );
                                return (
                                    <div key={notification.id} className="p-4 border rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex-grow">
                                            <div className="font-bold text-lg">{notification.ticket.customer_name}</div>
                                            <div className="text-sm text-gray-500">{notification.notificationType}</div>
                                            <div className="mt-2">
                                                <div><strong>Product:</strong> {notification.ticket.items.map(item => `${item.product} ${item.status}`).join(', ')}</div>
                                                <div><strong>Phone:</strong> {notification.ticket.phone_number}</div>
                                                <div><strong>Drop-off Date:</strong> {format(new Date(notification.ticket.dropoff_date), 'PP')}</div>
                                                <div><strong>Days Past:</strong> {daysPast} days</div>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
                                            <Link href={`/product-support/${notification.ticket.id}`} passHref>
                                                <Button as="a" variant="outline">
                                                    View Ticket
                                                </Button>
                                            </Link>
                                            <Button variant="outline" onClick={() => handleDismissNotification(notification.id)}>
                                                Dismiss
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </ScrollArea>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    );
};

export default NotificationTray;
