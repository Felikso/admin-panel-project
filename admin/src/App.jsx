import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

//public
import Navbar from './components/Navbar/Navbar';
import Home from '@/pages/PublicPages/Home/Home';
import Cart from '@/pages/PublicPages/Cart/Cart';
import PlaceOrder from '@/pages/PublicPages/PlaceOrder/PlaceOrder';
import MyOrders from '@/pages/PublicPages/MyOrders/MyOrders';
import Footer from '@/components/Footer/Footer';

import SignUpPage from './pages/LoginPages/SignUpPage';
import LoginPage from './pages/LoginPages/LoginPage.jsx';
import ForgotPasswordPage from './pages/LoginPages/ForgotPasswordPage.jsx';
import EmailVerificationPage from './pages/LoginPages/EmailVerificationPage';
import ResetPasswordPage from './pages/LoginPages/ResetPasswordPage';

//import DashboardPage from './pages/AuthPages/DashboardPage';

import LoadSpinner from './components/LoadSpinner/LoadSpinner.jsx';

import { Toaster } from 'react-hot-toast';


/* import ListPage from './pages/AuthPages/ListPage';
import AddPage from './pages/AuthPages/AddPage.jsx';
import OrdersPage from './pages/AuthPages/OrdersPage.jsx'; */


import { pagesLinks} from './utils/variables.jsx';
//import { replacePolishLetters } from './utils/functions.js'
//import NotAdminPage from './pages/NotAdminPage.jsx';



/* import LoginPopup from './components/LoginPopup/LoginPopup'; */
/* import { pagesLinks, footerLinks } from './utils/variables'; */
//import PopupPage from '@/components/PopupPage/PopupPage';

/* import Verify from './pages/Verify/Verify'; */

/* import VerifyOrder from './pages/VerifyOrder/VerifyOrder.jsx';
 */
//import toast from 'react-hot-toast';
//public

// protect routes that require authentication
/* const ProtectedRoute = ({ children }) => {
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

	return (
		<>
		<AdminNavbar />
		{children}
		</>);
}; */


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
	}, []);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadSpinner />;

	return (
		<div className='background'>
		{/* 	<BackgroundAnimation count={30} /> */}
	{/* 	<AdminNavbar /> */}
	<Navbar />
			<Routes>


			<Route path='/' element={<Home />} />
          <Route path={`/${pagesLinks.cart}`} element={<Cart />} />
          <Route path={`/${pagesLinks.order}`} element={<PlaceOrder />} />
   {/*        <Route path={`/${pagesLinks.verify}`} element={<Verify />} /> */}
          <Route path={`/${pagesLinks.myorders}`} element={<MyOrders />} />
		{/*   <Route path={`/${pagesLinks.verifyOrder}/:_id`} element={<VerifyOrder />} /> */}
		
{/* 				<Route
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
				/> */}

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
				{/* <Route
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
 */}


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
			<Footer />
			<Toaster />
		</div>
	);
}

export default App;
