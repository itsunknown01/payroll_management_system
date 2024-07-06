import {v4 as uuidv4} from "uuid"
import { getPasswordTokenByEmail } from "./password-token";
import { db } from "@/lib/db";

export const generatePasswordToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordTokenByEmail(email)

    if(existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const passwordToken = await db.passwordResetToken.create({
        data: {
            token,
            email,
            expires
        }
    })

    return passwordToken
}