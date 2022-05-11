import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import styled from 'styled-components';
import Logo from './assets/Logo';

const Container = styled.div`
	width: 98%;
	max-width: 480px;
	margin: 0 auto;
	padding: 0;
`;

type NFTetrisAppBarPropsType = {
	children?: React.ReactNode;
};

const NFTetrisAppBar = (props: NFTetrisAppBarPropsType) => {
	return (
		<>
			<AppBar position="fixed">
				<Container>
					<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
						<Logo styles={{ height: '80px', padding: '8px 0' }} />
						<Box sx={{ flexGrow: 0 }}>{props.children}</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</>
	);
};

export default NFTetrisAppBar;
