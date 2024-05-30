'use server';
import prisma from "@/lib/prisma";

export async function isArchive(id) {
    try {
        const updatedReturn = await prisma.return.update({
            where: { id: id },
            data: { isArchived: true },
        });
        return updatedReturn;
    } catch (error) {
        throw new Error(`Failed to archive return with id ${id}: ${error.message}`);
    }
}

export async function newReturn(data) {
    try {
        const createdReturn = await prisma.return.create({
            data: {
                name: data.name,
                phone: data.phone,
                battery: data.battery,
                voltage: data.voltage,
                cca: data.cca,
                type: data.type,
                date: data.date,
                status: data.status,
                notes: data.notes,
                isArchived: data.isArchived ?? false,
                archivedDate: data.archivedDate,
            },
        });
        return createdReturn;
    } catch (error) {
        throw new Error(`Failed to create return: ${error.message}`);
    }
}

export default async function fetchReturns() {
    const data = await prisma.return.findMany({
        where: {
            isArchived: false,
        },
        orderBy: {
            date: "desc",
        },
    });
    return data;
};
