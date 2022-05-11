import { useRouter } from 'next/router';
import { DialogTitle, DialogContent, Typography, DialogActions, Grid, Button } from '@mui/material';
import { BUTTON } from '../../config/constants';
import { ModalDialogPropsType } from '../../types/game';
import DialogHeader from './DialogHeader';

const Error = (props: ModalDialogPropsType) => {
	const { title, message } = props;
	const router = useRouter();

	return (
		<>
			<DialogTitle sx={{ my: 2 }}>
				<DialogHeader label={title} size="big" color="text.primary" backgroundColor="primary.main" />
			</DialogTitle>
			<DialogContent>
				<Typography variant="body1" sx={{ mb: 2, fontSize: '1rem', color: 'text.primary' }}>
					{message}
				</Typography>
			</DialogContent>
			<DialogActions sx={{ pb: 4, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
						<Button onClick={() => router.push('/')} variant="contained" size="large">
							{BUTTON.HOMEPAGE}
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</>
	);
};

export default Error;
