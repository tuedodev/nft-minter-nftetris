import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";
import {networkConfig} from '../config/network-config';
import { getChainId } from "hardhat";
import fs from 'fs';
import path from 'path';
const PATH = '../nextjs/contracts';
const FILENAME = 'contractValues.json';

type ContractsToDeployType = {
		type: string,
		message: string,
		contracts: {
			contract: string,
			label: string,
			args: string[]
		}[]
	}[]

const deployNFTetris: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { getNamedAccounts, deployments } = hre
	const { deployer } = await getNamedAccounts();
	const { deploy, log } = deployments;
	const chainId = Number(await getChainId());

	let allContracts = {};
	const PATH_FILENAME = path.join(process.cwd(), PATH, FILENAME);

	try {
		if (fs.existsSync(PATH_FILENAME)) {
			allContracts = JSON.parse(fs.readFileSync(PATH_FILENAME).toString());
			log('######### Existing JSON file loaded');
		} else {
			throw new Error('No existing JSON file');
		}
	} catch (err) {
		log('######### No JSON file found. New JSON fill will be generated.');
	}

	log(`######### Deploy the contract(s) on ChainId ${chainId}`);

	const contractsToDeploy: ContractsToDeployType = [
		{
			type: 'erc721',
			message: '####### Deploy contracts of Type ERC721',
			contracts: [
				{
					contract: 'NFTetris',
					label: 'ERC721 (NFTetris)',
					args: ['NFTetris', 'NFTETRIS', '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE'],
				},
			],
		},
	];

	let contracts = {};
	let counter = 0;

	outerBlock: for (let contractType of contractsToDeploy) {
		log(contractType.message);
		let contractsOfOneType = [];
		for (let contract of contractType.contracts) {
			log(`##### Deploy contract ${contract.contract} aka ${contract.label}`);
			try {
				const deployedContract = await deploy(contract.contract, {
					from: deployer,
					log: true,
					args: contract.args,
				});
				log(`### Successfully deployed contract ${contract.contract} to ${deployedContract.address}.`);
				counter++;
				const pathABI = path.join(process.cwd(), PATH, `abi/${contract.contract}.json`);
				let rawdata = fs.readFileSync(pathABI).toString();
				let contractAbi = JSON.parse(rawdata);
				contractsOfOneType.push({
					contractValue: contractType.type,
					contractName: contract.contract,
					contractLabel: contract.label,
					address: deployedContract.address,
					deployer,
					chainId,
					network: networkConfig[chainId]?.name,
					networkScanContract: networkConfig[chainId]?.scanContract,
					networkScanNft: networkConfig[chainId]?.scanNft,
					openSeaLink: `${networkConfig[chainId]?.opensea}/${deployedContract.address}/`,
					nativeCurrency: networkConfig[chainId]?.nativeCurrency,
					contractAbi,
				});
			} catch (error: any) {
				log(`####### An error occured: ${error.message}`);
				break outerBlock;
			}
		}
		contracts = { ...contracts, [contractType.type]: contractsOfOneType };
	}

	allContracts = { ...allContracts, [chainId.toString()]: contracts };
	// Write contractValues.json
	fs.writeFileSync(PATH_FILENAME, JSON.stringify(allContracts));
	log(`##### ${counter} contracts successfully deployed.`);
};

export default deployNFTetris
deployNFTetris.tags = ['all', 'erc721', 'polygonTestnet'];
