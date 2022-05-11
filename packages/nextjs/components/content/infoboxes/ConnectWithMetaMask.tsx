import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { BUTTON } from '../../../config/constants';
import MetaMaskIcon from '../../assets/MetaMaskIcon';
import { useWeb3 } from '../../../hooks/useWeb3';

const ConnectWithMetaMask = () => {
	const [clicked, setClicked] = useState(false);

	const web3 = useWeb3();

	function clickHandler() {
		if (!clicked) {
			setClicked(true);
			web3.connectWithMetaMask();
		}
	}

	return (
		<Box sx={{ display: 'flex', mb: 1, alignItems: 'center', justifyContent: 'center' }}>
			<IconButton onClick={clickHandler} size="large" disabled={clicked} className="connect-metamask">
				<Stack direction="row" justifyContent="center" alignItems="center">
					<MetaMaskIcon />
					<Typography sx={{ ml: 1 }} variant="body2">
						{BUTTON.CONNECT}
					</Typography>
				</Stack>
			</IconButton>
		</Box>
	);
};

export default ConnectWithMetaMask;
