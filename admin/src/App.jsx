import { Navigate, Route, Routes } from 'react-router-dom';

import SignUpPage from './pages/LoginPages/SignUpPage';
import LoginPage from './pages/LoginPages/LoginPage.jsx';
import ForgotPasswordPage from './pages/LoginPages/ForgotPasswordPage.jsx';
import EmailVerificationPage from './pages/LoginPages/EmailVerificationPage';
import ResetPasswordPage from './pages/LoginPages/ResetPasswordPage';

import DashboardPage from './pages/AuthPages/DashboardPage';

import LoadSpinner from './components/LoadSpinner/LoadSpinner.jsx';

import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import ListPage from './pages/AuthPages/ListPage';
import AddPage from './pages/AuthPages/AddPage.jsx';
import OrdersPage from './pages/AuthPages/OrdersPage.jsx';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation.jsx';
import AdminNavbar from './components/AdminNavbar/AdminNavbar.jsx'

import { pagesLinks, authList } from './utils/variables.jsx';
import { replacePolishLetters } from './utils/functions.js'
import NotAdminPage from './pages/NotAdminPage.jsx';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if(user){
		if (!user.isAdmin) {
			return <Navigate to='/not-admin' replace />;
		}
		
	}
	if (!isAuthenticated) {
		return <Navigate to={`${pagesLinks.login}`} replace />;
	}

	if (!user.isVerified) {
		return <Navigate to={`${pagesLinks.verifyEmail}`} replace />;
	}

/* 	if (!user.isAdmin) {
		return <Navigate to={`${pagesLinks.login}`} replace />;
	} */



/* 	if (isAuthenticated) {
		return <AdminNavbar />;
	} */

	return (
		<>
		<AdminNavbar />
		{children}
		</>);
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
		console.log(checkAuth())
		if(checkAuth()){
			console.log('lel')
		}else{
			console.log('xd');
			
		}
		console.log('sprawdzam')
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadSpinner />;
	//if (isCheckingAuth) return <AdminNavbar />;

	return (
		<div className='background'>
		{/* 	<BackgroundAnimation count={30} /> */}
	{/* 	<AdminNavbar /> */}
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
					path='/not-admin'
					element={
						
							<NotAdminPage />
						
					}
				/>

{/* 				{Object.entries(authList).map(([item, i]) => (
					<Route
					path={`${replacePolishLetters(authList[item])}`}
					element={
						<ProtectedRoute>
							<ListPage />
						</ProtectedRoute>
					}
						/>
					))} */}
				<Route
					path={replacePolishLetters(authList.add)}
					element={
						<ProtectedRoute>
							<AddPage />
						</ProtectedRoute>
					}
				/>

			<Route
					path={replacePolishLetters(authList.list)}
					element={
						<ProtectedRoute>
							<ListPage />
						</ProtectedRoute>
					}
				/>

			<Route
					path={replacePolishLetters(authList.orders)}
					element={
						<ProtectedRoute>
							<OrdersPage />
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
				<Route
					path={pagesLinks.verifyEmail}
					element={<EmailVerificationPage />}
				/>
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
