
'use server'
import prisma from '@/lib/prisma';

export async function getProductSupportItem(slug) {
    return await prisma.productSupport.findUnique({
        where: { id: parseInt(slug) },
        include: { comments: true },
    });
}