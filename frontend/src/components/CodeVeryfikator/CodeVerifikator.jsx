import React from 'react';

import { useRef } from 'react';

import { emailVeryData } from './loginVar.js';
import Button from '../Button/Button.jsx';
import './CodeVerifikator.css';

const CodeVerifikator = ({
	title,
	handleSubmit,
	isLoading,
	error,
	code,
	setCode,
}) => {
	const inputRefs = useRef([]);
	const codeLength = code.length;
	const codeLengthMin = code.length - 1;

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, codeLength).split('');
			for (let i = 0; i < codeLength; i++) {
				newCode[i] = pastedCode[i] || '';
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
			const focusIndex =
				lastFilledIndex < codeLengthMin ? lastFilledIndex + 1 : codeLengthMin;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < codeLengthMin) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	return (
		<div className='cardContent'>
			<div className='codeVerifikatorForm'>
				<h2 className='textTogradient'>{title}</h2>

				<form onSubmit={handleSubmit}>
					<div className='codeVerifikatorBox'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength={codeLength}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='codeVerifikatorInput
'
							/>
						))}
					</div>
					{error && <p className='textError'>{error}</p>}
					<Button
						text={emailVeryData.emailVeryBtnText}
						animateText={emailVeryData.emailVeryTextAnimate}
						animate={isLoading}
						color={'0'}
					></Button>
				</form>
			</div>
		</div>
	);
};
export default CodeVerifikator;
