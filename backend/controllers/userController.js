import bcryptjs from "bcryptjs";
import crypto from "crypto";
import dotenv from 'dotenv';

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
/* import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js"; */
import {
	VERIFICATION_EMAIL_TEMPLATE,
	welcomeTemplate,
} from '../utils/emailTemplates.js'
import nodemailer from 'nodemailer'
import userModel from "../models/userModel.js";
import { customErrors, customInfo } from "../utils/variables.js";

var transporter = nodemailer.createTransport({
	service: 'gmail',
    port: process.env.REACT_APP_EMAIL_PORT,
	secure: true,
	auth: {
	  user: process.env.REACT_APP_EMAIL,
	  pass: process.env.REACT_APP_EMAIL_PASSWORD
	}
  });


 const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error('uzupełnij wszystkie pola');
		}

		const userAlreadyExists = await userModel.findOne({ email });

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: customErrors.userAlreadyExists });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();



		

		const user = new userModel({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
			address: {},
			cartData: {},
		});



		await user.save();
	generateTokenAndSetCookie(res, user._id);

		// jwt
		

 
          var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'kod weryfikacyjny',
            //text: ` przepisz kod we wskazanym miejscu  ${verificationToken}`
			html: VERIFICATION_EMAIL_TEMPLATE.replace(verificationToken),
			//html: `<h2>${verificationToken}<h/2><p>lol</p>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
              //return res.json({success:true,message:'shortPassMess'}) 
            }
          });

		//await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: customErrors.userCreatedSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

 const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await userModel.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: customErrors.expiriedCode});
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		//await sendWelcomeEmail(user.email, user.name);

		/** mail */
		var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'mail powitalny',
			//html: welcomeTemplate
    		text: `WITAMY  ${user.name}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
              //return res.json({success:true,message:'shortPassMess'}) 
            }
          });

		res.status(200).json({
			success: true,
			message: customInfo.emailSentSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log(customErrors.inVeirfyEmail, error);
		res.status(500).json({ success: false, message: customErrors.serverError });
	}
};

 const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: customErrors.invalidCredentials });
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: customErrors.invalidCredentials });
		}

		if(!user.isVerified){
			return res.status(400).json({ success: false, message: customErrors.usernNotVerified });
		}
		
/* 		if(checkAdmin){
			if(!user.isAdmin){
				console.log(customErrors.userNotAdmin)
				return res.status(400).json({ success: false, message: customErrors.userNotAdmin });
			}
		} */


		

		user.lastLogin = new Date();
		await user.save();
		generateTokenAndSetCookie(res, user._id);
		res.status(200).json({
			success: true,
			message: customInfo.loggedSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log(customErrors.inLogin, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

 const logout = async (req, res) => {
	res.clearCookie("token");
	console.log('logout!')
	res.status(200).json({ success: true, message: customInfo.loggedSuccessfully });
};

 const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: customErrors.userNotFound });
		}

		// Check if token exists

		if (user.resetPasswordToken){
			var mailOptions = {
				from: process.env.EMAIL,
				to: user.email,
				subject: 'przypomnienie hasła',
				text: `WITAMY  ${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`
			  };
			  
			  transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				  console.log(error);
				} else {
				  console.log(customInfo.emailSent + info.response);
				  //return res.json({success:true,message:'shortPassMess'}) 
				}
			  });
		}else{



		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		//await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'przypomnienie hasła',
            text: `WITAMY  ${process.env.CLIENT_URL}/reset-password/${resetToken}`
          };
          
           transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
              //return res.json({success:true,message:'shortPassMess'}) 
            }
          });

		res.status(200).json({ success: true, message: customInfo.sentCodeToEmail });
	}
	} catch (error) {
		console.log(customErrors.forgotPassword, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

 const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await userModel.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: customInfo.expiriedCode });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		//await sendResetSuccessEmail(user.email);

		var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'reset się powiódł',
            text: `hasło zresetowane ;)`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
              //return res.json({success:true,message:'shortPassMess'}) 
            }
          });

		res.status(200).json({ success: true, message: customInfo.resetSuccessfull });
	} catch (error) {
		console.log(customErrors.resetPassword, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const setAddressData = async (req, res) => {
	try {
		const { token } = req.params;
		const { address } = req.body;

		const user = await userModel.findOne({
			token: token,
		});

		if (!user) {
			return res.status(400).json({ success: false, message: customErrors.address });
		}


		user.address = address;
		await user.save();

		//await sendResetSuccessEmail(user.email);

		var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'zmiana adresu',
            text: `adres zmieniony`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
            }
          });

		res.status(200).json({ success: true, message: customInfo.resetSuccessfull });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ success: false, message: error.message });
	}
};

 const checkAuth = async (req, res) => {
	try {
		const user = await userModel.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: customErrors.userNotFound });
		}
/* 		if (!(user.isAdmin)) {
			return res.status(400).json({ success: false, message: customErrors.userNotAdmin });
		} */

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log(customErrors.inCheckAuth, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// all users emails
const addPermissions = async (req,res) => {
    try {
        const users = await userModel.find({});


		await user.save();
		generateTokenAndSetCookie(res, user._id);
	
			user.token =  generateTokenAndSetCookie(res, user._id);
			await user.save();

			
        let emailsArr = [];
        Object.entries(users).map(([item, i]) => {
            if(!(i['email']=='undefined')&&!emailsArr.includes(i['email'])){
                emailsArr.push(i['email'])
            }})

        res.json({success:true,data:emailsArr})
    } catch (error){
        res.json({success:false,message: errorMessage})
    }
}

// all users emails
const userEmails = async (req,res) => {
	const {token} = req.headers;
	console.log('token');
	
    try {
        const users = await userModel.find({});
        let emailsArr = [];
        Object.entries(users).map(([item, i]) => {
            if(!emailsArr.includes(i['email'])){
                emailsArr.push(i['email'])
            }})

        res.json({success:true,data:emailsArr})
    } catch (error){
        res.json({success:false,message: errorMessage})
    }
}


export {login, signup, verifyEmail, logout, forgotPassword, resetPassword,checkAuth,setAddressData,userEmails}