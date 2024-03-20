import { db } from "@/lib/db";

export const getDepartmentByName = async (name: string) => {
    try {
        const department = await db.department.findFirst({
            where: {
                name
            }
        })

        return department
    } catch (error) {
        console.log("Department Function", error);
        return null
    }
}