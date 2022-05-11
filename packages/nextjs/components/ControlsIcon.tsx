import React, { useContext } from 'react';
import { Fab } from '@mui/material';
import { GameContext } from './GameContext';

type ControlStatusProps = {
	color: 'primary' | 'inherit' | 'secondary' | 'default' | undefined;
	handlerProp: string;
	size?: 'large' | 'small' | 'medium' | undefined;
	ariaLabel: string;
	styles: React.CSSProperties;
	children: React.ReactNode;
};

const ControlsIcon = (props: ControlStatusProps) => {
	const { color = 'primary', size = 'large', ariaLabel = 'control', styles, handlerProp } = props;
	const context = useContext(GameContext);
	const controlsHandler = context?.controlsHandler as (value: string) => void;
	return (
		<Fab
			onClick={() => controlsHandler(handlerProp)}
			color={color}
			size={size}
			aria-label={ariaLabel}
			style={styles}
			sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
		>
			{props.children}
		</Fab>
	);
};

export default ControlsIcon;
