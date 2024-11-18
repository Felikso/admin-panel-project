import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import { useAuthStore } from '../../store/authStore.js';
import {
	formData,
	welcomeTitle,
	pagesLinks,
    createAccountData,
} from '../../utils/variables.jsx';
import Button from '../../components/Button/Button.jsx';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter.jsx';

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate(pagesLinks.verifyEmail);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>{createAccountData.createAccountTitle}</h2>

				<form onSubmit={handleSignUp}>
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
					<PasswordStrengthMeter password={password} />
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
						to={pagesLinks.login}
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
