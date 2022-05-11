import styled from 'styled-components';

type AnimationsPropsType = {
	text: string;
	y: number;
	unit: number;
	targetX: number;
	targetY: number;
	backgroundColor?: string;
	handler?: (object: { scoreValue: string; key: string }) => void;
	id: string;
};
type styledProps = {
	startY: number;
	targetY: number;
	targetX: number;
	unit: number;
	backgroundColor: string;
};
const AnimatedItem = styled.div<styledProps>`
	z-index: 20;
	position: absolute;
	top: ${(props) => `${props.startY + 6}px`};
	left: 0px;
	margin: 0 auto;
	background-color: ${(props) => props.backgroundColor};
	align-items: center;
	justify-content: center;
	display: flex;
	width: 100%;
	animation-name: animateScore;
	animation-duration: 1.2s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
	animation-delay: 0.3s;
	& span {
		display: inline-flex;
		align-items: center;
		height: ${(props) => `${props.unit}px`};
		font-size: ${(props) => `${props.unit - 2}px`};
		font-weight: bold;
		color: white;
		padding: 0;
	}

	@keyframes animateScore {
		0% {
			display: flex;
			opacity: 1;
			transform: translate(0, 0);
		}
		99% {
			display: flex;
			opacity: 0.2;
		}
		100% {
			width: 20%;
			height: 0;
			opacity: 0;
			display: none;
			visibility: hidden;
			transform: ${(props) => `translate(${props.targetX}px, ${-(props.startY - props.targetY)}px)`};
		}
	}
`;

const AnimationsItem = (props: AnimationsPropsType) => {
	const { text, y, unit, targetX, targetY, handler, id } = props;

	function animationEnd() {
		if (handler) {
			handler.call(null, { scoreValue: text, key: id });
		}
	}

	return (
		<AnimatedItem
			startY={y}
			unit={unit}
			backgroundColor="orange"
			targetX={targetX}
			targetY={targetY}
			onAnimationEnd={animationEnd}
		>
			<span>{text}</span>
		</AnimatedItem>
	);
};

export default AnimationsItem;
