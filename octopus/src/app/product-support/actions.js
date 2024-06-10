
'use server'
import prisma from '@/lib/prisma';

export default async function getSupportProducts() {
    const products = await prisma.ProductSupport.findMany();
    return products;
}

export async function updateProductStatus(id, status) {
    const product = await prisma.ProductSupport.update({
        where: { id },
        data: { status },
    });

    console.log('Product status updated:', product)

    return product;
}