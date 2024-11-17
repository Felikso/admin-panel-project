import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import { useAuthStore } from '../../store/authStore.js';
import {
	formData,
	signUp,
	dontHaveAccount,
	forgotPass,
	remindPass,
	welcomeTitle,
	loginBtnText,
	loginBtnTextAnimate,
	loginPagesLinks,
} from './loginVar.js';
import Button from '../../components/Button/Button.jsx';
import {CardContent} from './CardContent.jsx';

const LoginPage = ({location}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const checkAdmin = false; //check if user is admin or not

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password, checkAdmin);
	};


	return (
		<>
		<CardContent location={location} title={welcomeTitle}>

				<form onSubmit={handleLogin}>
					
					<Input
						icon={Mail}
						type='email'
						placeholder={formData.emailPlaceholder}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder={formData.passwordPlaceholder}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<div className='linksBox'>
						<Link
							to={loginPagesLinks.forgotPass}
							className='animationLink'
							data-replace={remindPass}
						>
							<span>{forgotPass}</span>
						</Link>
					</div>
					{error && <p className='textError'>{error}</p>}

					<Button
						text={loginBtnText}
						animateText={loginBtnTextAnimate}
						animate={isLoading}
						color={'0'}
					></Button>
				</form>
			
			<div className='infoBox'>
				<p className='infoText'>
					{dontHaveAccount}
					{'   '}
					<Link
						to={loginPagesLinks.signup}
						className='animationLink'
						data-replace={signUp}
					>
						<span>{signUp}</span>
					</Link>
				</p>
			</div>
		</CardContent></>
	);
};
export default LoginPage;
