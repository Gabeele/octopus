'use server';
import prisma from '@/lib/prisma';

function setDateToNoon(dateString) {
    const date = new Date(dateString);
    date.setUTCHours(12, 0, 0, 0);
    return date;
}

export async function getSupportProducts(includeResolved = false, searchQuery = '', page = 1, limit = 25, returnType = 'All') {
    const whereClause = {
        OR: [
            { customer_name: { contains: searchQuery, mode: 'insensitive' } },
            { phone_number: { contains: searchQuery, mode: 'insensitive' } },
            { items: { some: { product: { contains: searchQuery, mode: 'insensitive' } } } },
            { comments: { some: { comment: { contains: searchQuery, mode: 'insensitive' } } } }
        ]
    };

    if (returnType && returnType !== 'All') {
        whereClause.items = {
            some: { supportType: returnType }
        };
        if (!includeResolved) {
            whereClause.items.some.isResolved = false;
        }
    } else if (!includeResolved) {
        whereClause.items = {
            some: { isResolved: false }
        };
    }

    const [tickets, total] = await Promise.all([
        prisma.productSupportTicket.findMany({
            where: whereClause,
            include: {
                items: true,
                comments: true
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        prisma.productSupportTicket.count({ where: whereClause })
    ]);

    return { tickets, total };
}

export async function getProductSupportTicket(id) {
    const ticket = await prisma.productSupportTicket.findUnique({
        where: { id },
        include: {
            comments: true,
            items: {
                orderBy: {
                    product: 'asc'
                }
            }
        },
    });

    return ticket;
}

export async function updateProductStatus(id, status) {
    const product = await prisma.productSupportItems.update({
        where: { id },
        data: { status },
    });
    return product;
}

export async function updateProductProcess(id, process) {
    const product = await prisma.productSupportItems.update({
        where: { id },
        data: { process },
    });
    return product;
}

export async function updateProductResolution(id, resolution) {
    const data = {
        resolution: resolution === 'null' ? null : resolution,
        isResolved: resolution !== 'null',
        resolveDate: resolution !== 'null' ? new Date() : null,
        process: resolution !== 'null' ? 'Resolved' : undefined,
    };

    if (resolution === 'null') {
        data.resolution = null;
        data.process = 'inspecting';
    }

    const product = await prisma.productSupportItems.update({
        where: { id },
        data,
    });

    // Check if all items in the ticket are resolved
    const ticketItems = await prisma.productSupportItems.findMany({
        where: { ticketId: product.ticketId },
    });

    const allResolved = ticketItems.every(item => item.isResolved);

    if (allResolved) {
        // Delete associated notifications when all items in the ticket are resolved
        await prisma.supportProductNotifications.deleteMany({
            where: {
                ticketId: product.ticketId
            }
        });
    } else {
        // If not all items are resolved, delete only the specific notifications for this item
        await prisma.supportProductNotifications.deleteMany({
            where: {
                ticketId: product.ticketId,
                notificationType: {
                    in: ['14-day', '30-day']
                }
            }
        });
    }

    return product;
}

export async function addComment(ticketId, comment) {
    return await prisma.supportComments.create({
        data: {
            comment,
            comment_date: setDateToNoon(new Date()),
            ticketId
        }
    });
}

export async function addSupportTicket(ticketDetails) {
    const { customer_name, dropoff_date, isWholesale, phone_number, products, comment } = ticketDetails;

    const createdTicket = await prisma.productSupportTicket.create({
        data: {
            customer_name,
            dropoff_date: setDateToNoon(dropoff_date),
            isWholesale: isWholesale || false,
            phone_number,
            items: {
                create: products.map(product => ({
                    product: product.product,
                    supportType: product.supportType,
                    process: 'Inspecting', // default value
                    status: product.status || null,
                    age: product.age || null,
                    cca: product.cca || null,
                    voltage: product.voltage || null,
                    hasLoaner: product.hasLoaner || false,
                    isResolved: false // default value
                }))
            },
            ...(comment && {
                comments: {
                    create: {
                        comment,
                        comment_date: new Date().setHours(12, 0, 0, 0)
                    }
                }
            })
        },
        include: {
            items: true,
            comments: true
        }
    });

    return createdTicket;
}

export async function getNotifications() {
    await generateNotifications();

    const notifications = await prisma.supportProductNotifications.findMany({
        where: {
            isDismissed: false,
        },
        include: {
            ticket: {
                include: {
                    items: true,
                },
            },
        },
    });

    return notifications;
}

async function generateNotifications() {
    const unresolvedTickets = await prisma.productSupportTicket.findMany({
        where: {
            items: {
                some: {
                    isResolved: false,
                },
            },
        },
        include: {
            items: true,
            comments: true,
            notifications: true,
        },
    });

    const currentDate = new Date();
    currentDate.setHours(12, 0, 0, 0);

    const notificationsToCreate = [];

    unresolvedTickets.forEach(ticket => {
        const daysSinceDropoff = Math.floor(
            (currentDate.getTime() - new Date(ticket.dropoff_date).getTime()) / (1000 * 60 * 60 * 24)
        );

        const existing14DayNotification = ticket.notifications.find(
            n => n.notificationType === '14-day'
        );
        const existing30DayNotification = ticket.notifications.find(
            n => n.notificationType === '30-day'
        );

        if (daysSinceDropoff >= 14 && daysSinceDropoff < 30) {
            if (!existing14DayNotification) {
                notificationsToCreate.push({
                    notificationType: '14-day',
                    generatedDate: currentDate,
                    isDismissed: false,
                    ticketId: ticket.id,
                });
            }
        }

        if (daysSinceDropoff >= 30) {
            if (!existing30DayNotification || (existing30DayNotification && existing30DayNotification.isDismissed)) {
                notificationsToCreate.push({
                    notificationType: '30-day',
                    generatedDate: currentDate,
                    isDismissed: false,
                    ticketId: ticket.id,
                });
            }
        }
    });

    if (notificationsToCreate.length > 0) {
        await prisma.supportProductNotifications.createMany({
            data: notificationsToCreate,
            skipDuplicates: true,
        });
    }
}

export async function dismissNotification(notificationId) {
    await prisma.supportProductNotifications.update({
        where: { id: notificationId },
        data: {
            isDismissed: true,
            dismissedDate: new Date(),
        },
    });
}
