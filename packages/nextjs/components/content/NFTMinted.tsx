import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Box,
	Button,
	Chip,
	Collapse,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Link,
	Stack,
	TableContainer,
	Typography,
} from '@mui/material';
import { BigNumber, utils } from 'ethers';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'styled-components';
import { BUTTON, MESSAGE } from '../../config/constants';
import { useFormValidation } from '../../hooks/useFormValidation';
import { TextFieldType } from '../../types/form';
import { DialogBoxContentType, GameContextType } from '../../types/game';
import OpenSeaLogo from '../assets/OpenSeaLogo';
import { ConditonalWrapper } from '../CondititionalWrapper';
import ConfirmWrapper from '../ConfirmWrapper';
import { ExpandMoreWrapper } from '../ExpandMoreWrapper';
import FormBlock from '../FormBlock';
import { GameContext } from '../GameContext';
import DialogHeader from './DialogHeader';
import ImageContainer from './ImageContainer';
import ConfirmNewGame from './infoboxes/ConfirmNewGame';
import InfoboxTable from './infoboxes/InfoboxTable';

const NFTMinted = () => {
	const context = useContext(GameContext) as GameContextType;
	const router = useRouter();
	const { dialogBoxContent } = context;
	const fingerprint = context.fingerprint;
	const [isSent, setIsSent] = useState(false);
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	let {
		transactionDetails,
		transactionReceipt = {},
		ipsfLink,
		openSeaLink,
		imgBase64Encoded,
		tokenId,
		network,
		currencySymbol,
		networkScanContract,
		networkScanNft,
	} = context.dialogBoxContent as DialogBoxContentType;

	const SVGImage = () => React.createElement(ImageContainer, null, <img alt="svg small" src={imgBase64Encoded} />);

	const transactionReceiptNormalized = {
		blockHash: transactionReceipt?.blockHash,
		blockNumber: transactionReceipt?.blockNumber.toString(),
		byzantium: transactionReceipt?.byzantium ? 'true' : 'false',
		confirmations: transactionReceipt?.confirmations.toString(),
		cumulativeGasUsed: utils.formatEther(transactionReceipt?.cumulativeGasUsed).toString(),
		effectiveGasPrice: utils.formatEther(transactionReceipt?.effectiveGasPrice).toString(),
		from: transactionReceipt?.from,
		gasUsed: utils.formatEther(transactionReceipt?.gasUsed).toString(),
		to: transactionReceipt?.to,
		transactionHash: transactionReceipt?.transactionHash,
		transactionIndex: transactionReceipt?.transactionIndex.toString(),
	};

	const links = {
		network: dialogBoxContent.network,
		contractAddress: `${dialogBoxContent.networkScanContract}${transactionReceipt.to}`,
		ipsfLink: dialogBoxContent.ipsfLink,
		openSeaLink: dialogBoxContent.openSeaLink,
		nftTransactionLink: `${dialogBoxContent.networkScanNft}${transactionReceipt.transactionHash}`,
	};

	let tableData = Object.entries(transactionReceiptNormalized).map((item) => ({
		values: [item[0], item[1]],
		sx: { '& td:nth-of-type(2)': { wordBreak: 'break-all' } },
	}));

	let msgComponent = React.createElement(InfoboxTable, { tableData, spacing: 0 }, null);
	const theme = useTheme();

	const initValue: TextFieldType = {
		email: {
			value: '',
			label: 'Your email address',
			valid: true,
			required: true,
			validation: [{ regex: /\S+@\S+\.\S+/g, errorMsg: 'Invalid characters in your email address.' }],
		},
	};
	const obj = useFormValidation(initValue);

	const { gasUsed, effectiveGasPrice, transactionHash, from, to, blockNumber } = transactionReceipt as {
		gasUsed: BigNumber;
		effectiveGasPrice: BigNumber;
		transactionHash: string;
		from: string;
		to: string;
		blockNumber: number;
	};
	const ethSpent = BigNumber.from(gasUsed.mul(effectiveGasPrice)).toBigInt();
	const ethSpentForm = utils.formatEther(gasUsed.mul(effectiveGasPrice));
	const ethSpentFormRounded = Math.round(Number(ethSpentForm) * 1e7) / 1e7;
	const youSpent = `You spent: ${ethSpentFormRounded} ${currencySymbol}`;

	function clickHandler(value: string) {
		const obj = {
			value,
			data: context.dataObj,
		};
		context?.dialogBoxContent.handler!.call(null, obj);
	}

	async function emailHandler() {
		setIsSent(true);
		let dataObject = {
			emailReceiver: obj.email.value,
			transactionReceipt: transactionReceiptNormalized,
			fingerprint: fingerprint.value,
			links,
			tokenId: Number(tokenId),
			youSpent,
		};
		triggerEmail(dataObject);
	}

	function triggerEmail(value: Record<string, any>) {
		fetch('./api/email', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		})
			.then(async (response) => {
				if (!response.ok) {
					return Promise.reject(response.statusText);
				}
				return response.json();
			})
			.catch((error) => {
				console.log(error.message || error);
			});
	}

	return (
		<>
			<DialogTitle sx={{ my: 2 }}>
				<DialogHeader label="Congratulations!" size="big" color="text.primary" backgroundColor="primary.main" />
			</DialogTitle>
			<DialogContent>
				<Typography variant="body1" sx={{ mb: 2, fontSize: '1rem', color: 'text.primary' }}>
					Your NFT was minted on {network}.
				</Typography>
				<Grid container sx={{ my: 3 }}>
					<Grid item xs={4}>
						<SVGImage />
					</Grid>
					<Grid item xs={8}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
								alignItems: 'center',
								height: '100%',
							}}
						>
							<Link
								href={`${networkScanNft}${transactionReceipt && transactionReceipt.transactionHash}`}
								underline="none"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Chip label="Link to NFT transaction" clickable sx={{ backgroundColor: '#64b5f6' }} />
							</Link>
							<Box>
								<Chip label={`Token Id: ${tokenId}`} sx={{ backgroundColor: 'primary.main' }} />
							</Box>
							<Box>
								<Chip label={youSpent} sx={{ backgroundColor: 'primary.main' }} />
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Link href={ipsfLink} underline="none" target="_blank" rel="noopener noreferrer">
							<Chip label={BUTTON.IPFS} clickable sx={{ backgroundColor: '#64b5f6' }} />
						</Link>
					</Grid>
					<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Link
							sx={{ display: 'inline-block', width: '180px', '& > img, & > svg': { width: '100%', height: 'auto' } }}
							href={openSeaLink}
							underline="none"
							target="_blank"
							rel="noopener noreferrer"
						>
							<OpenSeaLogo />
						</Link>
					</Grid>
				</Grid>
				<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h3" sx={{ m: 0, p: 0, fontSize: '1.5rem', color: 'text.primary' }}>
						{BUTTON.TR}
					</Typography>
					<ExpandMoreWrapper
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMoreWrapper>
				</Box>
				<Divider sx={{ mt: 1, mb: 2 }} />
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<TableContainer>{msgComponent}</TableContainer>
				</Collapse>
				<Collapse in={isSent} timeout={480}>
					<Box>
						<Typography variant="body1" sx={{ mb: 1, fontSize: '1rem', color: 'text.primary' }}>
							{MESSAGE.EMAIL_SENT}
						</Typography>
						<Typography variant="body1" sx={{ mb: 2, fontSize: '1rem', color: 'text.primary' }}>
							{MESSAGE.EMAIL_CHECK_SPAM_FOLDER}
						</Typography>
					</Box>
				</Collapse>
				<Collapse in={!isSent} timeout={140}>
					<Box>
						<Typography variant="body1" sx={{ mb: 1, fontSize: '1rem', color: 'text.primary' }}>
							{MESSAGE.EMAIL_NOT_STORED}
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
							<FormBlock initValue={initValue} obj={obj} sx={{ width: '100%', paddingRight: '16px' }} />
							<Stack sx={{ justifyContent: 'center' }}>
								<Button variant="contained" disabled={obj.disabled} onClick={emailHandler}>
									{BUTTON.SEND}
								</Button>
							</Stack>
						</Box>
					</Box>
				</Collapse>
			</DialogContent>
			<DialogActions sx={{ pb: 4 }}>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
						<ConditonalWrapper
							condition={!isSent}
							wrapper={(children) => (
								<ConfirmWrapper
									onSuccess={router.reload}
									title="New Game?"
									text={<ConfirmNewGame />}
									buttonText={BUTTON.YESNO}
								>
									{children}
								</ConfirmWrapper>
							)}
						>
							<Button
								onClick={() => {
									if (!isSent) {
										return;
									} else {
										router.reload();
									}
								}}
								variant="contained"
								size="large"
							>
								{BUTTON.NEW_GAME}
							</Button>
						</ConditonalWrapper>
					</Grid>
				</Grid>
			</DialogActions>
		</>
	);
};

export default NFTMinted;
