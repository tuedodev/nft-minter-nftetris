import React from 'react';
import { itemsConfigFunction } from '../config/itemsConfigFunction';
import { rotationIndexNormalized } from '../lib/helper';

type TetrisItemProps = {
	variant: 'line' | 'square' | 'triangle' | 'l_shape' | 's_shape';
	rotationIndex: number;
	itemsConfig: { [key: string]: any };
	unit?: number;
	timestamp: number;
	colorFill?: string;
	strokeFill?: string;
	strokeWidth?: number;
	strokeOpacity?: number;
	styles?: React.CSSProperties;
};

const TetrisItem = (props: TetrisItemProps) => {
	const {
		variant,
		rotationIndex = 0,
		unit = 40,
		colorFill = 'currentColor',
		strokeFill = 'currentColor',
		strokeOpacity,
		strokeWidth = 0,
		styles,
	} = props;

	let itemsConfig = itemsConfigFunction(unit);

	if (['line', 'square', 'triangle', 'l_shape', 's_shape'].includes(variant)) {
		const { pointsString, viewBox, width, height } =
			itemsConfig[variant].values[rotationIndexNormalized(rotationIndex)];
		return (
			<svg xmlns="http://www.w3.org/2000/svg" style={styles} viewBox={viewBox} width={width} height={height}>
				<polygon
					points={pointsString}
					fill={colorFill}
					stroke={strokeFill}
					strokeOpacity={strokeOpacity}
					strokeWidth={strokeWidth}
				/>
			</svg>
		);
	} else {
		return null;
	}
};

export default TetrisItem;
