import { Typography } from '@mui/material';
import { MESSAGE } from '../../../config/constants';

const ConfirmNewGame = () => {
	return (
		<>
			<Typography sx={{ mb: 1 }} variant="body1">
				{MESSAGE.CONFIRM_NEW_GAME}
			</Typography>
			<Typography variant="body1">{MESSAGE.NOT_STORED}</Typography>
		</>
	);
};

export default ConfirmNewGame;
