'use server'
import prisma from '@/lib/prisma';

function setDateToNoon(dateString) {
    const date = new Date(dateString);
    date.setUTCHours(12, 0, 0, 0);
    return date;
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
        resolveDate: resolution !== 'null' ? setDateToNoon(new Date()) : null,
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

export async function toggleLoaner(id) {
    const currentItem = await prisma.productSupportItems.findUnique({
        where: { id },
        select: { hasLoaner: true },
    });

    const newHasLoanerValue = !currentItem.hasLoaner;

    return await prisma.productSupportItems.update({
        where: { id },
        data: { hasLoaner: newHasLoanerValue },
    });
}

// delete cascade on delete
export async function deleteProductSupportTicket(id) {
    return await prisma.productSupportTicket.delete({
        where: { id },
    });
}

// Action to update product details
export async function updateProductDetails(id, updatedData) {
    return await prisma.productSupportTicket.update({
        where: { id },
        data: {
            customer_name: updatedData.customer_name,
            phone_number: updatedData.phone_number,
            isWholesale: updatedData.isWholesale,
            dropoff_date: setDateToNoon(updatedData.dropoff_date),
        },
    });
}
