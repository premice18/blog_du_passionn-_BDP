import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'

export default class MessagesController {
  public async index({ view }: HttpContext) {
    return view.render('pages/contact')
  }

  public async store({ request, response, session }: HttpContext) {
    const data = request.only(['full_name', 'email', 'subject', 'message'])

    await Message.create({
      fullName: data.full_name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })

    session.flash('notification', {
      type: 'success',
      message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dès que possible.',
    })

    return response.redirect().back()
  }

  // Admin and public methods
  public async adminIndex({ view }: HttpContext) {
    const messages = await Message.query().orderBy('created_at', 'desc')
    return view.render('pages/admin/messages', { messages })
  }

  public async delete({ params, response, session }: HttpContext) {
    const message = await Message.findOrFail(params.id)
    await message.delete()

    session.flash('notification', {
      type: 'success',
      message: 'Message supprimé.',
    })

    return response.redirect().back()
  }
}
