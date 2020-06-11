// App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TabLists from './components/TabList';

const App = () => {
	return (
		<BrowserRouter>
			<div className="card-body col-md-6 mx-auto">
				<h1 className="mb-4 card-title">ニュース検索＆保存</h1>
				<TabLists />
			</div>
		</BrowserRouter>
	);
};
export default App;
