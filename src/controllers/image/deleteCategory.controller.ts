import { Request, Response } from 'express'
import imageService from '../../services/image/index.services'
import { customError } from '../../helpers/error.helper'

const deleteImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    await imageService.deleteImage(Number(id))

    res.status(200).json({ message: 'Imagen eliminada con exito' })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default deleteImage
