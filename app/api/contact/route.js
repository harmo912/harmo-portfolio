import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, message: 'Champs manquants.' },
      { status: 400 }
    )
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'harmohlb01@gmail.com',
      reply_to: email,
      subject: `[Portfolio Harmonic] ${subject} — de ${name}`,
      text: `
Nouveau message depuis le portfolio

Nom     : ${name}
Email   : ${email}
Sujet   : ${subject}

Message :
${message}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}