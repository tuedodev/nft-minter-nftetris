import GameHeaderBox from './GameHeaderBox';
import Box from '@mui/material/Box';

type CounterProps = {
	counter: number;
	basis: number;
};

const Counter = (props: CounterProps) => {
	const { counter, basis = 60 } = props;

	return (
		<Box sx={{ position: 'relative', display: 'inline-flex', height: 'fit-content' }}>
			<GameHeaderBox text={counter.toString()} value={((counter % basis) / basis) * 100} />
		</Box>
	);
};

export default Counter;
