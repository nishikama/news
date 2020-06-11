import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ItemList from './ItemList';
import SearchNews from './SearchNews';

const TabLists = () => {
	return (
		<Tabs>
			<TabList>
				<Tab>ニュース一覧</Tab>
				<Tab>ニュース検索</Tab>
			</TabList>

			<TabPanel>
				<ItemList />
			</TabPanel>
			<TabPanel>
				<SearchNews />
			</TabPanel>
		</Tabs>
	);
};
export default TabLists;
