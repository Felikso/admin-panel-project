import React from 'react';
import './Footer.css';
import { assets } from '@/assets/assets';
import {
	brandData,
	coppyrightInfo,
	footerLinks,
	footerTitle,
	socialLinks,
} from '@/utils/variables';

const Footer = ({ setShowPopupPage }) => {
	return (
		<div className='footer' id='footer'>
			<div className='footerContent'>
				<div className='footerContentLeft'>
					<div className='footexSocials'>
					<img src={assets.logo} alt={`logo ${brandData.name}`} />
					<div className='flexRow socialsIconsBox'>
						<a className='animatedIcons' target='_blank' href={socialLinks.fb}>
							<img
								src={assets.facebook_icon}
								alt={`facebook ${brandData.name}`}
							/>
						</a>
						<a className='animatedIcons' target='_blank' href={socialLinks.tw}>
							<img
								src={assets.twitter_icon}
								alt={`twitter ${brandData.name}`}
							/>
						</a>
						<a className='animatedIcons' target='_blank' href={socialLinks.ln}>
							<img
								src={assets.linkedin_icon}
								alt={`linkedin ${brandData.name}`}
							/>
						</a>
					</div>
					</div>
				</div>
				<div className='footerContentRight'>
					<h2>{brandData.name}</h2>
					<ul>
						{Object.entries(footerLinks).map(([item, i]) => (
							<li
								key={i}
								onClick={() => {
									setShowPopupPage(item);
								}}
							>
								{footerLinks[item][0]}
							</li>
						))}
					</ul>
				</div>
				<div className='footerContentRight'>
					<h2>{footerTitle}</h2>
					<ul>
						<li>
							<a>{brandData.number}</a>
						</li>
						<li>
							<a href={`mailto:${brandData.mail}`}>{brandData.mail}</a>
						</li>
					</ul>
				</div>
			</div>
			<hr />
			<p className='footerCopyright'>{coppyrightInfo}</p>
		</div>
	);
};

export default Footer;
