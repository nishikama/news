import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';
import convertFromTimestampToDatetime from '../convertFromTimestampToDatetime';

const NewsList = (props) => {
	const [newsData, setNewsData] = useState(null);

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
		setNewsData(newsArray);
		return newsArray;
	};

	useEffect(() => {
		const result = props.getData?.(props.sentData).then((response) => {
			setNewsData(response);
		});
	}, [props]);

	return (
		<div>
			{newsData === null ? (
				<p>now loading...</p>
			) : newsData.length ? (
				<ul>
					{newsData.map((x, index) => (
						<li key={index}>
							<h2 className="mt-4">
								<a
									href={x.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{x.name}
								</a>
							</h2>
							<div className="mt-2 d-flex">
								<div className="px-2 pt-2 card-text">
									{x.image !== void 0 ? (
										<img
											src={x.image.thumbnail.contentUrl}
											alt={x.name}
										/>
									) : (
										''
									)}
								</div>
								<div className="px-2 card-text">
									{x.description}
								</div>
							</div>
							<div className="mt-2 text-right">
								<time
									dateTime={convertFromTimestampToDatetime(
										new Date(x.datePublished) / 1000
									)}
								>
									{convertFromTimestampToDatetime(
										new Date(x.datePublished) / 1000
									)}
								</time>
							</div>
							<InputForm
								name={x.name}
								url={x.url}
								contentUrl={
									x.image !== void 0
										? x.image.thumbnail.contentUrl
										: ''
								}
								description={x.description}
								datePublished={x.datePublished}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>検索データはありません。</p>
			)}
		</div>
	);
};
export default NewsList;
