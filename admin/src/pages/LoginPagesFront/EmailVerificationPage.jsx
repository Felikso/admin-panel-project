import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { emailVeryData } from './loginVar.js';
import { customInfo } from './loginVar.js';
import './LoginPages.css';
import CodeVerifikator from '../../components/CodeVeryfikator/CodeVerifikator.jsx';

const EmailVerificationPage = () => {
	const [code, setCode] = useState(['', '', '', '', '', '']);
	const navigate = useNavigate();

	const { error, isLoading, verifyEmail } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join('');
		try {
			await verifyEmail(verificationCode);
			navigate('/');
			toast.success(customInfo.emailVerified);
		} catch (error) {
			console.log(error);
		}
	};

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== '')) {
			handleSubmit(new Event('submit'));
		}
	}, [code]);

	return (
		<CodeVerifikator
			handleSubmit={handleSubmit}
			title={emailVeryData.emailVeryTitle}
			isLoading={isLoading}
			error={error}
			code={code}
			setCode={setCode}
		/>
	);
};
export default EmailVerificationPage;
