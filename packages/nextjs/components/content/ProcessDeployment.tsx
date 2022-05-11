import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { BUTTON, MESSAGE } from '../../config/constants';
import { DialogBoxContentType, GameContextType } from '../../types/game';
import ConfirmWrapper from '../ConfirmWrapper';
import { GameContext } from '../GameContext';
import DeployListItem from './DeployListItem';
import DialogHeader from './DialogHeader';
import ConfirmNewGame from './infoboxes/ConfirmNewGame';
import {
	Box,
	Button,
	CircularProgress,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Typography,
	useTheme,
} from '@mui/material';

const ProcessDeployment = () => {
	const context = useContext(GameContext) as GameContextType;
	const router = useRouter();
	const { deployList } = context.dialogBoxContent as DialogBoxContentType;
	const btnDisabled = context.isDeploying || context.isDeployed;
	const theme = useTheme();
	let listRefs = React.useRef<Array<HTMLElement | null>>(Array.from({ length: deployList.length }, (x) => null));
	const dialogBoxRef = useRef<HTMLDivElement | null>(null);
	const dialogActionsRef = useRef<HTMLDivElement | null>(null);

	const btnText = context.isDeployed ? 'Deployed' : context.isDeploying ? 'Just deploying' : 'Deploy again';
	const dataObj = context.dataObj || {};

	function clickHandler(value: string) {
		const obj = {
			value,
			data: dataObj,
		};
		context?.dialogBoxContent.handler!.call(null, obj);
	}

	useEffect(() => {
		const currentElement = dialogBoxRef.current ?? null;
		const interval = setInterval(() => {
			if (currentElement) {
				let clRect = currentElement.getBoundingClientRect();
				let newScrollYPosition = clRect.top + clRect.height - window.innerHeight;
				if (newScrollYPosition > window.scrollY) {
					window.scrollTo({ top: newScrollYPosition, left: 0, behavior: 'smooth' });
				}
			}
		}, 100);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const currentlyPending = deployList
			.map((item, index) => ({ status: item.status, index }))
			.filter((x) => x.status.length > 0)
			.at(-1);
		if (typeof currentlyPending !== 'undefined' && typeof listRefs.current[currentlyPending.index] !== 'undefined') {
			if (currentlyPending.index + 1 < deployList.length) {
				listRefs.current[currentlyPending.index + 1]!.scrollIntoView({ behavior: 'smooth', block: 'end' });
			} else if (dialogActionsRef) {
				dialogActionsRef.current!.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		}
	}, [deployList, context.isDeploying, context.isDeployed]);

	return (
		<div style={{ scrollMarginTop: '80px' }}>
			<DialogTitle sx={{ my: 2 }}>
				<DialogHeader label="NFT Deployment" size="big" color="text.primary" backgroundColor="primary.main" />
			</DialogTitle>
			<DialogContent>
				<Box>
					{deployList.map((l, i) => {
						return (
							<div key={i} ref={(element) => (listRefs.current[i] = element)}>
								<DeployListItem
									labelText={l.labelText}
									helperText={l.helperText}
									status={l.status}
									msgComponent={l.msgComponent}
									additionalMsg={l.additionalMsg}
								/>
							</div>
						);
					})}
				</Box>
			</DialogContent>
			{
				<DialogActions ref={dialogActionsRef} sx={{ pb: 4 }}>
					<Grid container justifyContent="center" alignItems="center">
						{context.isDeployed ? (
							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
								<CircularProgress sx={{ mb: 2 }} />
								<Typography variant="body1" sx={{ mb: 2, fontSize: '1rem', color: theme.palette.text.primary }}>
									{MESSAGE.PLEASE_WAIT}
								</Typography>
							</Box>
						) : (
							<>
								<Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
									<Button size="large" disabled={btnDisabled} onClick={() => clickHandler('redeploy')}>
										{btnText}
									</Button>
								</Grid>
								<Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
									<ConfirmWrapper
										onSuccess={router.reload}
										title="New Game?"
										text={<ConfirmNewGame />}
										buttonText={BUTTON.YESNO}
									>
										<Button size="large">{BUTTON.NEW_GAME}</Button>
									</ConfirmWrapper>
								</Grid>
							</>
						)}
					</Grid>
				</DialogActions>
			}
		</div>
	);
};

export default ProcessDeployment;
