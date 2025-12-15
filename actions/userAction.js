'use server'
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

export async function deleteLink(formData) {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("User not authenticated");
        }

        const id = parseInt(formData.get('id'));

        // First verify the link belongs to this user
        const link = await prisma.link.findFirst({
            where: {
                id,
                user: {
                    clerkId: userId
                }
            }
        });

        if (!link) {
            throw new Error("Link not found or unauthorized");
        }

        // Then delete it
        await prisma.link.delete({
            where: {
                id
            }
        });

        revalidatePath('/CreateForm');
        return { success: true };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete link");
    }
}