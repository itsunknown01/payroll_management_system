import { db } from "@/lib/db"

export const getPasswordTokenByToken = async (token: string) => {
  try {
    const PasswordToken = await db.passwordResetToken.findUnique({
        where: {
            token
        }
    })

    return PasswordToken
  } catch (error) {
    return null
  }
}

export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const PasswordToken = await db.passwordResetToken.findFirst({
        where: {
            email
        }
    })

    return PasswordToken
  } catch (error) {
    return null
  }
}