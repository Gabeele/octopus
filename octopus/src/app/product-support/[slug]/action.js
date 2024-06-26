'use server'
import prisma from '@/lib/prisma';

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
            dropoff_date: new Date(updatedData.dropoff_date),
        },
    });
}
