import { Box } from '@mui/material';
import { SimpleTablePropsType } from '../../../types/main';
import SimpleTable from '../../SimpleTable';

const InfoboxTable = (props: SimpleTablePropsType) => {
	const {
		tableHeader,
		tableData,
		divider = true,
		spacing = 0.5,
		sx = { mb: 2, mt: 1 },
		alignment,
		fontSize,
		fontColor,
	} = props;

	return (
		<Box sx={sx}>
			<SimpleTable
				tableHeader={tableHeader}
				tableData={tableData}
				divider={divider}
				spacing={spacing}
				alignment={alignment}
				fontSize={fontSize}
				fontColor={fontColor}
			/>
		</Box>
	);
};

export default InfoboxTable;
