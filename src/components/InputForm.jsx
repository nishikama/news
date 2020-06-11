// InputForm.jsx
import React, { useState } from 'react';
import firebase from '../firebase';
import TextareaAutosize from 'react-textarea-autosize';

const InputForm = ({ name, url, contentUrl, description, datePublished }) => {
	const [comment, setComment] = useState('');

	// Firestoreにデータを送信する関数
	const postDataToFirestore = async (collectionName, postData) => {
		const addedData = await firebase
			.firestore()
			.collection(collectionName)
			.add(postData);
		return addedData;
	};

	// submitボタンクリック時の処理
	const submitData = async () => {
		const postData = {
			name: name,
			url: url,
			contentUrl: contentUrl,
			description: description,
			datePublished: datePublished,
			comment: comment,
		};
		const addedData = await postDataToFirestore('news', postData);
	};

	return (
		<>
			<div className="mt-2 form-group">
				<TextareaAutosize
					className="form-control"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					aria-label="comment"
				/>
			</div>
			<div className="form-group">
				<button
					className="mr-2 btn btn-outline-primary btn-sm"
					onClick={submitData}
				>
					投　稿
				</button>
			</div>
		</>
	);
};

export default InputForm;
