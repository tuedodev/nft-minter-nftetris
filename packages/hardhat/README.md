[:arrow_left: README.md](../../README.md) of Monorepo root directory

# Hardhat implementation of NFTetris

The hardhat implementation creates the NFTetris Collection, a smart contract that is based on the OpenZeppelin´s [ERC721URIStorage](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) with slight modifications.

## Installation

From the root directory of the monorepo `npm install` or for the hardhat package separately `npm install --workspace=packages/hardhat`.

## Environment Variables

Depending on the network and the respective account, the `.env` file in the root directory of the hardhat package must be modified.

```shell
AVALANCHE_TESTNET_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
POLYGON_TESTNET_RPC_URL=https://matic-mumbai.chainstacklabs.com/
MNEMONIC=' [Here is the mnemonic of your MetaMask accout] '
ETHERSCAN_API_KEY=xxxxxxx
AVALANCHE_TESTNET_ACCOUNT_PRIVATE_KEY1=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AVALANCHE_TESTNET_ACCOUNT_PRIVATE_KEY2=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY1=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY2=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
HARDHAT_TESTNET_ACCOUNT_PRIVATE_KEY1=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Test

`npm run hh_test` from monorepo´s root directory. Uses the Chai and Ethereum Waffle testing environment that is common in Hardhat.

## Compile the contract

`npm run hh_compile` from monorepo´s root directory.

## Deploy the contract on Polygon Testnet Mumbai (Beta-Phase)

`npm run hh_deployPolygon` from monorepo´s root directory. The relevant variables for the RFC and the account must be set in the .env file (and of course have a corresponding credit balance).

## Deploy the contract on Avalanche (Beta-Phase)

NFTetris was originally designed for Avalanche. `npm run hh_deployAvalanche` from monorepo´s root directory. The relevant variables for the RFC and the account must be set in the .env file (and of course have a corresponding credit balance).

## Outlook: Publish NFTs on the Mainnet

NFTetris can be easily configurated for the mainnet.

In ./packages/hardhat/config/network-config.ts:

```
137: {
		name: 'Polygon Mainnet',
		scanContract: 'https://polygonscan.com/address/',
		scanNft: 'https://polygonscan.com/tx/',
		opensea: 'https://opensea.io/assets/mumbai',
		nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
},
```

In ./hardhat.config.ts you need to add the data for the mainnet. **Be careful: the data must be adapted to the respective needs and are subject to constant changes by the network operators.**

```
polygonMainnet: {
			chainId: 137,
			url: 'https://polygon-rpc.com', [don´t hardcode it directly, use environment variables for sensitive data]
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
			saveDeployments: true,
			gas: 5000000,
			gasPrice: 225000000000,
},
```

The deploy file (currently `01_deploy_nftertis.ts`) inside the ./deploy folder needs to be adjusted as well.

:warning: NFTetris is still in beta mode. **Use of the software on the mainnet is at your own risk.**
