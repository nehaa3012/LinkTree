"use server";
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
            clerkId: userId,
          },
        },
      },
    });
    revalidatePath("/CreateForm");
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
        user: true,
      },
      where: {
        user: {
          clerkId: userId,
        },
      },
    });
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

    const id = parseInt(formData.get("id"));

    // First verify the link belongs to this user
    const link = await prisma.link.findFirst({
      where: {
        id,
        user: {
          clerkId: userId,
        },
      },
    });

    if (!link) {
      throw new Error("Link not found or unauthorized");
    }

    // Then delete it
    await prisma.link.delete({
      where: {
        id,
      },
    });

    revalidatePath("/CreateForm");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete link");
  }
}

export async function updateLink(formData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const id = parseInt(formData.get("id"));

    // First verify the link belongs to this user
    const link = await prisma.link.findFirst({
      where: {
        id,
        user: {
          clerkId: userId,
        },
      },
    });

    if (!link) {
      throw new Error("Link not found or unauthorized");
    }

    // Then update it
    const updatedLink = await prisma.link.update({
      where: {
        id,
      },
      data: {
        title: formData.get("title"),
        url: formData.get("url"),
      },
    });

    revalidatePath("/CreateForm");
    return updatedLink;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update link");
  }
}

export async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        links: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user");
  }
}

export async function getUserById(id) {
  try {
    if (!id) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        links: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user");
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        links: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current user");
  }
}
