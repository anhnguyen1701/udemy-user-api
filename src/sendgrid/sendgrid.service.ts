import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendgridService {
  constructor(apiKey: string, private sender: string) {
    sgMail.setApiKey(apiKey);
  }

  public async send(data: sgMail.MailDataRequired): Promise<any> {
    return sgMail.send(data);
  }

  public async sendMailSes(email: string) {
    const smtpEndpoint = 'email-smtp.us-east-2.amazonaws.com'; // servername
    const port = '587'; // smtp port
    const senderAddress = 'nguyenlamanh1701@gmail.com'; // email sender
    const toAddresses = email; // email recevie
    const smtpUsername = 'AKIAQFWP7NFWNNNGT24D'; // smtp username
    const smtpPassword = 'BPbtgTKg3C7IBMe9nvDQblmn+qzCFDK94dyQi9CB7KTg'; //smpt password

    //init a transporter to send mail
    const transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    //mail options
    const options = {
      from: senderAddress,
      to: toAddresses,
      subject: 'OTP verification',
      text: 'Your OTP code verification is ' + otpCode,
    };

    try {
      const res = await transporter.sendMail(options);
      console.log('send mail ' + res);
    } catch (error) {
      console.log(error);
    }
  }
}
