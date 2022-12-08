import { IMailProviders, IMessage }  from "../IMailProviders";
import nodemailer                    from "nodemailer";
import Mail                          from "nodemailer/lib/mailer";

export class MailTrapProviders implements IMailProviders {

    private trasporter: Mail
    constructor(){
        this.trasporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "22ed56c7bd6c12",
                pass: "82cc74230794c5"
            }
        })
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.trasporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}