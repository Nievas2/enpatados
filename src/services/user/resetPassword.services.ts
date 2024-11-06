import errorHelper, { customError } from "../../helpers/error.helper"
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcrypt'

dotenv.config()

const { SECRET_KEY } = process.env

if(!SECRET_KEY) {
    throw new Error('SECRET_KEY invalida')
}

const resetPassword = async (token: string, newPassword: string) => {
    try {
        if(!newPassword) {
            throw errorHelper.badRequestError('Contraseña invalida', 'BAD_REQUEST_ERROR')
        }

        const userEmail = await new Promise<string>((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return reject(errorHelper.forbiddenError('Token invalido o expirado', 'INVALID_CREDENTIALS'))
                }
                
                if(decoded && typeof decoded !== 'string' && 'email' in decoded) {
                    resolve((decoded as JwtPayload).email)
                } else {
                    reject(errorHelper.forbiddenError('Token invalido o expirado', 'FORBIDDEN_ERROR'))
                }
            })  
        })

        const user = await userModel.findOne({
            where: {
                email: userEmail
            }
        })

        if(!user) {
            throw errorHelper.notFoundError('Usuario no encontrado', 'NOT_FOUND_ERROR')
        }

        const hashedPasswd = await bcrypt.hash(newPassword, 10)

        await user.update({password: hashedPasswd})
    } catch (error) {
        if (error instanceof customError) {
            throw error
          }
      
          throw errorHelper.internalServerError(
            'Error al modificar el producto',
            'CREATE_USER_ERROR'
          )
    }
}

export default resetPassword