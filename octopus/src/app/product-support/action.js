'use server';
import prisma from '@/lib/prisma';

export async function getSupportProducts(includeResolved = false, searchQuery = '', page = 1, limit = 25) {
    const whereClause = {
        OR: [
            { customer_name: { contains: searchQuery, mode: 'insensitive' } },
            { phone_number: { contains: searchQuery, mode: 'insensitive' } },
            { items: { some: { product: { contains: searchQuery, mode: 'insensitive' } } } },
            { comments: { some: { comment: { contains: searchQuery, mode: 'insensitive' } } } }
        ]
    };

    if (!includeResolved) {
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


export async function addSupportTicket(ticketDetails) {
    const { customer_name, dropoff_date, isWholesale, phone_number, products, comment } = ticketDetails;

    const createdTicket = await prisma.productSupportTicket.create({
        data: {
            customer_name,
            dropoff_date: new Date(dropoff_date),
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
                        comment_date: new Date()
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
