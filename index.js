import axios from "axios";

(()=> {
	console.log(123);

	async function getPricesHistory () {
		// Promise<[number, number][]> => {
	  // let res: [number, number][] = [];

	  try {
	    const data =
	      (
	        await axios.get(
				'https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=usd&days=1CG-piYAkfuLU4agtL2vEyUqRiP5'
	        ).data || {};

	    if (data && data.prices) {
	      res = data.prices;
	    }
	  } catch (err) {
	    logger.error("getPricesHistory error", { err });
	  }

	  // return res;
	};
	} 
})()