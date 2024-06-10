
'use server'
import prisma from '@/lib/prisma';

export async function getProductSupportItem(slug) {
    const product = await prisma.productSupport.findUnique({
        where: { id: parseInt(slug) },
        include: { comments: true },
    });
    return product;
}