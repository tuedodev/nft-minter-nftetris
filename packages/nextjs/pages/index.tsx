import type { NextPage } from 'next';
import GameLogic from '../components/GameLogic';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

interface HomeProps {
	value: string;
	encoded: string;
}

const DynamicComponentWithNoSSR = dynamic(() => import('../components/GameLogic'), { ssr: false });

const Home: NextPage = (props: HomeProps) => {
	return (
		<Layout>
			<DynamicComponentWithNoSSR value={''} encoded={''} {...props} />
			{/*<GameLogic value={''} encoded={''} {...props} />*/}
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const fingerprint = uuidv4();

	function getFingerprint() {
		return new Promise((resolve) => {
			jwt.sign(
				{ fingerprint: fingerprint },
				process.env.NEXT_PUBLIC_JWT_SECRET,
				{ expiresIn: '1h' },
				function (_, token) {
					resolve([fingerprint, token]);
				}
			);
		});
	}

	const [value, encoded] = (await getFingerprint()) as string[];

	return {
		props: { value, encoded },
	};
};

export default Home;
