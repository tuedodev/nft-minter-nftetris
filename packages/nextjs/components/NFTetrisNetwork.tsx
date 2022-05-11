import { Tooltip, IconButton, Chip, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { CurrentContractType } from '../types/main';
import MetaMaskIcon from './assets/MetaMaskIcon';
import { useStoreData } from '../hooks/useStoreData';
import { MESSAGE } from '../config/constants';

const NFTetrisNetwork = (props: CurrentContractType) => {
	const { currentContract } = props;
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const { metaMaskData } = useStoreData();
	const tooltip = metaMaskData ? MESSAGE.METAMASK(metaMaskData.isMetaMaskInstalled) : MESSAGE.METAMASK(false);
	const disabledIconButton = metaMaskData ? !metaMaskData.isMetaMaskInstalled : true;

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const currentContractChainId = currentContract ? currentContract.chainId : null;
	const currentNetworkDisplay =
		metaMaskData && metaMaskData.isMetaMaskInstalled && metaMaskData.signerChainId === currentContractChainId
			? metaMaskData.networkFullName
			: null;
	let colorChip: Record<string, any> = {
		backgroundColor: `${metaMaskData && metaMaskData.isUnlocked ? 'secondary.main' : 'warning.main'}`,
	};
	colorChip = { ...colorChip, color: 'text.primary' };

	const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
	return (
		<>
			<Tooltip title={tooltip}>
				<span>
					<IconButton
						color="primary"
						size="large"
						aria-label="metamask"
						className="metamask"
						disabled={disabledIconButton}
					>
						<MetaMaskIcon />
						{currentNetworkDisplay && (
							<Chip
								size="small"
								label={currentNetworkDisplay}
								sx={{
									...colorChip,
									position: 'absolute',
									bottom: '-8px',
									right: '-12px',
									maxWidth: 'none',
									fontSize: '0.65rem',
									height: '20px',
									opacity: 0.45,
								}}
							/>
						)}
					</IconButton>
				</span>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map((setting) => (
					<MenuItem key={setting} onClick={handleCloseUserMenu}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default NFTetrisNetwork;
