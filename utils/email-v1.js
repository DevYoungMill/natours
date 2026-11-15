const nodemailer = require('nodemailer');

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `DevYoungMill <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
};

const sendEmail = async (options) => {
  // 1) Create a TRANSPORTER
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });

  // 2) Define the Email options
  const mailOptions = {
    from: 'DevYoungMill <hello@youngmill.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send the Email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
