import React, { useEffect, useRef, useState } from 'react';

const IntersectionObserverComponent = (props: { children: React.ReactNode }) => {
	const [isIntersected, setIsIntersected] = useState(false);
	const [scrollDirection, setscrollDirection] = useState<'DOWN' | 'UP' | null>(null);
	const intersectionElement = useRef<HTMLDivElement | null>(null);
	let previousY = 0;

	useEffect(() => {
		const observer: IntersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsIntersected(true);
					} else {
						setIsIntersected(false);
					}
					let currentY = entry.boundingClientRect.y;
					const gap = previousY - currentY;
					setscrollDirection(gap > 0 ? 'DOWN' : 'UP');
					previousY = currentY;
				});
			},
			{
				root: document.querySelector('root'),
				rootMargin: '36px',
				threshold: [0.95],
			}
		);
		observer.observe(intersectionElement.current as HTMLDivElement);

		return () => observer.unobserve(intersectionElement.current as HTMLDivElement);
	}, []);

	return (
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
			{React.cloneElement(props.children as React.ReactElement<any>, { isIntersected, scrollDirection })}
		</div>
	);
};

export default IntersectionObserverComponent;
