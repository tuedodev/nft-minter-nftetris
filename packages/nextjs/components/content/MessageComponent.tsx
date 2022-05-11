import { Collapse } from '@mui/material';
import { useState, useEffect } from 'react';

type MessageComponentProps = {
	component: React.ReactNode | null;
};
const MessageComponent = (props: MessageComponentProps) => {
	const { component } = props;
	const [state, setState] = useState(false);

	useEffect(() => {
		if (!state) {
			setState(true);
		}
	}, []);

	return (
		<Collapse in={state} timeout={450}>
			{component}
		</Collapse>
	);
};

export default MessageComponent;
