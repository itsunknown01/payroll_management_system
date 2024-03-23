import { db } from "@/lib/db";

export const getPositionByName = async (name: string) => {
    try {
        const position = await db.position.findFirst({
            where: {
                name
            }
        })

        return position
    } catch (error) {
        console.log("Position Function", error);
        return null
    }
}

export const getPositionById = async (id: number | undefined) => {
    try {
        const position = await db.position.findFirst({
            where: {
                id
            }
        })

        return position
    } catch (error) {
        console.log("Position Function", error);
        return null
    }
}