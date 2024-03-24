import { authOption } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

export async function getSession() {
    return await getServerSession(authOption);
}
const prisma = new PrismaClient();
export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.username) {
            return null;
        }

        const currentUser = await prisma.aks_pemakai.findUnique({
            where: {
                username: session.user.username,
            },
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.created_at.toISOString(),
            updatedAt: currentUser.updated_at.toISOString(),
        };
    } catch (error: any) {
        return null;
    }
}
