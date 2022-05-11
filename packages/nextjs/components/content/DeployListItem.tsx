import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import MessageComponent from './MessageComponent';

type DeployListItemProps = {
	labelText: string;
	helperText: string;
	status: string;
	msgComponent: React.ReactNode | null;
	additionalMsg?: React.ReactNode;
};

type DeployListIconType = {
	status: string;
};

type DeployTextType = {
	value: string;
	status: string;
};

const gridSX = {
	width: 1,
	display: 'flex',
	alignItems: 'center',
};

const helperTextSX = {
	wordWrap: 'break-word',
	fontSize: '0.85rem',
	display: 'inline-block',
	minHeight: '0.95rem',
	lineHeight: '1rem',
	width: 1,
};

const labelTextSX = {
	...helperTextSX,
	fontSize: '1.15rem',
	minHeight: '1.35rem',
	lineHeight: '1.35rem',
};

function getColor(status: string) {
	return {
		labelText: status.length > 0 ? (status !== 'CANCELED' ? 'text.primary' : 'text.disabled') : 'text.primary',
		helperText: status === 'ERROR' || status === 'CANCELED' ? 'error.main' : 'text.disabled',
		link: '#0000ff',
	};
}

const DeployListItem = (props: DeployListItemProps) => {
	const { labelText, helperText, status, msgComponent, additionalMsg } = props;

	const DeployListIcon = (props: DeployListIconType) => {
		switch (props.status) {
			case 'PENDING':
				return <CircularProgress />;
			case 'SUCCESS':
				return <CheckCircleIcon sx={{ fontSize: '44px', color: 'success.main' }} />;
			case 'ERROR':
				return <ErrorIcon sx={{ fontSize: '44px', color: 'error.main' }} />;
			case 'CANCELED':
				return <ErrorIcon sx={{ fontSize: '44px', color: 'error.main' }} />;
			case '':
				return null;
			default:
				return null;
		}
	};

	const LabelText = (props: DeployTextType) => (
		<Typography color={getColor(props.status).labelText} variant="body1" sx={labelTextSX}>
			{props.value}
		</Typography>
	);
	const HelperText = (props: DeployTextType) => (
		<Typography variant="body1" color={getColor(props.status).helperText} sx={helperTextSX}>
			{props.value}
		</Typography>
	);

	return (
		<Grid container alignItems="center" sx={{ mb: 2 }}>
			<Grid item xs={11}>
				<Grid container direction="column" justifyContent="center" alignItems="stretch">
					<Grid item sx={{ ...gridSX, minHeight: '1.4rem' }}>
						<LabelText status={status} value={labelText} />
					</Grid>
					<Grid item sx={{ ...gridSX, minHeight: '1.25rem' }}>
						<HelperText status={status} value={helperText} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={1} justifyContent="flex-end" display="inline-flex">
				<Box>
					<DeployListIcon status={status} />
				</Box>
			</Grid>
			{msgComponent && (
				<Grid item xs={12} justifyContent="center">
					<MessageComponent component={msgComponent} />
				</Grid>
			)}
			{additionalMsg && (
				<Grid item xs={12} justifyContent="center">
					<MessageComponent component={additionalMsg} />
				</Grid>
			)}
		</Grid>
	);
};

export default DeployListItem;
