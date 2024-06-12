'use server';
import prisma from '@/lib/prisma';

export async function getSupportProducts() {
    const tickets = await prisma.productSupportTicket.findMany({
        include: {
            comments: true,
            items: {
                orderBy: {
                    product: 'asc'
                }
            }
        },
        orderBy: {
            dropoff_date: 'desc'
        }
    });

    return tickets.map(ticket => ({
        ...ticket,
        commentsCount: ticket.comments.length,
        items: ticket.items.map(item => ({
            ...item,
        })),
        comments: ticket.comments.map(comment => ({
            ...comment,
        }))
    }));
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
    const product = await prisma.productSupportItems.update({
        where: { id },
        data: {
            resolution,
            isResolved: true,
            resolveDate: new Date(),
            process: 'Resolved',
        },
    });
    return product;
}

export async function addComment(ticketId, comment) {
    return await prisma.supportComments.create({
        data: {
            comment,
            comment_date: new Date(),
            ticketId
        }
    });
}
