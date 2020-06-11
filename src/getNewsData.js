import msRestAzure from 'ms-rest-azure';
import NewsSearchAPIClient from 'azure-cognitiveservices-newssearch';

const getNewsData = (search_term) => {
	return new Promise((resolve, reject) => {
		const CognitiveServicesCredentials =
			msRestAzure.CognitiveServicesCredentials;
		const credentials = new CognitiveServicesCredentials(
			'b94d6bfb84ef49f281dde4f87891e348'
		);

		const client = new NewsSearchAPIClient(credentials);

		client.newsOperations
			.search(search_term)
			.then((response) => {
				resolve(response.value);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export default getNewsData;
