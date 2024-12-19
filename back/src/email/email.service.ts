import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  constructor() {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendMail(to: string, subject: string, text: string) {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      text,
    };

    try {
      await sendgrid.send(msg);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
}
