import { Grid, Box } from '@mui/material';
import { SimpleGridPropsType } from '../types/main';

function SimpleGrid(props: SimpleGridPropsType) {
	const { tableData, spacing = 0.5, direction = 'row' } = props;

	return (
		<Box sx={{ mb: 2, mt: 1 }}>
			<Grid container spacing={spacing} direction={direction}>
				{tableData.map((item, index) => {
					const { xs, sm, md, lg, xl, sx } = item;
					const itemProps = { xs, sm, md, lg, xl, sx };
					return (
						<Grid item key={index} {...(itemProps ?? {})}>
							{item.value}
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}

export default SimpleGrid;
