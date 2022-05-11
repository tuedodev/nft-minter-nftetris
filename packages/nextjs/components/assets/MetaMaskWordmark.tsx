import { BASE64_ENCODED } from '../../config/constants';

const MetaMaskWordmark = () => {
	return (
		<>
			<img style={{ width: '100%', height: 'auto' }} src={BASE64_ENCODED.metaMaskWordmark} alt="MetaMask Wordmark" />
		</>
	);
};

export default MetaMaskWordmark;
