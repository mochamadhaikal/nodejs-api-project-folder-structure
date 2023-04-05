const path = require('path');
const NodeMailer = require('nodemailer');
const log = require('./logger');
const EnvConfig = require('../configs/EnvConfig');

// create reusable transporter object using the default SMTP transport
let transporter = NodeMailer.createTransport({
    host: EnvConfig.email.host,
    port: EnvConfig.email.port,
    secure: EnvConfig.email.security, // true for 465, false for other ports
    auth: {
        user: EnvConfig.email.username, // generated ethereal user
        pass: EnvConfig.email.password, // generated ethereal password
    },
});

class Mailer {
    constructor() {
        this.from = `KaLe Enterprise <${EnvConfig.email.username}>`;
        this.to = null;
        this.subject = null;
        this.html = null;
        this.text = null;
    }

    async send() {
        let mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text || null,
            html: this.html || null,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname.concat('/../assets/img/logo.png')),
                    cid: 'logo',
                },
                {
                    filename: 'pw-policy.png',
                    path: path.join(__dirname.concat('/../assets/img/pw-policy.png')),
                    cid: 'pw-policy',
                },
                {
                    filename: 'wa.png',
                    path: path.join(__dirname.concat('/../assets/icons/wa.png')),
                    cid: 'wa',
                },
                {
                    filename: 'fb.png',
                    path: path.join(__dirname.concat('/../assets/icons/fb.png')),
                    cid: 'fb',
                },
                {
                    filename: 'tw.png',
                    path: path.join(__dirname.concat('/../assets/icons/tw.png')),
                    cid: 'tw',
                },
                {
                    filename: 'yt.png',
                    path: path.join(__dirname.concat('/../assets/icons/yt.png')),
                    cid: 'yt',
                },
                {
                    filename: 'ig.png',
                    path: path.join(__dirname.concat('/../assets/icons/ig.png')),
                    cid: 'ig',
                },
            ],
        };

        log.info(`Sending email: ${this.to}`);

        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    log.error(`Send Email Failed: ${error}`);
                } else {
                    log.info(`Send Email Success: ${info.response}`);
                }
            });
            return true;
        } catch (err) {
            log.error(`Send Email Failed: ${err}`);

            return false;
        }
    }
}

module.exports = new Mailer();
