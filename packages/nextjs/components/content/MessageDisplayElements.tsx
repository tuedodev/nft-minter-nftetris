import { Box } from '@mui/material';
import React from 'react';

type MessageDisplayElementsType = {
	components: React.ReactElement[];
};
const MessageDisplayElements = (props: MessageDisplayElementsType) => {
	const { components } = props;
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{components.map((element, index) => {
				return <React.Fragment key={index}>{element}</React.Fragment>;
			})}
		</Box>
	);
};

export default MessageDisplayElements;
