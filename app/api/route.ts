import { NextResponse } from 'next/server'
import emailjs from '@emailjs/nodejs'

export async function POST(request: Request) {
  const { name, email } = await request.json();

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY!;

  emailjs.init({
    publicKey: publicKey,
    privateKey: privateKey,
  });

  try {
    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        name: name,
        email: email,
        to_email: email,
      }
    );

    console.log('Письмо отправлено:', result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('EmailJS error:', error);
    return NextResponse.json({ error: 'Ошибка отправки письма' });
  }
}