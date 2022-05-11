import { BASE64_ENCODED } from '../../config/constants';

type LogoPropsType = {
	styles?: React.CSSProperties;
};

const Logo = (props: LogoPropsType) => {
	return (
		<div style={props.styles}>
			<img style={{ maxHeight: '100%' }} alt="NFTetris Logo" src={BASE64_ENCODED.nftetrisLogo} />
		</div>
	);
};

export default Logo;
