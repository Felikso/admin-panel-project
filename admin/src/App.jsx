import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { pagesLinks, footerLinks } from './utils/variables';
import PopupPage from './components/PopupPage/PopupPage';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';


/* login */
import SignUpPage from './pages/LoginPages/SignUpPage';
import LoginPage from './pages/LoginPages/LoginPage.jsx';
import ForgotPasswordPage from './pages/LoginPages/ForgotPasswordPage.jsx';
import EmailVerificationPage from './pages/LoginPages/EmailVerificationPage';
import ResetPasswordPage from './pages/LoginPages/ResetPasswordPage';

import { loginPagesLinks } from './pages/LoginPages/loginVar.js';

import { useAuthStore } from './store/authStore';
/*login*/

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPopupPage, setShowPopupPage] = useState(false);


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

/*login*/

const { isAuthenticated, user } = useAuthStore();
console.log(isAuthenticated)
const RedirectAuthenticatedUser = ({ children }) => {

	if (isAuthenticated && user?.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
/*login*/
console.log(isAuthenticated);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showPopupPage && <PopupPage setShowPopupPage={setShowPopupPage} showPopupPage={showPopupPage}/>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={`/${pagesLinks.cart}`} element={<Cart />} />
          <Route path={`/${pagesLinks.order}`} element={<PlaceOrder />} />
          <Route path={`/${pagesLinks.verify}`} element={<Verify />} />
          <Route path={`/${pagesLinks.myorders}`} element={<MyOrders />} />



        
          <Route
					path={loginPagesLinks.signup}
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path={loginPagesLinks.login}
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path={loginPagesLinks.verifyEmail}
					element={<EmailVerificationPage />}
				/>
				<Route
					path={loginPagesLinks.forgotPass}
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path={`${loginPagesLinks.resetPass}/:token`}
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
        </Routes>
      </div>

      <Footer setShowPopupPage={setShowPopupPage}/>
    </>
  );
};

export default App;
