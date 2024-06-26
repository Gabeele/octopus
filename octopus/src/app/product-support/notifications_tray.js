import React from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';

const NotificationTray = ({ notifications, dismissNotification }) => {
    return (
        <>
            <DrawerHeader>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>Check your pending notifications</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
                {notifications.length === 0 ? (
                    <div>No notifications available.</div>
                ) : (
                    notifications.map((notification) => {
                        const daysPast = Math.floor(
                            (new Date().getTime() - new Date(notification.ticket.dropoff_date).getTime()) /
                            (1000 * 60 * 60 * 24)
                        );
                        return (
                            <div key={notification.id} className="mb-4 border-b pb-2">
                                <div>
                                    <strong>{notification.ticket.customer_name}</strong> - {notification.notificationType}
                                </div>
                                <div>
                                    Drop-off Date: {format(new Date(notification.ticket.dropoff_date), 'PP')}
                                </div>
                                <div>
                                    Days Past: {daysPast} days
                                </div>
                                <Button variant="outline" onClick={() => dismissNotification(notification.id)}>
                                    Dismiss
                                </Button>
                            </div>
                        );
                    })
                )}
            </div>
            <DrawerFooter>
                <DrawerClose>
                    <Button variant="outline">Close</Button>
                </DrawerClose>
            </DrawerFooter>
        </>
    );
};

export default NotificationTray;
