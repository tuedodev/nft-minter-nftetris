import { Box } from '@mui/material';

type GenericSVGPropsType = {
	sx?: React.CSSProperties;
};

const GenericSVG = (props: GenericSVGPropsType) => {
	const { sx } = props;
	return (
		<Box sx={{ '& > img, & > svg': { width: '100%', height: 'auto' }, ...sx }}>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="480" height="640" viewBox="0,0 480,640">
				<rect x="280" y="40" width="40" height="40" fill="#7cfc00" />
				<rect x="320" y="40" width="40" height="40" fill="#7cfc00" />
				<rect x="40" y="80" width="40" height="40" fill="#ff6347" />
				<rect x="280" y="80" width="40" height="40" fill="#7cfc00" />
				<rect x="320" y="80" width="40" height="40" fill="#7cfc00" />
				<rect x="360" y="80" width="40" height="40" fill="#fffaf0" />
				<rect x="40" y="120" width="40" height="40" fill="#ff6347" />
				<rect x="80" y="120" width="40" height="40" fill="#ff6347" />
				<rect x="120" y="120" width="40" height="40" fill="#ff6347" />
				<rect x="320" y="120" width="40" height="40" fill="#fffaf0" />
				<rect x="360" y="120" width="40" height="40" fill="#fffaf0" />
				<rect x="80" y="160" width="40" height="40" fill="#00ff7f" />
				<rect x="360" y="160" width="40" height="40" fill="#fffaf0" />
				<rect x="80" y="200" width="40" height="40" fill="#00ff7f" />
				<rect x="160" y="200" width="40" height="40" fill="#87ceeb" />
				<rect x="360" y="200" width="40" height="40" fill="#e0ffff" />
				<rect x="400" y="200" width="40" height="40" fill="#e0ffff" />
				<rect x="40" y="240" width="40" height="40" fill="#00ff7f" />
				<rect x="80" y="240" width="40" height="40" fill="#00ff7f" />
				<rect x="160" y="240" width="40" height="40" fill="#87ceeb" />
				<rect x="200" y="240" width="40" height="40" fill="#87ceeb" />
				<rect x="240" y="240" width="40" height="40" fill="#87ceeb" />
				<rect x="360" y="240" width="40" height="40" fill="#e0ffff" />
				<rect x="40" y="280" width="40" height="40" fill="#d2691e" />
				<rect x="80" y="280" width="40" height="40" fill="#d2691e" />
				<rect x="240" y="280" width="40" height="40" fill="#ff00ff" />
				<rect x="280" y="280" width="40" height="40" fill="#ff00ff" />
				<rect x="360" y="280" width="40" height="40" fill="#e0ffff" />
				<rect x="0" y="320" width="40" height="40" fill="#d2691e" />
				<rect x="40" y="320" width="40" height="40" fill="#d2691e" />
				<rect x="80" y="320" width="40" height="40" fill="#8b4513" />
				<rect x="120" y="320" width="40" height="40" fill="#8b4513" />
				<rect x="240" y="320" width="40" height="40" fill="#ff00ff" />
				<rect x="280" y="320" width="40" height="40" fill="#ff00ff" />
				<rect x="320" y="320" width="40" height="40" fill="#f0ffff" />
				<rect x="360" y="320" width="40" height="40" fill="#f0ffff" />
				<rect x="400" y="320" width="40" height="40" fill="#f0ffff" />
				<rect x="80" y="360" width="40" height="40" fill="#8b4513" />
				<rect x="280" y="360" width="40" height="40" fill="#2f4f4f" />
				<rect x="320" y="360" width="40" height="40" fill="#2f4f4f" />
				<rect x="400" y="360" width="40" height="40" fill="#f0ffff" />
				<rect x="0" y="400" width="40" height="40" fill="#008000" />
				<rect x="40" y="400" width="40" height="40" fill="#008000" />
				<rect x="80" y="400" width="40" height="40" fill="#8b4513" />
				<rect x="240" y="400" width="40" height="40" fill="#2f4f4f" />
				<rect x="280" y="400" width="40" height="40" fill="#2f4f4f" />
				<rect x="0" y="440" width="40" height="40" fill="#008000" />
				<rect x="80" y="440" width="40" height="40" fill="#fffacd" />
				<rect x="120" y="440" width="40" height="40" fill="#fffacd" />
				<rect x="160" y="440" width="40" height="40" fill="#c0c0c0" />
				<rect x="200" y="440" width="40" height="40" fill="#c0c0c0" />
				<rect x="240" y="440" width="40" height="40" fill="#c0c0c0" />
				<rect x="0" y="480" width="40" height="40" fill="#008000" />
				<rect x="80" y="480" width="40" height="40" fill="#fffacd" />
				<rect x="120" y="480" width="40" height="40" fill="#fffacd" />
				<rect x="160" y="480" width="40" height="40" fill="#f0ffff" />
				<rect x="240" y="480" width="40" height="40" fill="#c0c0c0" />
				<rect x="0" y="520" width="40" height="40" fill="#d8bfd8" />
				<rect x="40" y="520" width="40" height="40" fill="#d8bfd8" />
				<rect x="80" y="520" width="40" height="40" fill="#ff4500" />
				<rect x="120" y="520" width="40" height="40" fill="#f0ffff" />
				<rect x="160" y="520" width="40" height="40" fill="#f0ffff" />
				<rect x="400" y="520" width="40" height="40" fill="#a0522d" />
				<rect x="0" y="560" width="40" height="40" fill="#d8bfd8" />
				<rect x="80" y="560" width="40" height="40" fill="#ff4500" />
				<rect x="120" y="560" width="40" height="40" fill="#ff4500" />
				<rect x="160" y="560" width="40" height="40" fill="#f0ffff" />
				<rect x="240" y="560" width="40" height="40" fill="#8b0000" />
				<rect x="280" y="560" width="40" height="40" fill="#8b0000" />
				<rect x="400" y="560" width="40" height="40" fill="#a0522d" />
				<rect x="440" y="560" width="40" height="40" fill="#a0522d" />
				<rect x="0" y="600" width="40" height="40" fill="#d8bfd8" />
				<rect x="120" y="600" width="40" height="40" fill="#ff4500" />
				<rect x="200" y="600" width="40" height="40" fill="#8b0000" />
				<rect x="240" y="600" width="40" height="40" fill="#8b0000" />
				<rect x="440" y="600" width="40" height="40" fill="#a0522d" />
			</svg>
		</Box>
	);
};

export default GenericSVG;
