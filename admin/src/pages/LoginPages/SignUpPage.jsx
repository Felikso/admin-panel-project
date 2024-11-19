import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/Input/Input.jsx';
import { useAuthStore } from '@/store/authStore.js';
import {
	formData,
	loginPagesLinks,
	createAccountData,
	customInfo,
} from './loginVar.js';
import Button from '@/components/Button/Button.jsx';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter/PasswordStrengthMeter.jsx';

const SignUpPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [strongPassword, setStrongPassword] = useState(false);
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate(loginPagesLinks.verifyEmail);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>
					{createAccountData.createAccountTitle}
				</h2>

				<form
					onSubmit={strongPassword ? handleSignUp : (e) => e.preventDefault()}
				>
					<Input
						icon={User}
						type='text'
						placeholder={formData.namePlaceholder}
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
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

					{error && <p className='textError'>{error}</p>}
					{!strongPassword && (
						<p className='infoLink'>{customInfo.strongPassword}</p>
					)}

					<PasswordStrengthMeter
						password={password}
						setStrongPassword={setStrongPassword}
					/>
					<Button
						text={createAccountData.signUpBtnText}
						animateText={createAccountData.signUpProcess}
						animate={isLoading}
						color={'0'}
					></Button>
				</form>
			</div>
			<div className='infoBox'>
				<p className='infoText'>
					{createAccountData.haveAccount}
					{'   '}
					<Link
						to={loginPagesLinks.login}
						className='animationLink'
						data-replace={createAccountData.loginBtnText}
					>
						<span>{createAccountData.loginBtnText}</span>
					</Link>
				</p>
			</div>
		</div>
	);
};
export default SignUpPage;
