import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useState } from 'react';

type ConfirmWrapperProps = {
	children: React.ReactNode;
	onSuccess: () => void;
	title: string;
	text: string | React.ReactNode;
	buttonText: { agree?: string; disagree?: string };
};
const ConfirmWrapper = (props: ConfirmWrapperProps) => {
	const [buttonConfirmStatus, setbuttonConfirmStatus] = useState(false);

	function buttonConfirmOpen() {
		setbuttonConfirmStatus(true);
	}

	function buttonConfirmClose() {
		setbuttonConfirmStatus(false);
	}

	return (
		<>
			<div onClick={buttonConfirmOpen}>{props.children}</div>
			<Dialog
				open={buttonConfirmStatus}
				onClose={buttonConfirmClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
				<DialogContent>
					{typeof props.text === 'string' ? (
						<DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
					) : (
						<>{props.text}</>
					)}
				</DialogContent>
				<DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mb: 2 }}>
					{props.buttonText.agree && (
						<Button onClick={props.onSuccess} autoFocus>
							{props.buttonText.agree}
						</Button>
					)}
					{props.buttonText.disagree && (
						<Button onClick={buttonConfirmClose} autoFocus>
							{props.buttonText.disagree}
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmWrapper;
