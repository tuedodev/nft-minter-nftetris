import React from 'react';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import GameOver from './content/GameOver';
import Init from './content/Init';
import ProcessDeployment from './content/ProcessDeployment';
import { ModalDialogPropsType } from '../types/game';
import NFTMinted from './content/NFTMinted';
import Error from './content/Error';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDialog = (props: ModalDialogPropsType) => {
	const { open } = props;
	let Element: React.ElementType | null;

	switch (props.dialogBox) {
		case 'game-over':
			Element = () => <GameOver />;
			break;
		case 'init':
			Element = () => <Init />;
			break;
		case 'process-deployment':
			Element = () => <ProcessDeployment />;
			break;
		case 'nft-minted':
			Element = () => <NFTMinted />;
			break;
		case 'error':
			Element = (props) => <Error {...props} />;
			break;
		default:
			Element = null;
	}

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			scroll="body"
			onClose={() => {}}
			aria-describedby="alert-dialog-slide-description"
			fullWidth
		>
			{Element && <Element {...props} />}
		</Dialog>
	);
};

export default React.memo(ModalDialog);
