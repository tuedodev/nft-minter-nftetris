import { useContext } from 'react';
import { GameContext } from '../GameContext';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import GenericSVG from '../assets/GenericSVG';
import Logo from '../assets/Logo';
import DialogHeader from './DialogHeader';
import { BUTTON } from '../../config/constants';

const Init = () => {
	const context = useContext(GameContext);

	function clickHandler() {
		context!.dialogBoxContent.handler!.call(null, { value: 'init' });
	}

	return (
		<>
			<DialogTitle sx={{ mt: 2, mb: 1 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Logo styles={{ height: '72px', padding: '8px 0', marginBottom: '8px' }} />
				</Box>
				<DialogHeader label="Welcome" size="big" color="text.primary" backgroundColor="primary.main" />
			</DialogTitle>
			<DialogContent>
				<Grid container direction="row">
					<Grid item px={{ xs: 10, md: 0 }} mb={{ xs: 4, md: 0 }} xs={12} md={4}>
						<GenericSVG />
					</Grid>
					<Grid item xs={12} md={8}>
						<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
							<Typography my={{ xs: 2, md: 0 }} ml={{ md: 1 }} variant="body1" component="p">
								Dive into the world of NFT. Have fun and publish your first ERC721 NFT (Beta-Version: Testnet Mumbai).
							</Typography>
							<Typography my={{ xs: 2, md: 0 }} ml={{ md: 1 }} variant="body1" component="p">
								Use the mouse or your fingers, play good old Tetris and publish the result as NFT on a marketplace such
								as OpenSea.
							</Typography>
							<Typography my={{ xs: 2, md: 0 }} ml={{ md: 1 }} variant="body1" component="p">
								The SVG image of your game remains stored as IPFS for all eternity and decentrally.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{ pb: 4, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
				<Button onClick={clickHandler} variant="contained" size="large">
					{BUTTON.START_GAME}
				</Button>
			</DialogActions>
		</>
	);
};

export default Init;
