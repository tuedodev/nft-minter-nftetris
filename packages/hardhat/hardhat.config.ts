import '@nomiclabs/hardhat-waffle';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
require('dotenv').config();
import 'hardhat-abi-exporter';
import { HardhatUserConfig, task } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();
	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
	solidity: '0.8.4',
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {
			chainId: 31337,
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
		},
		localhost: {
			chainId: 31337,
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
		},
		avalancheTestnet: {
			chainId: 43113,
			url: process.env.AVALANCHE_TESTNET_RPC_URL,
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
			saveDeployments: true,
			gas: 5000000,
			gasPrice: 225000000000,
		},
		polygonTestnet: {
			chainId: 80001,
			url: process.env.POLYGON_TESTNET_RPC_URL,
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
			saveDeployments: true,
			gas: 5000000,
			gasPrice: 225000000000,
		},
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
	namedAccounts: {
		deployer: {
			default: 0,
			43113: process.env.AVALANCHE_TESTNET_ACCOUNT_PRIVATE_KEY1 as string,
			80001: process.env.POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY1 as string,
			31337: process.env.HARDHAT_TESTNET_ACCOUNT_PRIVATE_KEY1 as string,
		},
	},
	abiExporter: {
		path: '../nextjs/contracts/abi',
		runOnCompile: true,
		clear: true,
		flat: true,
		only: [],
		spacing: 2,
		pretty: true,
	},
};

export default config
