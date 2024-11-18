import { Check, X } from "lucide-react";
import './PasswordStrengthMeter.css'


const PasswordCriteria = ({ password }) => {
	const criteria = [
		{ label: "wymagane minimum 6 znaków", met: password.length >= 6 },
		{ label: "wymagana duża litera", met: /[A-Z]/.test(password) },
		{ label: "wymagana mała litera", met: /[a-z]/.test(password) },
		{ label: "wymagana liczba", met: /\d/.test(password) },
		{ label: "wymagany znak specjalny", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div>
			{criteria.map((item) => (
				<div key={item.label} className='citeriaBox'>
					{item.met ? (
						<Check className='checkColor' />
					) : (
						<X className='neutralDark' />
					)}
					<span className={item.met ? "checkColor" : "neutralLight"}>{item.label}</span>
				</div>
			))}
		</div>
	);
};

const PasswordStrengthMeter = ({ password }) => {
	const getStrength = (pass) => {
		let strength = 0;
		if (pass.length >= 6) strength++;
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass.match(/\d/)) strength++;
		if (pass.match(/[^a-zA-Z\d]/)) strength++;
		return strength;
	};
	const strength = getStrength(password);

	const getColor = (strength) => {
		if (strength === 0) return "veryWeak";
		if (strength === 1) return "weak";
		if (strength === 2) return "mid";
		if (strength === 3) return "good";
		return "strong";
	};

	const getStrengthText = (strength) => {
		if (strength === 0) return "bardzo słabe";
		if (strength === 1) return "słabe";
		if (strength === 2) return "średnie";
		if (strength === 3) return "mocne";
		return "silne";
	};

	return (
		<div>
			<div className='meterBox'>
				<span className='neutralLight'>Moc hasła: </span>
				<span className='neutralLight'>{getStrengthText(strength)}</span>
			</div>

			<div className='passStrengthBox'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className={`passStrength
                ${index < strength ? getColor(strength) : 'neutralBg'}
              `}
					/>
				))}
			</div>
			<PasswordCriteria password={password} />
		</div>
	);
};
export default PasswordStrengthMeter;
