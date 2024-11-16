import React from 'react';
import './AppDownload.css';
import { appData, brandData, socialLinks } from '../../utils/variables';
import { assets } from '../../assets/assets';

const AppDownload = () => {
	return (
		<div className='appDownload' id='appDownload'>
			<p>
				{appData.p} <br /> {brandData.name} App
			</p>
			<div className='appDownloadPlatforms'>
				<a href={socialLinks.ps}>
					<img
						src={assets.play_store}
						alt={`${brandData.name} w Sklepie Play`}
					/>
				</a>
				<a href={socialLinks.as}>
					<img src={assets.app_store} alt={`${brandData.name} na AppStore`} />
				</a>
			</div>
		</div>
	);
};

export default AppDownload;
