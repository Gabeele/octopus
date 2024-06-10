
'use server'
import prisma from '@/lib/prisma';

export async function getSupportProducts() {
    const products = await prisma.productSupport.findMany({
        include: {
            comments: true
        }
    });

    return products.map(product => ({
        ...product,
        commentsCount: product.comments.length,
        comments: product.comments
    }));
}



export async function updateProductStatus(id, status) {
    const product = await prisma.ProductSupport.update({
        where: { id },
        data: { status },
    });
    return product;
}


export async function addComment(productSupportId, comment) {
    return await prisma.supportComments.create({
        data: {
            comment,
            comment_date: new Date(),
            productSupportId
        }
    });
}