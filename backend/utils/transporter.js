import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
	service: 'gmail',
    port: process.env.REACT_APP_EMAIL_PORT,
	secure: true,
	auth: {
	  user: process.env.REACT_APP_EMAIL,
	  pass: process.env.REACT_APP_EMAIL_PASSWORD
	}
  });

  export default transporter;
