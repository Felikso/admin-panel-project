import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import SignUpPage from './pages/LoginPages/SignUpPage';
import LoginPage from './pages/LoginPages/LoginPage.jsx';
import ForgotPasswordPage from './pages/LoginPages/ForgotPasswordPage.jsx';
import EmailVerificationPage from './pages/LoginPages/EmailVerificationPage';
import ResetPasswordPage from './pages/LoginPages/ResetPasswordPage';

import DashboardPage from './pages/AuthPages/DashboardPage';

import LoadSpinner from './components/LoadSpinner/LoadSpinner.jsx';

import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect, useState } from 'react';
import ListPage from './pages/AuthPages/ListPage';
import AddPage from './pages/AuthPages/AddPage.jsx';
import OrdersPage from './pages/AuthPages/OrdersPage.jsx'
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation.jsx';
import AdminNavbar from './components/AdminNavbar/AdminNavbar.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

import { pagesLinks, authList, panelPath } from './utils/variables.jsx';
import { replacePolishLetters } from './utils/functions.js'
import NotAdminPage from './pages/NotAdminPage.jsx';



//


import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
/* import LoginPopup from './components/LoginPopup/LoginPopup'; */
/* import { pagesLinks, footerLinks } from './utils/variables'; */
import PopupPage from './components/PopupPage/PopupPage';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import VerifyOrder from './pages/VerifyOrder/VerifyOrder.jsx';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if(user){
		if (!user.isAdmin) {
			return <Navigate to='/not-admin' replace />;
		}
		
	}
/* 	if (!isAuthenticated) {
		return <Navigate to={`${pagesLinks.login}`} replace />;
	} */

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
		{/* <AdminNavbar /> */}
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

	
	const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();
	//const [showLogin, setShowLogin] = useState(false);
	const [showPopupPage, setShowPopupPage] = useState(false);
	
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);


	/* scroll to # */

const location = useLocation();
  
useEffect(() => {
  scrollToHash();
  // Other location checking and authority enforcing functions here
}, [location]);

/**
 * Check for a hash link in the React Router location and search children for a matching id
 */
const scrollToHash = () => {
  if (location.hash) {
	let hash = location.hash.replace('#', '');
	const element = document.getElementById(hash);
	element?.scrollIntoView({
	  behavior: 'smooth'
	});
  }
}

	if (isCheckingAuth) return <LoadSpinner />;



	return (
		<div className='background flexCol'>
		{/* 	<BackgroundAnimation count={30} /> */}
		{showPopupPage && <PopupPage setShowPopupPage={setShowPopupPage} showPopupPage={showPopupPage}/>}
		<Navbar />
			<Routes>

			<Route path='/' element={<Home />} />
          <Route path={`/${pagesLinks.cart}`} element={<Cart />} />
          <Route path={`/${pagesLinks.order}`} element={<PlaceOrder />} />
          <Route path={`/${pagesLinks.verify}`} element={<Verify />} />
          <Route path={`/${pagesLinks.myorders}`} element={<MyOrders />} />
		{/*   <Route path={`/${pagesLinks.verifyOrder}/:_id`} element={<VerifyOrder />} /> */}

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
					path={panelPath+authList.add}
					element={
						<ProtectedRoute>
							<AddPage />
						</ProtectedRoute>
					}
				/>

			<Route
					path={panelPath+authList.list}
					element={
						<ProtectedRoute>
							<ListPage />
						</ProtectedRoute>
					}
				/>

			<Route
					path={replacePolishLetters(panelPath+authList.orders)}
					element={
						<ProtectedRoute>
							<OrdersPage />
						</ProtectedRoute>
					}
				/>










	{/* 			<Route
					path={panelPath+pagesLinks.signup}
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/> */}
					{[panelPath+pagesLinks.signup,pagesLinks.signup].map(path => <Route path={path} key={path}
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage location={location} panelPath={panelPath} />
						</RedirectAuthenticatedUser>
					}
				/>)}
					{[panelPath+pagesLinks.login,pagesLinks.login].map(path => <Route path={path} key={path}
					element={
						<RedirectAuthenticatedUser>
							<LoginPage location={location} panelPath={panelPath} />
						</RedirectAuthenticatedUser>
					}
				/>)}
				
{/* 				<Route
					path={panelPath+pagesLinks.verifyEmail}
					element={<EmailVerificationPage />}
				/> */}

			{[panelPath+pagesLinks.verifyEmail,pagesLinks.verifyEmail].map(path => <Route path={path} key={path}
					element={
						<RedirectAuthenticatedUser>
							<EmailVerificationPage location={location} panelPath={panelPath} />
						</RedirectAuthenticatedUser>
					}
				/>)}
{/* 				<Route
					path={panelPath+pagesLinks.forgotPass}
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/> */}

{[panelPath+pagesLinks.forgotPass,pagesLinks.forgotPass].map(path => <Route path={path} key={path}
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage location={location} panelPath={panelPath} />
						</RedirectAuthenticatedUser>
					}
				/>)}

	{/* 			<Route
					path={`${panelPath+pagesLinks.resetPass}/:token`}
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/> */}

		{[panelPath+pagesLinks.resetPass,pagesLinks.resetPass].map(path => <Route path={path} key={path}
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage location={location} panelPath={panelPath} />
						</RedirectAuthenticatedUser>
					}
				/>)}
				{/* catch all routes */}
			{/* 	<Route path='*' element={<Navigate to='/' replace />} /> */}
			</Routes>
			<Footer setShowPopupPage={setShowPopupPage}/>
			<Toaster />
		</div>
	);
}

export default App;
