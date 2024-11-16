import './Input.css'

const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='inputBox'>
			<div className='iconBox'>
				<Icon className='icon' />
			</div>
			<input
				{...props}
				className='input'
			/>
		</div>
	);
};
export default Input;
