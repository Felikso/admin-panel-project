import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	setAddressData,
	userEmails
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const userRoute = express.Router();

userRoute.get("/check-auth", verifyToken, checkAuth);

userRoute.post("/signup", signup);
userRoute.post("/login",verifyToken, login);
userRoute.post("/logout", logout);

userRoute.post("/verify-email", verifyEmail);
userRoute.post("/forgot-password", forgotPassword);

userRoute.post("/add-permissions/:token", resetPassword);
userRoute.get("/emails",adminMiddleware,userEmails);
userRoute.post("/reset-password/:token", resetPassword);
userRoute.post("/podsumowanie/:token", setAddressData);


export default userRoute;
