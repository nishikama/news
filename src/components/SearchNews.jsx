import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import getNewsData from '../getNewsData';
import NewsList from './NewsList';

const SearchNews = (props) => {
	const [searchWords, setSearchWords] = useState(null);
	const history = useHistory();
	const onSubmit = (e) => {
		e.preventDefault();
		history.push(`/${encodeURIComponent(searchWords)}`);
	};

	return (
		<>
			<div className="input-group mb-3">
				<input
					className="form-control"
					type="search"
					placeholder="検索ワードを入力してください"
					value={searchWords === null ? '' : searchWords}
					onChange={(e) => {
						setSearchWords(e.target.value);
					}}
					aria-describedby="basic-addon2"
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-primary btn-sm"
						onClick={onSubmit}
					>
						検　索
					</button>
				</div>
			</div>
			<Route
				exact
				path={`/${decodeURIComponent(searchWords)}`}
				render={(props) => (
					<NewsList
						sentData={searchWords}
						getData={async (data) => await getNewsData(data)}
					/>
				)}
			/>
		</>
	);
};
export default SearchNews;
