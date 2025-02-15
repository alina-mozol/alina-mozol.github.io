(()=> {
	async function getPricesHistory(token) {
	    const data =
	        await axios.get(
				`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=1CG-piYAkfuLU4agtL2vEyUqRiP5`
	        );
		return data.data.prices[0][1];
	};
	
	async function getUsdcPriceHistory(token) {
		let priceToken = await getPricesHistory(token);
		let initialPrices = {
			'usd-coin': 1,
			'tether': 0.99,
			'ethereum': 2697.41,
			'staked-ether': 2696.45,
			'curve-dao-token': 0.5107
		};

		let currentTokenInitialPrice;
		for (const price in initialPrices) {
			if(price == token) {
				currentTokenInitialPrice = initialPrices[price];
			}
		}
		let percentChanges = 100 - (currentTokenInitialPrice / priceToken * 100);

		let parentDiv = document.getElementsByClassName('parentDiv')[0];
		let tokenName = document.createElement('h2');
        tokenName.className = 'tokensNames';
        tokenName.innerText = token;
        parentDiv.appendChild(tokenName);
        let currentPrice = document.createElement('p');
        currentPrice.className = 'tokensPrices';
        currentPrice.innerText = `Current price: ${priceToken}`;
        parentDiv.appendChild(currentPrice);
		let priceChanges = document.createElement('p');
        priceChanges.className = 'priceChanges';
        priceChanges.innerText = `Changes % of the initial deposit: ${percentChanges.toFixed(2)} %`;
		if(percentChanges < -10) {
			priceChanges.style = 'color: red;';
		}
        parentDiv.appendChild(priceChanges);
	}

	getUsdcPriceHistory('usd-coin');
	getUsdcPriceHistory('tether');
	getUsdcPriceHistory('ethereum');
	getUsdcPriceHistory('staked-ether');
	getUsdcPriceHistory('curve-dao-token');
})()