import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '@/components/Input/Input.jsx';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import {
	createAccountData,
	resetPassData,
	customErrors,
	customInfo,
	formData,
	loginPagesLinks,
} from './loginVar.js';
import Button from '@/components/Button/Button.jsx';

const ResetPasswordPage = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert(customErrors.passNotMatch);
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success(customInfo.passResetSuccess);
			setTimeout(() => {
				navigate(`/${loginPagesLinks.login}`);
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || customErrors.resettingPass);
		}
	};

	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>
					{createAccountData.createAccountTitle}
				</h2>
				{error && <p className='textError'>{error}</p>}
				{message && <p className='textAccept'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder={formData.newPasswordPlaceholder}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder={formData.confirmNewPasswordPlaceholder}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<Button
						type='submit'
						text={resetPassData.resetBtnText}
						animateText={resetPassData.resetBtnTextAnimate}
						animate={isLoading}
						color={'0'}
					></Button>
				</form>
			</div>
		</div>
	);
};
export default ResetPasswordPage;
