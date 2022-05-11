import { Box, Grid, Typography, useTheme, Divider } from '@mui/material';
import { METAMASK_DOWNLOAD_LINK } from '../../../config/constants';
import MetaMaskWordmark from '../../assets/MetaMaskWordmark';

const ErrorInstallMetaMask = (props: { message: string }) => {
	const { message } = props;
	const theme = useTheme();

	return (
		<Box>
			<Grid container justifyContent="center" alignItems="center" sx={{ my: 3 }}>
				<Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
					<Typography variant="body1" sx={{ fontSize: '0.85rem', color: theme.palette.text.secondary }}>
						{message}
					</Typography>
				</Grid>
				<Box sx={{ width: '100%', mt: 2, mb: 1 }}>
					<Divider variant="middle" />
				</Box>
				<Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
					<Box sx={{ width: '50%' }}>
						<a
							href={METAMASK_DOWNLOAD_LINK}
							target="_blank"
							rel="noopener noreferrer nofollow"
							style={{ display: 'inline-block', width: '100%' }}
						>
							<MetaMaskWordmark />
						</a>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ErrorInstallMetaMask;
