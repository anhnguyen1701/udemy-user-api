import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor(apiKey: string, private sender: string) {
    sgMail.setApiKey(apiKey);
  }

  public async send(data: sgMail.MailDataRequired): Promise<any> {
    return sgMail.send(data);
  }
}
