(()=> {
	let prices;

	async function getPricesHistory(token) {
	    const data =
	        await axios.get(
				`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=1CG-piYAkfuLU4agtL2vEyUqRiP5`
	        );
		return data.data.prices[0][1];
	};

	async function getBalance(smartContractAddress, poolAddress) {
		var web3 = new Web3(Web3.givenProvider);
		var etherscanAbiEndpoint = `https://api.etherscan.io/api?module=contract&action=getabi&address=${smartContractAddress}&apikey=EQYRDC9GRDHJ1KC9I8UKWC4697AFUG2MEU`
		var abi = await d3.json(etherscanAbiEndpoint);
		var contract = await new web3.eth.Contract(JSON.parse(abi.result), smartContractAddress);
		var balance = await contract.methods.balanceOf(poolAddress).call();
		return balance;
	}

	async function getCurveBalance(smartContractAddress, index) {
		var web3 = new Web3(Web3.givenProvider);
		var etherscanAbiEndpoint = `https://api.etherscan.io/api?module=contract&action=getabi&address=${smartContractAddress}&apikey=EQYRDC9GRDHJ1KC9I8UKWC4697AFUG2MEU`
		var abi = await d3.json(etherscanAbiEndpoint);
		var contract = await new web3.eth.Contract(JSON.parse(abi.result), smartContractAddress);
		var balance = await contract.methods.balances(index).call();
		return balance;
	}
	
	async function getUsdcPriceHistory(token) {
		let priceToken = await getPricesHistory(token);
		let initialPrices = {
			'usd-coin': 1,
			'tether': 0.99,
			'ethereum': 2697.41,
			'staked-ether': 2696.45,
			'curve-dao-token': 0.5107
		};

		// prices[token] = priceToken;
		console.log(666, prices, token, priceToken)

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

	async function getPoolBalance(token1, token2, pool, token1Address, token2Address, poolAddress) {
		let initialBalances = {
			'ethereumstaked-etherPancake': 41879,
			'ethereumstaked-etherCurve': 41619588,
		};

		let token1Balance;
		let token2Balance;
		if(pool == 'Curve') {
			token1Balance = await getCurveBalance(poolAddress, 0);
			token2Balance = await getCurveBalance(poolAddress, 1);
		} else {
			token1Balance = await getBalance(token1Address, poolAddress);
			token2Balance = await getBalance(token2Address, poolAddress);
		}
		// let token1Price = await getPricesHistory(token1);
		// let token2Price = await getPricesHistory(token2);

		let token1Price;
		let token2Price;
		for (const price in prices) {
			if(price == token1) {
				token1Price = prices[price];
			} else if (price == token2) {
				token2Price = prices[price];
			}
		}
		console.log(555, token1Price, token2Price)

		let token1BalanceUsd = (Number(token1Balance * 100000n / 1000000000000000000n) / 100000) * token1Price;
		let token2BalanceUsd = (Number(token2Balance * 100000n / 1000000000000000000n) / 100000) * token2Price;
		let totalPoolBalance = token1BalanceUsd + token2BalanceUsd;

		let currentPoolInitialBalance;
		for (const balance in initialBalances) {
			if(balance == (token1+token2+pool)) {
				currentPoolInitialBalance = initialBalances[balance];
			}
		}
		let percentChanges = 100 - (currentPoolInitialBalance / totalPoolBalance * 100);

		let parentDiv = document.getElementsByClassName('parentDiv')[1];
		let poolName = document.createElement('h2');
        poolName.className = 'poolName';
        poolName.innerText = `${token1} - ${token2} ${pool}`;
        parentDiv.appendChild(poolName);

        let createdtotalPoolBalance = document.createElement('p');
        createdtotalPoolBalance.className = 'totalPoolBalance';
        createdtotalPoolBalance.innerText = `Total balance of pool in USD: ${totalPoolBalance}`;
        parentDiv.appendChild(createdtotalPoolBalance);

		let initialPoolBalance = document.createElement('p');
        initialPoolBalance.className = 'initialPoolBalance';
        initialPoolBalance.innerText = `Changes % of the initial pool balance: ${percentChanges.toFixed(2)} %`;
		if(percentChanges < -10) {
			initialPoolBalance.style = 'color: red;';
		}
        parentDiv.appendChild(initialPoolBalance);
	}

	// getUsdcPriceHistory('usd-coin');
	// getUsdcPriceHistory('tether');
	getUsdcPriceHistory('ethereum');
	getUsdcPriceHistory('staked-ether');
	// getUsdcPriceHistory('curve-dao-token');


	// getPoolBalance(
	// 	'ethereum',
	// 	'staked-ether',
	// 	'Pancake',
	// 	'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
	// 	'0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
	// 	'0x3a1b97Fc25fA45832F588ED3bFb2A0f74ddBD4F8'
	// );

	// getPoolBalance(
	// 	'ethereum',
	// 	'staked-ether',
	// 	'Curve',
	// 	'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
	// 	'0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
	// 	'0x21E27a5E5513D6e65C4f830167390997aA84843a'
	// );
})()