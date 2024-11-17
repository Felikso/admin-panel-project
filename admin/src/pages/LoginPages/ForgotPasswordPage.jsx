import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import { useAuthStore } from '../../store/authStore.js';
import { remindPassData, loginPagesLinks } from './loginVar.js';
import Button from '../../components/Button/Button.jsx';

const ForgotPsswordPage = () => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword, error } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		//setIsSubmitted(true);
	};

	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>
					{remindPassData.remindPasswordTitle}
				</h2>

				<form onSubmit={handleSubmit}>
					<Input
						icon={Mail}
						type='email'
						placeholder={remindPassData.remindPasswordPlaceholder}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<div className='linksBox'>
						<Link
							to={loginPagesLinks.login}
							className='animationLink'
							data-replace={remindPassData.remindPasswordLink}
						>
							<span>{remindPassData.remindPasswordLink}</span>
						</Link>
					</div>
					{error && <p className='textError'>{error}</p>}

					<Button
						text={remindPassData.remindPasswordBtn}
						animateText={remindPassData.remindPasswordBtnAnimate}
						animate={isLoading}
						color={'0'}
					></Button>
				</form>
			</div>
			<div className='infoBox'>
				<p className='infoText'>{remindPassData.remindPasswordInfo}</p>
			</div>
		</div>
	);
};
export default ForgotPsswordPage;
