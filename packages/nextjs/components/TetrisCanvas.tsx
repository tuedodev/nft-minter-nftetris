import { Box } from '@mui/material';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { UNIT_INITIAL_VALUE } from '../config/constants';
import { rotationIndexNormalized } from '../lib/helper';
import { ItemObjectType, MatrixType, TilePropsType, TileWrapperProps } from '../types/game';
import Controls from './Controls';
import { GameContext } from './GameContext';
import TetrisItem from './TetrisItem';

type TetrisCanvasProps = {
	styles: React.CSSProperties;
	itemArray: Array<ItemObjectType>;
	matrix: MatrixType;
	itemsConfig: { [key: string]: any };
};

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	grid-template-rows: auto;
	position: relative;
`;

const Tile = (props: TilePropsType) => (
	<Box
		component="div"
		sx={{
			backgroundColor: props.colorFill && props.colorFill.length > 0 ? `${props.colorFill}` : `transparent`,
			'&:before': {
				content: '""',
				display: 'block',
				paddingTop: '100%',
			},
		}}
	/>
);

const TileWrapper = (props: TileWrapperProps) => (
	<Box
		component="div"
		sx={{
			position: 'absolute',
			transformOrigin: '50% 50%',
			display: 'flex',
			top: props.positionCorrection
				? `${(props.y + props.positionCorrection.v) * props.unit}px`
				: `${props.y * props.unit}px`,
			left: props.positionCorrection
				? `${(props.x + props.positionCorrection.h) * props.unit}px`
				: `${props.x * props.unit}px`,
			transform: `rotate(${props.rotationIndex * 90}deg)`,
			transition: `transform 0.2s ease, top ${props.speed}ms linear, left 0.08s ease, right 0.08s ease`,
		}}
	>
		{props.children}
	</Box>
);

const TetrisCanvas = (props: TetrisCanvasProps) => {
	const { styles, itemArray, matrix, itemsConfig } = props;
	let currentItem = itemArray.length > 0 ? itemArray[itemArray.length - 1] : undefined;
	const context = useContext(GameContext);
	const unit = context?.unit || UNIT_INITIAL_VALUE;
	const speed = context?.speed || 400;
	const { positionCorrection = { h: 0, v: 0 } } = currentItem
		? itemsConfig[currentItem.variant].values[rotationIndexNormalized(currentItem.rotationIndex)]
		: {};

	return (
		<div>
			<Container style={styles}>
				<Controls />
				{matrix.map((row, indexRow) => {
					return row.map((column, indexColumn) => {
						const id_row = indexRow < 10 ? `0${indexRow}` : `${indexRow}`;
						const id_column = indexColumn < 10 ? `0${indexColumn}` : `${indexColumn}`;
						const id: string = `tile ${id_row} - ${id_column}`;
						let col = column.status > 0 ? column.colorFill : null;
						col = column.status === 2 ? '#ffffff' : col;
						return <Tile key={id} id={id} colorFill={col}></Tile>;
					});
				})}
				{itemArray.map((item, index, arr) => {
					return index === arr.length - 1 ? (
						<TileWrapper
							x={item.x}
							key={index}
							speed={speed}
							positionCorrection={positionCorrection}
							y={item.y}
							rotationIndex={item.rotationIndex}
							unit={unit}
						>
							<TetrisItem
								styles={{}}
								variant={item.variant}
								itemsConfig={itemsConfig}
								rotationIndex={0}
								unit={unit}
								colorFill={item.colorFill}
								strokeFill={item.colorFill}
								strokeWidth={0}
								timestamp={Date.now()}
							/>
						</TileWrapper>
					) : null;
				})}
			</Container>
		</div>
	);
};

export default TetrisCanvas;
