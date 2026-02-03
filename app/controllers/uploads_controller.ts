import Media from '#models/media'
import type { HttpContext } from '@adonisjs/core/http'

export default class UploadsController {
  public async show({ params, response }: HttpContext) {
    const fileName = params.fileName

    if (typeof fileName !== 'string' || fileName.includes('/') || fileName.includes('\\')) {
      return response.notFound()
    }

    const media = await Media.query().where('fileName', fileName).first()

    if (!media || !media.fileBlob) {
      return response.notFound()
    }

    response.header('Cache-Control', 'public, max-age=31536000, immutable')

    if (media.mimeType) {
      response.type(media.mimeType)
    }

    if (typeof media.fileSize === 'number') {
      response.header('Content-Length', String(media.fileSize))
    }

    return response.send(media.fileBlob)
  }
}
