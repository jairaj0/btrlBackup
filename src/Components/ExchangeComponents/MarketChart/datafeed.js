import {
	makeApiRequest,
	makeApiRequest1,
	generateSymbol,
	parseFullSymbol,
} from './helpers.js';
/* 
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js'; 
*/

const lastBarsCache = new Map();

const configurationData = {
	supported_resolutions : ["60", "120", "240", "D", "1W", "1M","3M","6M","9M","12M"], 
	exchanges: [ {
		value: 'BTRLExchange',
		name: 'BTRL Exchange',
		desc: 'BTRLExchange',
	}, 
	
	],
	symbols_types: [{
		name: 'crypto',

		// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
		value: 'crypto',
	},
		// ...
	],
};
async function getAllSymbols() {
	//const data = await makeApiRequest('data/v3/all/exchanges');
	//const data = await makeApiRequest1('public/get-trade-pair');
	const data = await makeApiRequest1('get-all-pairs',null);
	let allSymbols = [];
	if(data && data.status===200){
		const pairs = data.data;
		console.log("pairs=>",pairs);
		for (const exchange of configurationData.exchanges) {
			for (let i=0; i < pairs.length; i++ ) {
				const symbol = generateSymbol(exchange.value, pairs[i].currency_symbol, pairs[i].market_symbol);
				const symbols= {
					symbol: symbol.short,
					full_name: symbol.full,
					description: symbol.short,
					exchange: exchange.value,
					type: 'crypto',
				}
				allSymbols = [...allSymbols, symbols];
				
			}
		}
		
	}
	return allSymbols;
}

const abc = {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
		//callback(configurationData);
	},
	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call',userInput,exchange);
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			//console.log('symbol.full_name=>',symbol.full_name);
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
	) => {
		console.log('[resolveSymbol]: Method call', symbolName);
		const symbols = await getAllSymbols();
		//console.log("symbols=>",symbols);
		const symbolItem = symbols.find(({
			full_name,
		}) => full_name === symbolName);
		if (!symbolItem) {
			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		const symbolInfo = {
			ticker: symbolItem.full_name,
			name: symbolItem.symbol,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 100,
			has_intraday: false,
			has_no_volume: true,
			has_weekly_and_monthly: true,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 2,
			data_status: 'streaming',
		};

		//console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
		console.log("symbolInfo",symbolInfo, "resolution",resolution,"from", from, "to",to, "firstDataRequest",firstDataRequest,'onHistoryCallback',onHistoryCallback ,'onErrorCallback',onErrorCallback)
		//console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
		const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
		//console.log("parsedSymbol=>",parsedSymbol);
		const urlParameters = {
			exchange: parsedSymbol.exchange,
			currency: parsedSymbol.fromSymbol,
			market: parsedSymbol.toSymbol,
			time: to,
			limit: 2000,
			resolution:resolution,
		};
		const query = Object.keys(urlParameters)
			.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
			.join('&');
		try {
			//const data = await makeApiRequest(`data/histoday?${query}`);
			const data = await makeApiRequest1(`get-bars`,query);
			if ((data.status && data.status !== 200) || data.data.length === 0) {
				// "noData" should be set if there is no data in the requested period.
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			let bars = [];

			data.data.forEach(bar => {
				if (Number(bar.time) >= from.from && Number(bar.time) < from.to) {
					// console.log("bar.time->",bar.time);
					// console.log("from->",from);
					// console.log("to->",to);
					/* bars = [...bars, {
						time: bar.time * 1000,
						low: bar.low,
						high: bar.high,
						open: bar.open,
						close: bar.close,
						volume: bar.volume,
					}]; */
					
					var l1=typeof bar.low === 'number'?bar.low:Number(bar.low);
					var h1=typeof bar.high === 'number'?bar.high:Number(bar.high);
					var o1=typeof bar.open === 'number'?bar.open:Number(bar.open);
					var c1=typeof bar.close === 'number'?bar.close:Number(bar.close);
					var v1=typeof bar.volume === 'number'?bar.volume:Number(bar.volume);
					
					bars = [...bars, {
						time: Number(bar.time) * 1000,
						low: l1,
						high: h1,
						open: o1,
						close: c1,
						volume:v1
					}];
					
				}
			});
			if (firstDataRequest) {
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			}
			console.log("[getBars]: returned" , bars)
			onHistoryCallback(bars, {
				noData: false,
			});
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	/* subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscribeUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	}, */
}

export default abc;
