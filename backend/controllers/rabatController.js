import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';

import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
/* import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js"; */
import { welcomeTemplate } from '../utils/emailTemplates.js';
import nodemailer from 'nodemailer';
import rabatModel from '../models/rabatModel.js';
import userModel from '../models/userModel.js';
import { customErrors, customInfo } from '../utils/variables.js';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	port: process.env.REACT_APP_EMAIL_PORT,
	secure: true,
	auth: {
		user: process.env.REACT_APP_EMAIL,
		pass: process.env.REACT_APP_EMAIL_PASSWORD,
	},
});

const setRabat = async (req, res, next) => {
	const { rabatValue, rabatCodeExpiresAt, emailArr } = req.body;

	try {
		//console.log(emailArr)
		if (emailArr?.length > 0) {
			let emailDosentExistArr = [];
			for (const mail of emailArr) {
				const userExists = await userModel.findOne({ email: mail })
				if (!userExists) {
					emailDosentExistArr.push(mail)
				}
			  }
			  let emailsArr = [];
			  if(emailDosentExistArr[0]=='all'){
						// jwt
		const usersArr = await userModel.find({})
	
        Object.entries(usersArr).map(([item, i]) => {
            if(!emailsArr.includes(i['email'])){
                emailsArr.push(i['email'])
            }})

			  }else if (emailDosentExistArr.length > 0) {
				return res.status(400).json({ success: false, message: customErrors.userDosentExists+': '+ emailDosentExistArr.join(', ') });
			}

		}


		if (!rabatValue) {
			throw new Error(customErrors.rabatValue);
		}

		const hours24 = 24 * 60 * 60 * 1000;
		let countRabatDays = 7 * hours24;// 7 * 24 hours;
		if(rabatCodeExpiresAt){
			countRabatDays = rabatCodeExpiresAt * hours24; // 24 hours
		}

		const rabatCode = Math.floor(100000 + Math.random() * 900000).toString();

		const rabat = new rabatModel({
			rabatCode,
			rabatValue,
			rabatCodeExpiresAt:  Date.now() + countRabatDays,
			emailArr
		});

		await rabat.save();



		let sendEmailArr = emailArr ? emailArr : usersArr;

		console.log(sendEmailArr);
		
		
		sendEmailArr.forEach((mail) => {
			var mailOptions = {
				from: process.env.EMAIL,
				to: mail,
				subject: 'kod weryfikacyjny',
				//text: ` przepisz kod we wskazanym miejscu  ${verificationToken}`
				html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rabat Code </title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">${rabatCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`,
				//html: `<h2>${verificationToken}<h/2><p>lol</p>`
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log(customInfo.emailSent + info.response);
					//return res.json({success:true,message:'shortPassMess'})
				}
			});
		});
		//await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: customInfo.rabatCreatedSuccessfully,
			rabatCode: rabatCode
			/* 		user: {
				...user._doc,
				password: undefined,
			}, */
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

const verifyRabat = async (req, res) => {
	const { rabatCode, email } = req.body;
 
	
	try {
		const rabat = await rabatModel.findOne({
			emailArr: email,
			rabatCode: rabatCode,
			rabatCodeExpiresAt: { $gt: Date.now() },
		});

		if (!rabat) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.expiriedCode });
		}
		//console.log(rabat.emailArr);

		let index = rabat.emailArr.indexOf(email); // Find the index of the item
		if (index !== -1) {
			rabat.emailArr.splice(index, 1); // Remove the item at the index
			const userRabat = await userModel.findOne({ email: email })
			if (userRabat) {
				//console.log (Object.keys(userRabat.rabat).length === 0);
				
				if(Object.keys(userRabat.rabat).length === 0){
					userRabat.rabat = {rabatCode: rabatCode, rabatValue: rabat.rabatValue};
					userRabat.save()
				}else{
					//console.log(res);
					
					return res
					.status(400)
					.json({ success: false, message: customErrors.rabatExists });
				}

			}
		}

		if(rabat.emailArr.length===0){
			await rabatModel.findByIdAndDelete(rabat._id);
            res.json({success:true,message:customInfo.rabatUsed,data:rabat.rabatValue})
		}else{
			await rabat.save();
			res.json({success:true,data:rabat.rabatValue})
		}





	} catch (error) {
		console.log(customErrors.inVeirfyEmail, error);
		res.status(500).json({ success: false, message: customErrors.serverError });
	}
};

export { setRabat, verifyRabat };
