'use server';
import prisma from '@/lib/prisma';

export async function getAllUsers() {
    console.log('Getting all users');
    const allUsers = await prisma.user.findMany();
    return allUsers;
}

export async function validateUserPin(userId, pin) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (user && user.pin === pin) {
        return true;
    }
    return false;
}

export async function getUser(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { timeCards: true },
    });
    const isPunchedIn = user.timeCards.some(card => card.clockOut === null);
    return { ...user, isPunchedIn };
}

export async function getTime(userId) {
    const timeCards = await prisma.timeCard.findMany({
        where: { userId: userId },
        orderBy: { clockIn: 'desc' }
    });
    return timeCards.map(card => ({
        date: card.clockIn.toDateString(),
        clockIn: card.clockIn,
        clockOut: card.clockOut,
    }));
}

export async function punchIn(userId) {
    const newTimeCard = await prisma.timeCard.create({
        data: {
            clockIn: new Date(),
            userId: userId,
        },
    });
    return newTimeCard;
}

export async function punchOut(userId) {
    const latestTimeCard = await prisma.timeCard.findFirst({
        where: {
            userId: userId,
            clockOut: null,
        },
        orderBy: { clockIn: 'desc' },
    });

    if (latestTimeCard) {
        const updatedTimeCard = await prisma.timeCard.update({
            where: { id: latestTimeCard.id },
            data: { clockOut: new Date() },
        });
        return updatedTimeCard;
    } else {
        throw new Error('No active time card found for the user');
    }
}


export async function markAsPaid(timeCardIds) {
    const updatedTimeCards = await prisma.timeCard.updateMany({
        where: {
            id: { in: timeCardIds },
        },
        data: {
            isPaid: true,
        },
    });
    return updatedTimeCards;
}

export async function updateTimeCard(timeCardId, clockIn, clockOut) {
    const updatedTimeCard = await prisma.timeCard.update({
        where: { id: timeCardId },
        data: {
            clockIn,
            clockOut,
        },
    });
    return updatedTimeCard;
}