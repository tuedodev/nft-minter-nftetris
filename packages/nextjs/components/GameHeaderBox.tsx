import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

type GameHeaderBoxPropsType = {
	text: string;
	value?: number | undefined;
	justifyContent?: string;
	padding?: string | undefined;
};

const GameHeaderBox = React.forwardRef<HTMLElement, GameHeaderBoxPropsType>((props, ref) => {
	return (
		<>
			<CircularProgress size={80} thickness={5} color="primary" variant="determinate" value={props.value} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: props.justifyContent ? props.justifyContent : 'center',
				}}
			>
				<Typography
					variant="body1"
					sx={{ fontSize: '2.6rem', fontWeight: 'bold', padding: `${props.padding}` }}
					component="div"
					color="text.primary"
				>
					<span ref={ref}>{props.text}</span>
				</Typography>
			</Box>
		</>
	);
});

export default GameHeaderBox;
