'use server'
import { auth } from "@/services/auth";
import { updateProfileSchema } from "./schema";
import { z } from "zod";
import { prisma } from "@/services/database";

export async function updateProfile(input: z.infer<typeof updateProfileSchema>) {
    const session = await auth()

    if (!session?.user?.id) {
        return {
            error: 'Not Authorized',
            data: null,
        }
    }

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name: input.name,
        }

    })
}