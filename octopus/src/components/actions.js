import prisma from "@/lib/prisma";

const fetchUsers = async () => {
    const data = await prisma.user.findMany();
    return data;
};

const validateUser = async (id, pin) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if (user && user.pin === pin) {
        return user;
    } else {
        return false;
    }
};

export { fetchUsers, validateUser };
