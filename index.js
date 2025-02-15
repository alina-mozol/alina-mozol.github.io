(()=> {
	console.log(123);

	async function getPricesHistory () {
	//   try {
	    const data =
	        await axios.get(
				'https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=usd&days=1CG-piYAkfuLU4agtL2vEyUqRiP5'
	        );
	        console.log('1111111', data.data.prices[0], data.data.prices[0][1]);
		return console.log('1111111', data.data.prices);
	//   } catch (err) {
	//     logger.error("getPricesHistory error", { err });
	//   }
	};
	getPricesHistory();

	// let obj = {
	// 	"prices": [
	// 		[
	// 			1739545537439,
	// 			0.9999936665229943
	// 		]
	// 	]
	// }
	// console.log('333', obj.prices[0])
})()