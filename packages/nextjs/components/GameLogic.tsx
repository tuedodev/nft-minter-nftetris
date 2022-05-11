import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Chip, Link, Typography, useTheme } from '@mui/material';
import useResizeObserver from '@react-hook/resize-observer';
import { ethers } from 'ethers';
import React, { ReactElement, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	ADD_SCORE,
	COLUMNS,
	DEFAULT_CHAIN,
	ERROR_MESSAGES,
	INITIAL_COUNTER_VALUE,
	MAX_COUNTER,
	MESSAGE,
	ROWS,
	SVG_DECLARATION,
	TRANSACTION_OPTIONS,
	UNIT_INITIAL_VALUE,
} from '../config/constants';
import { COLORS } from '../config/cssColors';
import { itemsConfigFunction } from '../config/itemsConfigFunction';
import contractValues from '../contracts/contractValues.json';
import { useWeb3 } from '../hooks/useWeb3';
import {
	clearMatrix,
	getAvailableContractsOrdered,
	promiseWrapper,
	rotationIndexNormalized,
	sleep,
	storeBlob,
} from '../lib/helper';
import {
	AnimationType,
	changeContractHandlerProps,
	DialogBoxContentType,
	DialogBoxType,
	DirectionType,
	IntervalQueueType,
	ItemObjectType,
	ItemType,
	MatrixType,
	PointType,
	reducerActionType,
} from '../types/game';
import { SimpleTableDataType } from '../types/main';
import AnimationsItem from './AnimationsItem';
import ImageContainer from './content/ImageContainer';
import ErrorInstallMetaMask from './content/infoboxes/ErrorInstallMetaMask';
import InfoboxTable from './content/infoboxes/InfoboxTable';
import Cookie from './Cookie';
import { GameContext } from './GameContext';
import GameHeader from './GameHeader';
import ModalDialog from './ModalDialog';
import NFTetrisAppBar from './NFTetrisAppBar';
import NFTetrisNetwork from './NFTetrisNetwork';
import SimpleGrid from './SimpleGrid';
import StaticFooter from './StaticFooter';
import TetrisCanvas from './TetrisCanvas';
import { useRouter } from 'next/router';
import ConnectWithMetaMask from './content/infoboxes/ConnectWithMetaMask';
import { JsxElement } from 'typescript';

function reducer(state: Record<string, any>, action: reducerActionType) {
	switch (action.type) {
		case 'addNewItem':
			if (action.payload?.nextItem) {
				const item = state.nextItem;
				let newItemArray = state.itemArray;
				newItemArray.push(item);
				return { ...state, itemArray: newItemArray, nextItem: action.payload.nextItem };
			}
			return state;
		case 'updateCurrentItem':
			if (action.payload?.update) {
				let currentItemArray = state.itemArray;
				currentItemArray.pop();
				currentItemArray.push(action.payload.update);
				return { ...state, itemArray: currentItemArray };
			}
			return state;
		case 'updateNextItem':
			if (action.payload?.update) {
				const item = state.nextItem;
				let currentItemArray = state.itemArray;
				currentItemArray.pop();
				currentItemArray.push(item);
				return { ...state, itemArray: currentItemArray, nextItem: action.payload?.update };
			}
			return state;
		case 'setCounter':
			if (action.payload?.counter || action.payload?.counter === 0) {
				return { ...state, counter: action.payload.counter };
			}
			return state;
		case 'decreaseCounter':
			var newCounter = state.counter;
			if (newCounter > 0) {
				newCounter--;
			}
			return { ...state, counter: newCounter };
		case 'increaseCounter':
			return { ...state, counter: state.counter + 1 };
		case 'addScore':
			if (typeof action.payload?.score !== 'undefined') {
				let currentScore = state.score;
				return { ...state, score: currentScore + action.payload.score };
			}
			return state;
		case 'updateStateValue':
			if (
				typeof action.payload !== 'undefined' &&
				action.payload.hasOwnProperty('path') &&
				action.payload.hasOwnProperty('newValue')
			) {
				const { path, newValue } = action.payload;
				if (typeof path === 'string' && typeof newValue !== 'undefined') {
					const explode = path.split('.');
					const key = explode.pop() || '';
					const lastBranch: Record<string, any> = explode.reduce((acc, cv) => {
						return typeof acc[cv] === 'undefined' ? {} : acc[cv];
					}, state);
					lastBranch[key] = newValue;
				}
			}
			return state;
		default:
			throw new Error('Error in App`s reducer.');
	}
}

type GameLogicPropsType = {
	value: string;
	encoded: string;
};
const GameLogic = (props: GameLogicPropsType) => {
	const theme = useTheme();
	const web3 = useWeb3();
	const stateRef = useRef<Record<string, any> | null>(null);
	const canvasRef = useRef<HTMLDivElement>(null);
	const intervalQueueRef = useRef<IntervalQueueType | null>(null);
	const scoreRef = useRef(null) as React.RefObject<HTMLElement>;
	const containerRef = useRef(null) as React.RefObject<HTMLDivElement>;
	const contractValuesArray: { [key: string]: any } = Array.from(Object.entries(contractValues[DEFAULT_CHAIN])); /// DEBUG MODE
	const availableContracts = getAvailableContractsOrdered(contractValuesArray);
	let currentContractIndex: number | undefined = availableContracts.length > 0 ? 0 : undefined;
	const network = typeof currentContractIndex !== 'undefined' ? availableContracts[currentContractIndex].network : null;
	const currentContract = typeof currentContractIndex !== 'undefined' ? availableContracts[currentContractIndex] : null;
	const fingerprint = props;

	let unit = UNIT_INITIAL_VALUE;
	const itemsConfig: { [key: string]: any } = useMemo(() => {
		return itemsConfigFunction(unit);
	}, [unit]);

	const SPEED = {
		DEFAULT: {
			get intervalObject() {
				return {
					interval: 600,
					fn: moveDown,
					start: null,
				};
			},
		},
		FAST: {
			get intervalObject() {
				return {
					interval: 350,
					fn: moveDown,
					start: null,
				};
			},
		},
	};

	const deployListArray = [
		{
			labelText: 'Check whether suitable NFT Collection Contract (ERC721 or ERC1155) is available.',
			helperText: '',
			status: '',
			msgComponent: null,
			task: (data?: Record<string, any>) => {
				return new Promise((resolve, reject) => {
					const isAvailable = data && typeof data.currentContractIndex !== 'undefined' && currentContract;
					setTimeout(() => {
						if (isAvailable) {
							const LinkElement = () =>
								React.createElement(
									Link,
									{
										href: `${data.currentContract.networkScanContract}${data.currentContract.address}`,
										variant: 'body2',
										color: 'link',
										target: '_blank',
										rel: 'noopener noreferrer',
									},
									`${data.currentContract.address}`
								);
							let tableData = [
								{
									values: ['Contract Type:', data.currentContract.contractName],
									sx: undefined,
								},
								{
									values: ['Contract Address:', <LinkElement />],
									sx: { '& td:nth-of-type(1)': { paddingLeft: 0 }, '& td:nth-of-type(2)': { wordBreak: 'break-all' } },
								},
							];
							if (data.currentContract.network) {
								tableData.push({
									values: ['Network:', data.currentContract.network],
									sx: undefined,
								});
							}
							let msgComponent = React.createElement(InfoboxTable, { tableData }, null);
							let resolveData = {
								status: 'SUCCESS',
								index: 0,
								helperText: `The ${data.currentContract.contractName} NFT collection contract is deployed and hence available.`,
								msgComponent,
							};
							resolve(resolveData);
						} else {
							reject({ index: 0, status: 'ERROR', helperText: ERROR_MESSAGES.NO_CONTRACT });
						}
					}, 1000);
				});
			},
		},
		{
			labelText: 'Check if MetaMask is installed.',
			helperText: '',
			status: '',
			msgComponent: null,
			task: (data?: Record<string, any>) => {
				return new Promise((resolve, reject) => {
					web3.updateStatus();
					if (web3.isMetaMaskInstalled) {
						resolve({ status: 'SUCCESS', index: 1, helperText: MESSAGE.METAMASK_INSTALLED });
					} else {
						reject({
							status: 'ERROR',
							index: 1,
							helperText: ERROR_MESSAGES.NO_METAMASK_INSTALLED,
							msgComponent: React.createElement(ErrorInstallMetaMask, { message: MESSAGE.NEED_METAMASK }),
						});
					}
				});
			},
		},
		{
			labelText: `Connect to ${network}.`,
			helperText: '',
			status: '',
			msgComponent: null,
			task: (data?: Record<string, any>) => {
				return new Promise(async (resolve, reject) => {
					try {
						let contractNetwork = (await web3.getMetaMaskData()) as Record<string, any>; //{networkName: string, signerChainId: number, signerAddress: string, isUnlocked: boolean, signerBalance: string, signerBalanceInEth: string };
						const BtnElement = () => React.createElement(ConnectWithMetaMask, {}, null);
						const mandatoryFields: {
							property: string;
							label: string;
							test: Function;
							errorMsg: string;
							btnComponent?: ReactElement;
						}[] = [
							{
								property: 'signerChainId',
								label: 'Chain-Id',
								test: function (value: number): boolean {
									return value === data!.currentContract.chainId;
								},
								errorMsg: `Network in MetaMask does not correspond to the network of the present contract.`,
							},
							{
								property: 'networkName',
								label: 'Network Short Name',
								test: function (value: string): boolean {
									return !(value.toLowerCase().indexOf('unknown') > -1);
								},
								errorMsg: 'You are connected to an unknown or unsupported network.',
							},
							{
								property: 'networkFullName',
								label: 'Network Full Name',
								test: function (value: string): boolean {
									return !(value.toLowerCase().indexOf('unknown') > -1);
								},
								errorMsg: 'You are connected to an unknown or unsupported network.',
							},
							{
								property: 'isUnlocked',
								label: 'Is Account unlocked?',
								test: function (value: boolean): boolean {
									return value;
								},
								errorMsg: 'You need to unlock your account inside MetaMask and/or connect this site with MetaMask.',
								btnComponent: <BtnElement />,
							},
							{
								property: 'signerAddress',
								label: 'Signer Address',
								test: function (value: string): boolean {
									return value.length > 0;
								},
								errorMsg: 'There is a problem with your account inside MetaMask.',
							},
							{
								property: 'signerBalance',
								label: 'Signer Balance',
								test: function (value: string): boolean {
									return value.length > 0;
								},
								errorMsg: 'There is a problem with your account inside MetaMask.',
							},
							{
								property: 'signerBalanceInEth',
								label: `Signer Balance (in ${data!.currentContract.nativeCurrency.symbol ?? 'ETH'})`,
								test: function (value: string): boolean {
									return parseFloat(value) > 0.00001;
								},
								errorMsg: 'Your balance is less than 0.00001 [ETH] or 10000 Gwei.',
							},
						];
						let tableData: SimpleTableDataType[] = [];
						let msgComponent: ReactElement | undefined;
						let resolveObj: Record<string, any> | undefined;
						const promiseArray = mandatoryFields.map((field, index) => {
							const additionalMsg = typeof field.btnComponent !== 'undefined' ? field.btnComponent : null;
							return new Promise((resolve, reject) => {
								if (
									contractNetwork.hasOwnProperty(field.property) &&
									typeof contractNetwork[field.property] !== 'undefined'
								) {
									const testResult = field.test.call(null, contractNetwork[field.property]);

									const Icon = testResult ? (
										<CheckCircleIcon sx={{ fontSize: '26px', color: 'success.main' }} />
									) : (
										<ErrorIcon sx={{ fontSize: '26px', color: 'error.main' }} />
									);
									tableData.push({
										values: [
											(index + 1).toString(),
											field.label,
											normalizeString({ value: contractNetwork[field.property] }),
											Icon,
										],
										sx: {
											'& td:nth-of-type(1)': { paddingRight: 1 },
											'& td:nth-of-type(3)': { wordBreak: 'break-all', textAlign: 'right', paddingRight: '8px' },
											'& td:nth-of-type(4)': { textAlign: 'center' },
										},
									});
									if (testResult) {
										resolve({ key: field, value: contractNetwork[field.property], index });
									} else {
										reject({
											key: field,
											value: contractNetwork[field.property],
											index,
											errorMsg: field.errorMsg,
											additionalMsg: additionalMsg,
										});
									}
								} else {
									reject({ key: field, value: contractNetwork[field.property], index, additionalMsg: additionalMsg });
								}
							});
						});

						Promise.all(promiseArray)
							.then(() => {
								resolveObj = {
									index: 2,
									status: 'SUCCESS',
									helperText: `Successfully connected to ${network}.`,
									payload: { contractNetwork },
								};
							})
							.catch((reason: any) => {
								const { index } = reason as { index: number };
								tableData = tableData.slice(0, index + 1);
								resolveObj = {
									index: 2,
									status: 'ERROR',
									helperText: reason.errorMsg,
									additionalMsg: reason.additionalMsg,
								};
							})
							.finally(() => {
								msgComponent = React.createElement(
									InfoboxTable,
									{ tableData, spacing: 0, alignment: ['left', 'left', 'right', 'right'] },
									null
								);
								resolveObj = { ...resolveObj, msgComponent };
								if (resolveObj && resolveObj.status !== 'ERROR') {
									resolve(resolveObj);
								} else {
									reject(resolveObj);
								}
							});
					} catch (err) {
						reject({ status: 'ERROR', index: 2, helperText: `Unable to connect to ${network}.` });
					}
				});
			},
		},
		{
			labelText: 'Decentralised storage of your SVG image on the InterPlanetary File System (IPFS) using NFT.storage',
			helperText: '',
			status: '',
			msgComponent: null,
			task: (data?: Record<string, any>) => {
				const { nameContract, description, gameData } = data as {
					nameContract: string;
					description: string;
					gameData: DialogBoxContentType;
				};
				const { svgString } = gameData || null;
				return new Promise(async (resolve, reject) => {
					if (svgString) {
						let [ipfs, _] = await promiseWrapper(storeBlob({ image: svgString }));
						if (ipfs) {
							const ipsfLink = `ipfs://${ipfs}`;
							const dataJson = createJsonString(gameData, nameContract, description, ipsfLink);
							const dataEncoded = `data:application/json;base64,${btoa(dataJson)}`;

							const SVGImage = () =>
								React.createElement(ImageContainer, null, <img alt="svg small" src={gameData.imgBase64Encoded} />);

							const data1 = (
								<>
									<Typography
										variant="body2"
										sx={{ fontSize: theme.typography.body2.fontSize, color: theme.palette.text.disabled, mb: 2 }}
									>
										{MESSAGE.IPFS_PUBLISHED}
									</Typography>
									<Link href={ipsfLink} underline="none" target="_blank" rel="noopener noreferrer">
										<Chip label="Link to IPSF" clickable sx={{ mb: 2, backgroundColor: '#64b5f6' }} />
									</Link>
								</>
							);
							const data2 = (
								<>
									<Typography
										variant="body2"
										sx={{ mt: 2, fontSize: theme.typography.body2.fontSize, color: theme.palette.text.disabled }}
									>
										{MESSAGE.LINK_ACTIVE}
									</Typography>
									<Typography
										variant="body2"
										sx={{ fontSize: theme.typography.body2.fontSize, color: theme.palette.text.disabled }}
									>
										{MESSAGE.IPFS_BROWSER}
									</Typography>
								</>
							);
							let tableData = [{ values: [data1] }, { values: [data2] }];
							let msgComponent = React.createElement(
								InfoboxTable,
								{ tableData, spacing: 0, alignment: ['center'], sx: { m: 0, p: 0 } },
								null
							);
							let gridTable = [
								{
									value: <SVGImage />,
									xs: 3,
									sx: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start' },
								},
								{ value: msgComponent, xs: 9 },
							];
							let outerMsgComponent = React.createElement(SimpleGrid, { tableData: gridTable, spacing: 0 }, null);
							resolve({
								index: 3,
								status: 'SUCCESS',
								msgComponent: outerMsgComponent,
								payload: { ipfs, ipsfLink, dataEncoded, dataJson },
							});
						} else {
							reject({ index: 3, status: 'ERROR', helperText: ERROR_MESSAGES.IPFS });
						}
					} else {
						reject({ index: 3, status: 'ERROR', helperText: ERROR_MESSAGES.IPFS });
					}
				});
			},
		},
		{
			labelText: `Minting your NFT on ${network}`,
			helperText: 'Please confirm the minting transaction on your MetaMask pop-up dialog. This can take a while.',
			status: '',
			msgComponent: null,
			task: (data?: Record<string, any>) => {
				const { currentContract, contractNetwork, dataEncoded } = data as {
					currentContract: Record<string, any>;
					gameData: DialogBoxContentType;
					contractNetwork: Record<string, any>;
					ipfs: string;
					dataEncoded: string;
				};
				const { address: contractAddress, contractAbi } = currentContract;
				const { signer } = contractNetwork;
				return new Promise(async (resolve, reject) => {
					if (contractNetwork && signer && contractAddress && contractAbi && web3) {
						const contract = web3.getContract(contractAddress, contractAbi, signer);
						if (contract) {
							const promise1 = new Promise<Record<string, any>>((resolve, reject) => {
								contract.once('CreatedSVG_NFT', function (tokenId, tokenURI, event) {
									try {
										const tokenIdNumber = ethers.BigNumber.from(tokenId).toBigInt();
										resolve({ tokenId: tokenIdNumber, tokenURI, event });
									} catch (err: any) {
										reject(ERROR_MESSAGES.NO_TOKENID);
									}
								});
							});
							const promise2 = new Promise<Record<string, any>>(async (resolve, reject) => {
								const [tx, _] = await promiseWrapper(contract.mintNFT(dataEncoded, TRANSACTION_OPTIONS));
								if (tx) {
									const [transactionReceipt, _] = await promiseWrapper(tx.wait(1));
									if (transactionReceipt) {
										resolve({ tx, transactionReceipt });
									} else {
										reject(ERROR_MESSAGES.MISSING_TX_RECEIPT);
									}
								} else {
									reject(ERROR_MESSAGES.MISSING_TX_DETAILS);
								}
							});

							Promise.all([promise1, promise2])
								.then((values: Array<Record<string, any>>) => {
									resolve({
										index: 4,
										status: 'SUCCESS',
										helperText: `Your NFT was successfully deployed on ${network}.`,
										payload: {
											...values[0],
											transactionDetails: values[1].tx,
											transactionReceipt: values[1].transactionReceipt,
										},
									});
								})
								.catch((reason) => {
									reject({ index: 4, status: 'ERROR', helperText: reason });
								});
						} else {
							reject({ index: 4, status: 'ERROR', helperText: `Minting of the NFT on ${network} failed.` });
						}
					} else {
						reject({ index: 4, status: 'ERROR', helperText: `Minting of the NFT on ${network} failed.` });
					}
				});
			},
		},
	];
	let currentDeployList = [...deployListArray];

	function normalizeString(props: { value: any; maxLength?: number }): string {
		let { value, maxLength } = props;
		if (typeof value === 'boolean') {
			value = value ? 'Yes' : 'No';
		}
		if (typeof value === 'number') {
			value = value.toString();
		}
		if (typeof maxLength !== 'undefined') {
			value = value.length <= maxLength ? value : `${value.substr(0, maxLength - 1)} ...`;
		}
		return value;
	}

	function changeContractHandler(props: changeContractHandlerProps) {
		const { value } = props;
		const valueInt = parseInt(value);
		dispatch({ type: 'updateStateValue', payload: { path: 'currentContractIndex', newValue: valueInt } });
	}

	useResizeObserver(canvasRef, (entry) => {
		unit = entry.contentRect?.width / COLUMNS;
		dispatch({ type: 'updateStateValue', payload: { path: 'unit', newValue: unit } });
	});

	const intervalQueueInit: IntervalQueueType = [
		SPEED.DEFAULT.intervalObject,
		{
			interval: 1000,
			fn: counterHandler,
			start: null,
		},
	];

	function moveDown() {
		const itemArray = stateRef.current?.itemArray as ItemObjectType[];
		if (itemArray.length > 0) {
			let item = itemArray[itemArray.length - 1];
			let { y } = item;
			const { width, height } = getItemSize(item.variant, item.rotationIndex);
			if (movementPossible('down')) {
				item = { ...item, y: y + 1 };
				dispatch({ type: 'updateCurrentItem', payload: { update: item } });
			} else {
				transferItemToMatrix(item);
				checkCanvas();
				if (checkSpace()) {
					startNewItem();
				} else {
					let nextItem = stateRef.current?.nextItem;
					nextItem!.y -= 1;
					dispatch({ type: 'addNewItem', payload: { nextItem: stateRef.current?.nextItem } });
					dispatch({ type: 'updateStateValue', payload: { path: 'isCounting', newValue: false } });
					gameOver();
				}
			}
		}
	}

	function movementPossible(direction: DirectionType, itemParam?: ItemObjectType): boolean {
		const itemArray = stateRef.current?.itemArray as ItemObjectType[];
		let item = itemParam ? itemParam : (itemArray[itemArray.length - 1] as ItemObjectType);
		const ROUTE: { [key: string]: PointType } = {
			left: { x: -1, y: 0 },
			right: { x: 1, y: 0 },
			down: { x: 0, y: 1 },
			downdown: { x: 0, y: 2 },
			intersect: { x: 0, y: 0 },
		};
		const { x: realX, y: realY, rotationIndexNorm } = getRealPositionInArray(item!);
		const pattern: Array<Array<number>> = itemsConfig[item!.variant].values[rotationIndexNorm].pattern;
		const { width, height } = getItemSize(item!.variant, item!.rotationIndex);
		let matrix = stateRef.current?.matrix;
		let intersectionArray: boolean[] = [];
		let newX = realX + ROUTE[direction].x;
		let newY = realY + ROUTE[direction].y;
		if (isInsideArray(matrix!, newX, newY)) {
			for (let patternY = 0; patternY < height; patternY++) {
				let insideY = newY + patternY;
				for (let patternX = 0; patternX < width; patternX++) {
					let insideX = newX + patternX;
					if (isInsideArray(matrix!, insideX, insideY)) {
						if (matrix![insideY][insideX].status > 0 && pattern[patternY][patternX] > 0) {
							intersectionArray.push(false);
						}
					} else {
						intersectionArray.push(false);
					}
				}
			}
		} else {
			if (newX < 0 || newX >= COLUMNS) {
				intersectionArray.push(false);
			}
			if (newY + Math.abs(width - height) >= ROWS) {
				intersectionArray.push(false);
			}
		}
		return intersectionArray.map((x) => !x).length === 0;
	}

	function isInsideArray(matrix: MatrixType, x: number, y: number): boolean {
		return matrix[y] !== undefined && matrix[y][x] !== undefined;
	}

	function checkCanvas() {
		let matrix: MatrixType = stateRef.current?.matrix;
		let rowsArray = matrix!.map((row) => row.map((column) => column).filter((x) => x.status > 0).length);
		let rowsArrayFiltered = rowsArray
			.map((r, i) => ({ len: r, rownumber: i }))
			.filter((row) => row.len === COLUMNS)
			.map((r) => r.rownumber);
		if (rowsArrayFiltered.length > 0) {
			let newMatrix: MatrixType = Array.from({ length: rowsArrayFiltered.length }, (x) =>
				Array.from({ length: COLUMNS }, (y) => ({ status: 0, colorFill: '' }))
			);
			matrix!.forEach((row, index, array) => {
				if (!rowsArrayFiltered.includes(index)) {
					newMatrix.push(row);
				}
			});
			startAnimation(rowsArrayFiltered);
			dispatch({ type: 'updateStateValue', payload: { path: 'matrix', newValue: newMatrix } });
		}
	}

	function startAnimation(rowsArray: Array<number>) {
		let currentAnimations = stateRef.current!.animations;
		let text =
			stateRef.current!.speed.interval === SPEED.FAST.intervalObject.interval
				? (ADD_SCORE * 2).toString()
				: ADD_SCORE.toString();
		const containerClientRect = containerRef.current!.getBoundingClientRect();
		const scoreClientRect = scoreRef.current!.getBoundingClientRect();
		const scrollY = window ? window.scrollY : 0;
		const scrollX = window ? window.scrollX : 0;
		let animations = rowsArray.map((row) => {
			return {
				text,
				y: row * stateRef.current!.unit + containerClientRect.top + scrollY,
				unit: stateRef.current!.unit,
				targetX: scoreClientRect.left - containerClientRect.left + scoreClientRect.width / 2 + scrollX,
				targetY: scoreClientRect.top - containerClientRect.top + scoreClientRect.height / 2 + scrollY,
				key: uuidv4(),
			};
		});
		dispatch({
			type: 'updateStateValue',
			payload: { path: 'animations', newValue: [...currentAnimations, ...animations] },
		});
	}

	function checkSpace(): boolean {
		let item = stateRef.current?.nextItem;
		if (item) {
			return (
				movementPossible('intersect', item) && movementPossible('down', item) /*&& movementPossible('downdown', item)*/
			);
		}
		return true;
	}

	function transferItemToMatrix(item: ItemObjectType) {
		let { x, y, rotationIndexNorm } = getRealPositionInArray(item);
		let { pattern } = itemsConfig[item.variant].values[rotationIndexNorm];
		let newMatrix = stateRef.current?.matrix!; //state.matrix;
		let row = y;
		for (let i = 0; i < pattern.length; i++) {
			let col = x;
			for (let j = 0; j < pattern[0].length; j++) {
				if (isInsideArray(newMatrix, col + j, row + i)) {
					let obj = pattern[i][j] > 0 ? { status: 1, colorFill: item.colorFill } : newMatrix[row + i][col + j];
					newMatrix[row + i][col + j] = obj;
				}
			}
		}
		dispatch({ type: 'updateStateValue', payload: { path: 'matrix', newValue: newMatrix } });
	}

	function getRealPositionInArray(item: ItemObjectType) {
		let rotationIndexNorm = rotationIndexNormalized(item.rotationIndex);
		let rotationIndexNorm_zero_one = rotationIndexNorm % 2 && 1; // Index either 0 or 1
		let differenceHeight =
			itemsConfig[item.variant].values[0].pattern.length -
			itemsConfig[item.variant].values[rotationIndexNorm_zero_one].pattern.length;
		return {
			x: item.x,
			y: item.y + differenceHeight,
			rotationIndexNorm,
			rotationIndexNorm_zero_one,
		};
	}

	const [state, dispatch] = useReducer(reducer, {
		itemArray: [],
		nextItem: getNewItem(),
		matrix: clearMatrix({ rows: ROWS, columns: COLUMNS }),
		counter: INITIAL_COUNTER_VALUE,
		score: 0,
		unit,
		speed: SPEED.DEFAULT.intervalObject,
		isCounting: false,
		fingerprint,
		currentContractIndex,
		appSettings: { dialogBox: '', dialogBoxContent: {}, startTime: 0 },
		animations: [],
	});

	let currentItemInit: ItemObjectType = getNewItem();

	function startNewItem() {
		const nextItem = getNewItem();
		dispatch({ type: 'addNewItem', payload: { nextItem } });
	}

	function init() {
		dispatch({
			type: 'updateStateValue',
			payload: { path: 'matrix', newValue: clearMatrix({ rows: ROWS, columns: COLUMNS }) },
		});
		dispatch({ type: 'setCounter', payload: { counter: INITIAL_COUNTER_VALUE } });
		dispatch({ type: 'updateStateValue', payload: { path: 'speed', newValue: SPEED.DEFAULT.intervalObject } });
		currentDeployList = [...deployListArray];
		const appSettings = { dialogBox: 'init' as DialogBoxType, dialogBoxContent: {}, startTime: 0 };
		dispatch({ type: 'updateStateValue', payload: { path: 'appSettings', newValue: appSettings } });
		dispatch({ type: 'updateStateValue', payload: { path: 'animations', newValue: [] } });
		dispatch({ type: 'updateStateValue', payload: { path: 'score', newValue: 0 } });
		const nextItem = getNewItem();
		stateRef.current = state;
		dispatch({ type: 'updateStateValue', payload: { path: 'nextItem', newValue: nextItem } });
	}

	function startHandler() {
		const nextItem = getNewItem();
		dispatch({ type: 'updateStateValue', payload: { path: 'appSettings.startTime', newValue: Date.now() / 1000 } });
		dispatch({ type: 'addNewItem', payload: { nextItem } });
		dispatch({ type: 'updateStateValue', payload: { path: 'isCounting', newValue: true } });
		dispatch({ type: 'updateStateValue', payload: { path: 'timestamp', newValue: Date.now() } });
		intervalQueueRef.current = intervalQueueInit;
	}

	function counterHandler() {
		let counter = stateRef.current!.counter;
		if (counter < MAX_COUNTER) {
			dispatch({ type: 'increaseCounter' });
		} else {
			dispatch({ type: 'updateStateValue', payload: { path: 'isCounting', newValue: false } });
			gameOver();
		}
	}

	function speedHandler(value: boolean) {
		let newSpeed = value ? SPEED.FAST.intervalObject : SPEED.DEFAULT.intervalObject;
		dispatch({ type: 'updateStateValue', payload: { path: 'speed', newValue: newSpeed } });
	}

	async function modalDialogHandler(obj: { value: string; data: any }) {
		const { value, data } = obj;
		switch (value) {
			case 'game-over':
				dispatch({
					type: 'updateStateValue',
					payload: { path: 'appSettings', newValue: { ...state.appSettings, dialogBox: 'game-over' } },
				});
				break;
			case 'init':
				dispatch({
					type: 'updateStateValue',
					payload: { path: 'appSettings', newValue: { ...state.appSettings, dialogBox: '' } },
				});
				startHandler();
				break;
			case 'deploy':
				let currentContractIndex =
					typeof data.formInput.contract?.value !== 'undefined' ? parseInt(data.formInput.contract.value) : undefined;
				let currentContract =
					typeof currentContractIndex !== 'undefined' ? availableContracts[currentContractIndex] : null;
				let deployData = {
					currentContractIndex,
					currentContract,
					nameContract: data.formInput.nameContract.value,
					description: data.formInput.description.value,
					gameData: data,
				};
				dispatch({
					type: 'updateStateValue',
					payload: { path: 'appSettings', newValue: { ...state.appSettings, dialogBox: 'process-deployment' } },
				});
				setContext((prev) => ({
					...prev,
					isDeploying: true,
				}));

				let [success, _] = await promiseWrapper(loopThroughList(deployData));
				const noError = typeof success !== 'undefined';
				setContext((prev) => ({
					...prev,
					isDeploying: false,
					isDeployed: noError,
					dataObj: data,
				}));
				if (
					success &&
					(success as { status: string }).status === 'SUCCESS' &&
					(success as { counter: number }).counter === currentDeployList.length
				) {
					sleep(3000).then(() => {
						dispatch({
							type: 'updateStateValue',
							payload: { path: 'appSettings', newValue: { ...state.appSettings, dialogBox: 'nft-minted' } },
						});
						context.dialogBoxContent.handler!.call(null, {
							value: 'nft-minted',
							data: (success as { data: Record<string, any> }).data,
						});
					});
				}
				break;
			case 'redeploy':
				currentDeployList = [...deployListArray];
				setContext((prev) => ({
					...prev,
					dialogBoxContent: { ...prev.dialogBoxContent, deployList: [...currentDeployList] },
				}));

				dispatch({
					type: 'updateStateValue',
					payload: { path: 'appSettings', newValue: { ...state.appSettings, dialogBox: 'deploy' } },
				});
				context.dialogBoxContent.handler!.call(null, { value: 'deploy', data });
				break;
			case 'nft-minted':
				const openSeaLink = `${data.currentContract.openSeaLink}${data.tokenId}`;
				const imgBase64Encoded = data.gameData.imgBase64Encoded;
				const { network, networkScanContract, networkScanNft, nativeCurrency } = data.currentContract;
				const { symbol: currencySymbol } = nativeCurrency;
				const { ipsfLink } = data;
				setContext((prev) => ({
					...prev,
					dialogBoxContent: {
						...prev.dialogBoxContent,
						transactionReceipt: data.transactionReceipt,
						transactionDetails: data.transactionDetails,
						imgBase64Encoded,
						currencySymbol,
						ipsfLink,
						openSeaLink,
						network,
						networkScanContract,
						networkScanNft,
						tokenId: data.tokenId,
					},
				}));
				break;
			default:
				break;
		}
	}

	async function loopThroughList(data?: Record<string, any>) {
		return new Promise(async (resolve, reject) => {
			let counter = 0;
			let taskLoopWithoutError = true;
			while (taskLoopWithoutError && counter < currentDeployList.length) {
				let [result, error] = await promiseWrapper(callTaskFunction(currentDeployList[counter].task, counter, data));
				let updateData: Record<string, any> = result || error;
				let payload = result ? updateData.payload : {};
				data = { ...data, ...payload };
				updateDeployItem(
					{
						status: updateData.status,
						helperText: updateData.helperText,
						msgComponent: updateData.msgComponent,
						additionalMsg: updateData.additionalMsg,
					},
					updateData.index
				);
				counter++;
				if (error) {
					taskLoopWithoutError = false;
					sleep(800)
						.then(() => {
							for (let i = counter; i < currentDeployList.length; i++) {
								setTimeout(function () {
									updateDeployItem({ status: 'PENDING', helperText: '' }, i);
									setTimeout(function () {
										updateDeployItem(
											{ status: 'CANCELED', helperText: 'Operation canceled due to previous error.' },
											i
										);
									}, 1000);
								}, (i - counter + 1) * 1000);
							}
						})
						.then(() => {
							const errorDelay = (currentDeployList.length - counter + 1) * 800;
							sleep(errorDelay).then(() => reject(counter));
						});
				}
			}
			if (taskLoopWithoutError) {
				resolve({
					status: 'SUCCESS',
					counter,
					data,
				});
			}
		});
	}
	async function callTaskFunction(fn: Function, index: number, data: Record<string, any> | undefined) {
		updateDeployItem({ status: 'PENDING' }, index);
		let resultObj = await fn.call(null, data);
		return new Promise((resolve, reject) => {
			if (resultObj.status === 'SUCCESS') {
				resolve(resultObj);
			} else {
				reject(resultObj);
			}
		});
	}

	function updateDeployItem(obj: Object, index: number) {
		currentDeployList[index] = { ...currentDeployList[index], ...obj };
		currentDeployList = currentDeployList.map((currentObj, currentIndex) => {
			if (currentIndex === index) {
				return { ...currentObj, ...obj };
			} else {
				return currentObj;
			}
		});
		setContext((prev) => ({
			...prev,
			dialogBoxContent: { ...context.dialogBoxContent, deployList: [...currentDeployList] },
		}));
	}

	function animationEndHandler(object: { scoreValue: string; key: string }): void {
		const { scoreValue, key } = object;
		let parsedInt = parseInt(scoreValue, 10);
		parsedInt = isNaN(parsedInt) ? 0 : parsedInt;
		let newAnimations = (stateRef.current!.animations as AnimationType).filter((x) => x.key !== key);
		dispatch({ type: 'addScore', payload: { score: parsedInt } });
		removeAnimations(key);
	}

	function removeAnimations(key: string) {
		let currentAnimations: AnimationType = state.animations;
		currentAnimations = currentAnimations.filter((x) => x.key !== key);
		dispatch({ type: 'updateStateValue', payload: { path: 'animations', newValue: currentAnimations } });
	}

	function getNewItem() {
		const randomColorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
		const variants: ItemType[] = ['line', 'square', 'triangle', 'l_shape', 's_shape'];
		const randomVariant = variants[Math.floor(Math.random() * variants.length)];
		const randomRotation = Math.floor(Math.random() * 4);
		const itemSize = getItemSize(randomVariant, randomRotation);
		return {
			variant: randomVariant,
			rotationIndex: randomRotation,
			itemSize,
			colorFill: randomColorObj.hex,
			isActive: true,
			x: Math.floor(Math.random() * (COLUMNS - itemSize.width)),
			y: -1 + Math.abs(itemSize.width - itemSize.height),
		};
	}

	function getItemSize(variant: ItemType, rotationIndex: number) {
		const ind = rotationIndexNormalized(rotationIndex);
		return {
			width: itemsConfig[variant].values[ind].pattern[0].length,
			height: itemsConfig[variant].values[ind].pattern.length,
		};
	}

	function rotationAllowed(x: number, oldWidth: number, variant: ItemType, newRotationIndex: number): boolean {
		let { width: newWidth } = getItemSize(variant, newRotationIndex);
		let difference = Math.ceil((newWidth - oldWidth) / 2);
		if (x + Math.max(oldWidth, newWidth) <= COLUMNS && x - difference >= 0) {
			return true;
		} else {
			return false;
		}
	}

	function gameOver() {
		const matrix = stateRef.current!.matrix;
		const svgString = createSvgString(matrix, 40);
		const imgBase64Encoded = `data:image/svg+xml;base64,${btoa(svgString)}`;
		let score = stateRef.current!.score || 0;
		const { numberOfColors, numberOfBlocks } = getNumberOfColorsBlocks(matrix);
		let startTime = Math.floor(stateRef.current!.appSettings.startTime);
		let endurance = stateRef.current!.counter;
		let newDialogBoxContent = {
			...context.dialogBoxContent,
			score,
			imgData: '',
			imgBase64Encoded,
			svgString,
			endurance,
			startTime,
			numberOfColors,
			numberOfBlocks,
		};

		setContext((prev) => ({
			...prev,
			dialogBoxContent: newDialogBoxContent,
		}));
		dispatch({
			type: 'updateStateValue',
			payload: { path: 'appSettings', newValue: { ...state.appSettings, dialogBox: 'game-over', imgBase64Encoded } },
		});
	}

	function createSvgString(matrix: MatrixType, size: number): string {
		const svgBody = matrix
			.map((row, rowIndex) => {
				return row
					.map((column, columnIndex) => {
						const isValidAndFilled = column.status > 0 && column.colorFill.length > 3;
						const fill = isValidAndFilled ? column.colorFill : '';
						const rectString = `<rect x="${columnIndex * size}" y="${
							rowIndex * size
						}" width="${size}" height="${size}" fill="${fill}" />`;
						return isValidAndFilled ? rectString : null;
					})
					.filter((x) => x)
					.join('');
			})
			.filter((x) => x.length > 0)
			.join('');
		const svgString = `<svg ${SVG_DECLARATION} width="${size * COLUMNS}" height="${size * ROWS}" viewBox="0,0 ${
			size * COLUMNS
		},${size * ROWS}">${svgBody}</svg>`;
		return svgString;
	}

	function createJsonString(data: DialogBoxContentType, name: string, description: string, ipsf_link: string) {
		const { score, numberOfColors, numberOfBlocks, startTime, endurance } = data;
		let json = {
			name,
			description,
			image_data: ipsf_link,
			attributes: [
				{
					display_type: 'number',
					trait_type: 'Score',
					value: score,
				},
				{
					display_type: 'number',
					trait_type: 'Different Colors',
					value: numberOfColors,
				},
				{
					display_type: 'number',
					trait_type: 'Blocks',
					value: numberOfBlocks,
				},
				{
					display_type: 'number',
					trait_type: 'Blocks',
					value: numberOfBlocks,
					max_value: COLUMNS * ROWS,
				},
				{
					display_type: 'date',
					trait_type: 'Played on',
					value: startTime,
				},
				{
					display_type: 'number',
					trait_type: 'Endurance',
					value: endurance,
					max_value: MAX_COUNTER,
				},
			],
		};
		return JSON.stringify(json);
	}

	function getNumberOfColorsBlocks(matrix: MatrixType) {
		let colorSet = new Set();
		let counter = 0;
		matrix.forEach((row) => {
			row.forEach((column) => {
				if (column && column.colorFill.length > 0) {
					colorSet.add(column?.colorFill);
					counter++;
				}
			});
		});
		return { numberOfColors: colorSet.size, numberOfBlocks: counter };
	}

	function clickHandler(value: string) {
		const itemArray = stateRef.current?.itemArray as ItemObjectType[];
		let item = itemArray[itemArray.length - 1];
		let { x, y, variant, rotationIndex } = item;
		let oldItemSize = getItemSize(variant, rotationIndex);
		let { width: itemWidth } = oldItemSize;
		let oldItemWidth = itemWidth;
		switch (value) {
			case 'up':
				if (rotationAllowed(x, oldItemWidth, variant, rotationIndex + 1)) {
					rotationIndex += 1;
					itemWidth = getItemSize(variant, rotationIndex).width;
				}
				break;
			case 'down':
				if (rotationAllowed(x, oldItemWidth, variant, rotationIndex - 1)) {
					rotationIndex -= 1;
					itemWidth = getItemSize(variant, rotationIndex).width;
				}
				break;
			case 'left':
				x = x > 0 && movementPossible('left') ? x - 1 : x;
				break;
			case 'right':
				x = x + itemWidth < COLUMNS && movementPossible('right') ? x + 1 : x;
				break;
			default:
				break;
		}
		let newItemSize = { ...oldItemSize, width: itemWidth };
		item = { ...item, x, y, rotationIndex, itemSize: newItemSize };
		dispatch({ type: 'updateCurrentItem', payload: { update: item } });
	}

	const [context, setContext] = useState({
		currentItem: currentItemInit,
		controlsHandler: clickHandler,
		unit,
		isCounting: false,
		isDeploying: false,
		isDeployed: false,
		currentContractIndex,
		fingerprint,
		speed: SPEED.DEFAULT.intervalObject.interval,
		config: {
			INITIAL_COUNTER_VALUE: INITIAL_COUNTER_VALUE,
		},
		dialogBoxContent: {
			handler: modalDialogHandler,
			changeContractHandler,
			imgData: '',
			score: 0,
			svgString: '',
			numberOfColors: 0,
			numberOfBlocks: 0,
			endurance: 0,
			imgBase64Encoded: '',
			startTime: 0,
			isMetaMaskInstalled: false,
			deployList: deployListArray,
			availableContracts,
			transactionDetails: {},
		},
		dataObj: {},
	});

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		stateRef.current = {
			itemArray: state.itemArray,
			nextItem: state.nextItem,
			matrix: state.matrix,
			counter: state.counter,
			speed: state.speed,
			score: state.score,
			isCounting: state.isCounting,
			unit: state.unit,
			appSettings: { ...state.appSettings },
			animations: state.animations,
			currentContractIndex: state.currentContractIndex,
		};
		if (intervalQueueRef.current) {
			intervalQueueRef.current[0] = state.speed;
		}

		setContext((prev) => ({
			...prev,
			itemArray: state.itemArray,
			speed: state.speed.interval,
			unit: state.unit,
			isCounting: state.isCounting,
			isDeploying: state.isDeploying,
			isDeployed: state.isDeployed,
			currentContractIndex: state.currentContractIndex,
			fingerprint: state.fingerprint,
		}));
	}, [state]);

	useEffect(() => {
		let intervalQueue = intervalQueueRef.current;
		if (state.isCounting) {
			window.requestAnimationFrame(_requestCallback);
		}
		function _requestCallback(currentTimestamp: number) {
			if (intervalQueue) {
				intervalQueue.forEach((_, index, array) => {
					if (!array[index].start) {
						array[index].start = currentTimestamp;
					}
					const elapsed = currentTimestamp - array[index].start!;
					const speed = array[index].interval;
					if (elapsed >= speed!) {
						array[index].start = currentTimestamp;
						array[index].fn.call(null);
					}
				});
			}

			if (stateRef.current?.isCounting) {
				window.requestAnimationFrame(_requestCallback);
			}
		}
	}, [state.isCounting]);

	return (
		<>
			<GameContext.Provider value={context}>
				<div ref={containerRef} className="main">
					<NFTetrisAppBar>
						<NFTetrisNetwork currentContract={currentContract} />
					</NFTetrisAppBar>
					<GameHeader
						itemsConfig={itemsConfig}
						ref={scoreRef}
						nextItem={state.nextItem}
						itemArray={state.itemArray}
						isCounting={state.isCounting}
						counter={state.counter}
						score={state.score}
						initSpeed={state.speed.interval === SPEED.FAST.intervalObject.interval}
						speedHandler={speedHandler}
					/>
					<div ref={canvasRef}>
						<TetrisCanvas
							itemsConfig={itemsConfig}
							matrix={state.matrix}
							itemArray={state.itemArray}
							styles={{ flex: 1, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '0.35rem' }}
						/>
						<StaticFooter slideIn threshold={[0.95]} rootMargin="42px" minHeight="42px" />
					</div>
					{(state.animations as AnimationType).map((item) => {
						return (
							<AnimationsItem
								text={item.text}
								y={item.y}
								unit={item.unit}
								targetX={item.targetX}
								targetY={item.targetY}
								id={item.key}
								key={item.key}
								handler={animationEndHandler}
							/>
						);
					})}
				</div>
				<ModalDialog open={state.appSettings.dialogBox.length > 0} dialogBox={state.appSettings.dialogBox} />
				{state.fingerprint && state.fingerprint.encoded.length > 0 && (
					<Cookie fingerprint={state.fingerprint.encoded} />
				)}
			</GameContext.Provider>
		</>
	);
};

export default GameLogic;
