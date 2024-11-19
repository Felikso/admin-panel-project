import React, { useEffect } from 'react';
import './ItemsDisplay.css';
import Item from '../Item/Item';

import { allCategoriesName } from '@/utils/variables.jsx';
import { useAuthStore } from '@/store/authStore';
import { useItemStore } from '@/store/itemStore';
import BackgroundAnimation from '../BackgroundAnimation/BackgroundAnimation';
import NetworkErrorText from '../NetworkErrorText/NetworkErrorText.jsx';
const ItemsDisplay = ({ category }) => {
	const { netErr, dataLoading } = useAuthStore();

  const { fetchItemsList, items_list } = useItemStore();

	const fetchList = async () => {
		await fetchItemsList();
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className='itemsDisplay' id='itemsDisplay'>
			{netErr && <NetworkErrorText />}
			<div className='itemsDisplayList'>
				{dataLoading ? (
					<BackgroundAnimation />
				) : (
					items_list?.length > 0 &&
					items_list.map((item, i) => {
						if (category === allCategoriesName || category === item.category) {
							return <Item key={i} item={item} />;
						}
					})
				)}
			</div>
		</div>
	);
};

export default ItemsDisplay;
