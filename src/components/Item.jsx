// Item.jsx
import React, { useState } from 'react';
import firebase from '../firebase';
import TextareaAutosize from 'react-textarea-autosize';
import convertFromTimestampToDatetime from '../convertFromTimestampToDatetime';

const Item = ({ news, getNewsFromFirestore }) => {
	const [comment, setComment] = useState(null);

	// ↓追加 ドキュメントIDを指定してFirestoreのデータを更新する関数
	const updateDataOnFirestore = async (collectionName, documentId) => {
		const updatedData = await firebase
			.firestore()
			.collection(collectionName)
			.doc(documentId)
			.update({ comment: comment });
		getNewsFromFirestore();
		return;
	};

	// ↓追加 ドキュメントIDを指定してFirestoreのデータを削除する関数
	const deleteDataOnFirestore = async (collectionName, documentId) => {
		const removedData = await firebase
			.firestore()
			.collection(collectionName)
			.doc(documentId)
			.delete();
		getNewsFromFirestore();
		return;
	};

	return (
		<li>
			<h2 className="mt-4">
				<a
					href={news.data.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{news.data.name}
				</a>
			</h2>
			<div className="mt-2 d-flex">
				<div className="px-2 pt-2 card-text">
					{news.data.contentUrl !== void 0 ? (
						<img src={news.data.contentUrl} alt={news.data.name} />
					) : (
						''
					)}
				</div>
				<div className="px-2 card-text">{news.data.description}</div>
			</div>
			<div className="mt-2 text-right">
				<time
					dateTime={convertFromTimestampToDatetime(
						new Date(news.data.datePublished) / 1000
					)}
				>
					{convertFromTimestampToDatetime(
						new Date(news.data.datePublished) / 1000
					)}
				</time>
			</div>
			<div className="mt-2 form-group">
				<TextareaAutosize
					className="form-control"
					defaultValue={
						news.data.comment === null ? '' : news.data.comment
					}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					aria-label="comment"
				/>
			</div>
			<div className="form-group">
				<button
					className="mr-2 btn btn-outline-primary btn-sm"
					onClick={(e) => updateDataOnFirestore('news', news.id)}
				>
					更　新
				</button>
				<button
					className="btn btn-outline-dark btn-sm"
					onClick={(e) => deleteDataOnFirestore('news', news.id)}
				>
					削　除
				</button>
			</div>
		</li>
	);
};
export default Item;
