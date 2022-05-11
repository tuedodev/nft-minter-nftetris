import React, { useContext, useEffect, useRef } from 'react';
import { GameContext } from './GameContext';
import Counter from './Counter';
import GameHeaderBox from './GameHeaderBox';
import TetrisItem from './TetrisItem';
import styled from 'styled-components';
import { MESSAGE } from '../config/constants';
import { Grid, FormGroup, FormControlLabel, Switch, Box, Fade, Chip } from '@mui/material';
import { ItemObjectType } from '../types/game';

type TetrisCanvasProps = {
	nextItem: ItemObjectType | undefined;
	itemArray: Array<ItemObjectType>;
	counter: number;
	score: number;
	isCounting: boolean;
	initSpeed: boolean;
	itemsConfig: { [key: string]: any };
	ref?: React.RefObject<HTMLElement>;
	speedHandler: (value: boolean) => void;
};

const GameHeaderWrapper = styled.div<{ unit: number }>`
	height: ${(props) => (props.unit ? `${props.unit * 2}px` : `160px`)};
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const GameHeader = React.forwardRef<HTMLElement, TetrisCanvasProps>((props, ref) => {
	const { nextItem, itemArray, isCounting, counter, score, initSpeed, speedHandler, itemsConfig } = props;
	const speedHandlerRef = useRef(speedHandler);
	const context = useContext(GameContext);
	const unit = context!.unit;
	const currentItem = itemArray[itemArray.length - 1];
	let displayNextItem = nextItem && ((currentItem && currentItem.y > 2) || !isCounting);
	let displayComingSoon = !displayNextItem && isCounting;
	const [toggled, setToggled] = React.useState(initSpeed);
	const NextItem = () =>
		displayNextItem ? (
			<Box>
				<TetrisItem
					styles={{ maxHeight: '60px', maxWidth: '80%' }}
					itemsConfig={itemsConfig}
					variant={nextItem!.variant}
					rotationIndex={nextItem!.rotationIndex}
					colorFill={nextItem!.colorFill}
					strokeFill={nextItem!.colorFill}
					strokeWidth={0}
					timestamp={Date.now()}
				/>
			</Box>
		) : null;

	function switchHandler() {
		setToggled((toggled) => !toggled);
	}

	useEffect(() => {
		if (speedHandlerRef.current) {
			speedHandlerRef.current.call(null, toggled);
		}
	}, [toggled]);

	useEffect(() => {
		setToggled(initSpeed);
	}, [initSpeed]);

	return (
		<Grid container alignItems="center" sx={{ marginTop: '26px' }}>
			<Grid item xs={3}>
				<Counter counter={counter} basis={context?.config.INITIAL_COUNTER_VALUE} />
			</Grid>
			<Grid item xs={3}>
				<Box sx={{ position: 'relative', display: 'inline-flex', height: 'fit-content', width: '100%' }}>
					<GameHeaderBox ref={ref} text={score.toString()} justifyContent="flex-end" padding="0 1.2rem 0 0" />
				</Box>
			</Grid>
			<Grid item xs={3}>
				<FormGroup>
					<FormControlLabel
						control={<Switch checked={toggled} onChange={switchHandler} />}
						label={toggled ? `Speedy` : `Slow`}
					/>
				</FormGroup>
			</Grid>
			<Grid item xs={3}>
				<GameHeaderWrapper unit={unit}>
					{displayNextItem ? (
						<NextItem />
					) : (
						displayComingSoon && (
							<Fade in={true}>
								<Chip label={MESSAGE.COMING_NEXT} color="primary" size="small" />
							</Fade>
						)
					)}
				</GameHeaderWrapper>
			</Grid>
		</Grid>
	);
});

export default GameHeader;
