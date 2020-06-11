// ItemList.jsx
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import Item from './Item';

const ItemList = (props) => {
	const [newsList, setNewsList] = useState(null);
	const history = useHistory();

	// firestoreから全データを取得してstateに格納する関数
	const getNewsFromFirestore = async () => {
		const itemListArray = await firebase
			.firestore()
			.collection('news')
			.get();
		const newsArray = itemListArray.docs.map((x) => {
			return {
				id: x.id,
				data: x.data(),
			};
		});
		setNewsList(newsArray);
		return newsArray;
	};

	// useEffectを利用してFirestoreからデータの一覧を取得．
	useEffect(() => {
		history.push('/');
		const result = getNewsFromFirestore();
	}, [props, history]);

	return (
		<div>
			<ul>
				{newsList?.map((x) => (
					<Item
						key={x.id}
						news={x}
						getNewsFromFirestore={getNewsFromFirestore}
					/>
				))}
			</ul>
		</div>
	);
};
export default ItemList;
