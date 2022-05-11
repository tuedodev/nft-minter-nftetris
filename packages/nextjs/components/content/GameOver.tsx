import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Link,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { BUTTON } from '../../config/constants';
import { useFormValidation } from '../../hooks/useFormValidation';
import { TextFieldType } from '../../types/form';
import { DialogBoxContentType, GameContextType } from '../../types/game';
import ConfirmWrapper from '../ConfirmWrapper';
import FormBlock from '../FormBlock';
import { GameContext } from '../GameContext';
import SimpleTable from '../SimpleTable';
import DialogHeader from './DialogHeader';
import ImageContainer from './ImageContainer';
import ConfirmNewGame from './infoboxes/ConfirmNewGame';

const GameOver = () => {
	const context = useContext(GameContext) as GameContextType;
	const data = context?.dialogBoxContent as DialogBoxContentType;
	const router = useRouter();

	let { availableContracts, changeContractHandler } = data;
	const selectAvailableContracts = availableContracts.map((con, index) => {
		return { label: con.contractLabel, value: `${index}` };
	});

	const currentlySelected =
		typeof context.currentContractIndex !== 'undefined' ? `${context.currentContractIndex}` : `0`;
	const [selectedContract, setSelectedContract] = useState<string>(currentlySelected);
	const selectChangeHandler = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSelectedContract(event.target.value);
			changeContractHandler({ value: event.target.value });
		},
		[setSelectedContract]
	);

	const initValue: TextFieldType = {
		nameContract: {
			value: '',
			label: 'Name of the NFT',
			valid: true,
			required: true,
			validation: [{ regex: /[0-9a-zA-Z]{3,}/g, errorMsg: 'Less than 3 or invalid characters.' }],
		},
		description: {
			value: '',
			label: 'Description',
			valid: true,
			required: true,
			validation: [{ regex: /[0-9a-zA-Z]{3,}/g, errorMsg: 'Less than 3 or invalid characters.' }],
		},
		contract: {
			value: currentlySelected,
			label: 'Contract',
			valid: true,
			required: true,
			validation: [],
			select: selectAvailableContracts,
			selectHandler: selectChangeHandler,
		},
	};
	const obj = useFormValidation(initValue);
	const dateLocale = new Date(data!.startTime * 1000).toLocaleString('en-us', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	function clickHandler(value: string) {
		const dataObject = {
			value,
			data: {
				formInput: obj,
				endurance: data.endurance,
				date: dateLocale,
				startTime: data.startTime,
				score: data.score,
				numberOfColors: data.numberOfColors,
				numberOfBlocks: data.numberOfBlocks,
				imgBase64Encoded: data.imgBase64Encoded,
				svgString: data.svgString,
			},
		};
		data.handler!.call(null, dataObject);
	}

	const theme = useTheme();
	const LinkElement = () =>
		React.createElement(
			Link,
			{
				href: availableContracts[parseInt(selectedContract)].networkScan,
				variant: 'body2',
				color: 'link',
				target: '_blank',
				rel: 'noopener noreferrer',
			},
			`${availableContracts[parseInt(selectedContract)].address}`
		);
	const tabCellStyle = { fontSize: theme.typography.body1.fontSize, color: theme.palette.text.primary };
	const tableData = [
		{
			values: ['NFT Collection:', <LinkElement />],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': { wordBreak: 'break-all' } },
		},
		{
			values: ['NFT Contract Type:', availableContracts[parseInt(selectedContract)].contractName],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
		{
			values: [
				`Network:`,
				`${availableContracts[parseInt(selectedContract)].network} (Chain-Id: ${
					availableContracts[parseInt(selectedContract)].chainId
				})`,
			],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
		{
			values: ['Score:', data.score],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
		{
			values: ['Different Colors:', data.numberOfColors],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
		{
			values: ['Blocks', data.numberOfBlocks],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
		{
			values: ['Historical Moment:', dateLocale],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
		{
			values: ['Endurance:', data.endurance],
			sx: { '& td:nth-of-type(1)': tabCellStyle, '& td:nth-of-type(2)': tabCellStyle },
		},
	];

	return (
		<>
			<DialogTitle sx={{ my: 2 }}>
				<DialogHeader label="Game over" size="big" color="text.primary" backgroundColor="primary.main" />
			</DialogTitle>
			<DialogContent>
				<Grid container>
					<Grid item xs={12} sx={{ mb: 1.5 }}>
						<Typography sx={{ mb: 1 }} variant="body1" component="p">
							... but your NFT journey may just begin.
						</Typography>
						<Typography sx={{ mb: 1 }} variant="body1" component="p">
							Publish your score for eternity as minted NFT on the blockchain.
						</Typography>
						<Typography sx={{ mb: 1 }} variant="body1" component="p">
							Depending on the needwork you need some cash in you wallet (MetaMask).
						</Typography>
						<Typography variant="body1" component="p">
							Please add below the missing metadata like name and description in order to deploy the NFT properly.
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ my: 2 }}>
						<DialogHeader label="NFT attributes" size="medium" color="text.primary" />
					</Grid>
					<SimpleTable tableData={tableData} divider={true} spacing={0.5} />
					<Grid item xs={12} sx={{ my: 2 }}>
						<DialogHeader
							label="Please update:"
							size="medium"
							color="background.paper"
							backgroundColor="primary.main"
						/>
					</Grid>
					<Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
						<Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', alignItem: 'center' }}>
							{data.imgBase64Encoded!.length > 0 && (
								<ImageContainer>
									<img alt="svg small" src={data.imgBase64Encoded} />
								</ImageContainer>
							)}
						</Grid>
						<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
							<Grid container spacing={0} sx={{ mb: 1 }}>
								<Grid item xs={12}>
									<FormBlock initValue={initValue} obj={obj} />
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</DialogContent>
			<DialogActions sx={{ pb: 4 }}>
				<Grid container>
					<Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
						<Button variant="contained" size="large" disabled={obj.disabled} onClick={() => clickHandler('deploy')}>
							Deploy NFT
						</Button>
					</Grid>
					<Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
						<ConfirmWrapper
							onSuccess={router.reload}
							title="New Game?"
							text={<ConfirmNewGame />}
							buttonText={BUTTON.YESNO}
						>
							<Button variant="contained" size="large">
								No, thanks!
							</Button>
						</ConfirmWrapper>
					</Grid>
				</Grid>
			</DialogActions>
		</>
	);
};

export default GameOver;
