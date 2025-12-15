'use server'
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function createLink({ title, url }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("User not authenticated");
        }

        const link = await prisma.link.create({
            data: {
                title,
                url,
                user: {
                    connect: {
                        clerkId: userId
                    }
                }
            }
        })
        return link;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create link");
    }
}

export async function getLinks() {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("User not authenticated");
        }
        const links = await prisma.link.findMany({
            include: {
                user: true
            },
            where: {
                user: {
                    clerkId: userId
                }
            }
        })
        return links;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get links");
    }
}
