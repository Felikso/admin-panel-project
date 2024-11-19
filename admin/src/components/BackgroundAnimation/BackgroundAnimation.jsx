import React from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = ({ count }) => {
	let items = count ? (count > 40 ? 40 : count) : 10;
	let renderItems = [];
	for (let i = 0; i < items; i++) {
		renderItems.push(<i key={i}></i>);
	}
	return <>{renderItems}</>;
};

export default BackgroundAnimation;
