import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ControlsIcon from './ControlsIcon';

const Controls = () => {
	return (
		<>
			<ControlsIcon
				color="primary"
				size="large"
				handlerProp="left"
				ariaLabel="left"
				styles={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translate(0, -50%)', zIndex: 10 }}
			>
				<ArrowBackIosNewIcon />
			</ControlsIcon>
			<ControlsIcon
				color="primary"
				size="large"
				handlerProp="right"
				ariaLabel="right"
				styles={{
					position: 'absolute',
					right: '1.2rem',
					top: '50%',
					transform: 'translate(0, -50%) rotate(180deg)',
					zIndex: 10,
				}}
			>
				<ArrowBackIosNewIcon />
			</ControlsIcon>
			<ControlsIcon
				color="primary"
				size="large"
				handlerProp="up"
				ariaLabel="up"
				styles={{
					position: 'absolute',
					left: '50%',
					top: '35%',
					transform: 'translate(-50%, 0) rotate(90deg)',
					zIndex: 10,
				}}
			>
				<ArrowBackIosNewIcon />
			</ControlsIcon>
			<ControlsIcon
				color="primary"
				size="large"
				handlerProp="down"
				ariaLabel="down"
				styles={{
					position: 'absolute',
					left: '50%',
					bottom: '35%',
					transform: 'translate(-50%, 0) rotate(270deg)',
					zIndex: 10,
				}}
			>
				<ArrowBackIosNewIcon />
			</ControlsIcon>
		</>
	);
};

export default Controls;
