import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/LoginPages/SignUpPage";
import LoginPage from "./pages/LoginPages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/LoginPages/ForgotPasswordPage.jsx";
import EmailVerificationPage from "./pages/LoginPages/EmailVerificationPage";
import ResetPasswordPage from "./pages/LoginPages/ResetPasswordPage";

import DashboardPage from "./pages/AuthPages/DashboardPage";

import LoadSpinner from "./components/LoadSpinner/LoadSpinner.jsx";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ListPage from "./pages/AuthPages/ListPage";
import BackgroundAnimation from "./components/BackgroundAnimation/BackgroundAnimation.jsx";

import { pagesLinks } from './utils/variables.jsx'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to={`${pagesLinks.login}`} replace />;
	}

	if (!user.isVerified) {
		return <Navigate to={`${pagesLinks.verifyEmail}`} replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadSpinner />;

	return (
		<div
			className='background'
		>
			<BackgroundAnimation count={30} />

{/* 			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} /> */}

			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
								<Route
					path={pagesLinks.list}
					element={
						<ProtectedRoute>
							<ListPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path={pagesLinks.signup}
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path={pagesLinks.login}
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path={pagesLinks.verifyEmail} element={<EmailVerificationPage />} />
				<Route
					path={pagesLinks.forgotPass}
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path={`${pagesLinks.resetPass}/:token`}
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
