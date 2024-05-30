'use server';
import prisma from "@/lib/prisma";

export const archiveReturn = async (id) => {
    try {
        const updatedReturn = await prisma.return.update({
            where: { id: id },
            data: { isArchived: true },
        });
        return updatedReturn;
    } catch (error) {
        throw new Error(`Failed to archive return with id ${id}: ${error.message}`);
    }
};

export const newReturn = async (data) => {
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
};

export const fetchReturns = async (archivedVisible = false) => {
    console.log(archivedVisible);

    const data = await prisma.return.findMany({
        where: {
            isArchived: archivedVisible,
        },
        orderBy: {
            date: "desc",
        },
    });
    return data;
};

export default fetchReturns;
