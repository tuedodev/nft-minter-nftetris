import { Box, Container, Link, Slide, Grow, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ConditonalWrapper } from './CondititionalWrapper';

type StaticFooterProps = {
	slideIn?: boolean;
	timeout?: number | { enter: number; exit: number };
	rootMargin?: string;
	minHeight?: string;
	threshold?: number[];
};
const StaticFooter = (props: StaticFooterProps) => {
	const {
		slideIn = false,
		rootMargin = '0px',
		threshold = [1],
		timeout = { enter: 225, exit: 195 },
		minHeight = '42px',
	} = props;
	const [isIntersected, setIsIntersected] = useState<boolean | undefined>();
	const [isEntered, setIsEntered] = useState(false);
	const intersectionElement = useRef<HTMLDivElement | null>(null);
	let previousY = 0;

	useEffect(() => {
		const { current } = intersectionElement;
		const observer: IntersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsIntersected(true);
					} else {
						setIsIntersected(false);
					}
				});
			},
			{
				root: document.querySelector('root'),
				rootMargin,
				threshold,
			}
		);
		observer.observe(current as HTMLDivElement);

		return () => observer.unobserve(current as HTMLDivElement);
	}, []);

	function onEnteredHandler() {
		if (!isEntered) {
			setIsEntered(true);
		}
	}
	return (
		<Container disableGutters>
			<div
				ref={intersectionElement}
				style={{
					minHeight: '160px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ConditonalWrapper
					condition={slideIn}
					wrapper={(children) => (
						<Slide direction="up" onEntered={onEnteredHandler} in={isIntersected}>
							<Grow in={isEntered} {...(isEntered ? { timeout: 600 } : {})}>
								{children}
							</Grow>
						</Slide>
					)}
				>
					<Box
						sx={{
							boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
							borderRadius: '0.35rem',
							minHeight: minHeight,
							width: 1,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography sx={{ letterSpacing: '3px' }} variant="body1">
							&copy;&nbsp;
							<Link
								variant="body1"
								href="https://www.tuedo.de"
								target="_blank"
								rel="noopener noreferrer nofollow"
								underline="none"
							>
								tuedo.de
							</Link>
						</Typography>
					</Box>
				</ConditonalWrapper>
			</div>
		</Container>
	);
};

/**
 * As the props for this static component never changes, the compare function (2nd argument) returns always true
 */
export default React.memo(StaticFooter, (prevProps, nextProps) => true);
