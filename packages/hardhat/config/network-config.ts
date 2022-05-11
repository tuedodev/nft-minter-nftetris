type networkConfigType = Record<number, {
	name: string,
	scanContract: string,
	scanNft: string,
	opensea: string,
	nativeCurrency: {
		name: string,
		symbol: string,
		decimals: number,
	}
}>

export const networkConfig: networkConfigType = {
	31337: {
		name: 'localhost',
		scanContract: 'localhost/address/',
		scanNft: 'localhost/tx/',
		opensea: 'https://opensea/',
		nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	},
	43113: {
		name: 'Avalanche Testnet Fuji',
		scanContract: 'https://testnet.snowtrace.io/address/',
		scanNft: 'https://testnet.snowtrace.io/address/',
		opensea: 'https://testnets.opensea.io/assets/avalanche',
		nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
	},
	80001: {
		name: 'Polygon Testnet Mumbai',
		scanContract: 'https://mumbai.polygonscan.com/address/',
		scanNft: 'https://mumbai.polygonscan.com/tx/',
		opensea: 'https://testnets.opensea.io/assets/mumbai',
		nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
	},
};