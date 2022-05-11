import Head from 'next/head';
import { Container, NoSsr } from '@mui/material';
import { WEBSITE_TITLE } from '../config/constants';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>{WEBSITE_TITLE}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container
				sx={{
					maxWidth: '800px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<NoSsr>{children}</NoSsr>
			</Container>
		</>
	);
};

export default Layout;
