import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { templates } from 'src/templates/templates';

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
  async sendMailWithTemplate(to: string, subject: string, data: Record<string, any>) {

    const html = this.replacePlaceholders(templates.register, data);
    
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      html
    };

    try {
      await sendgrid.send(msg);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }

  // Método para reemplazar variables dinámicas
  private replacePlaceholders(template: string, data: Record<string, any>): string {
    let result = template;
    for (const key in data) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), data[key]);
    }
    return result;
  }
}
