import { TableContainer, Table, TableRow, TableCell, useTheme, TableBody, TableHead } from '@mui/material';
import { SimpleTablePropsType } from '../types/main';

function SimpleTable(props: SimpleTablePropsType) {
	const theme = useTheme();
	const {
		tableData,
		alignment = ['left', 'right'],
		spacing = 0.5,
		divider = true,
		fontSize = theme.typography.body2.fontSize,
		fontColor = theme.palette.text.disabled,
		tableHeader = null,
	} = props;

	const borderObj = divider ? { borderBottom: `1px solid ${theme.palette.divider}` } : { borderBottom: '0' };

	return (
		<TableContainer>
			<Table>
				{tableHeader && <TableHead>{tableHeader}</TableHead>}
				<TableBody>
					{tableData.map((item, outerIndex) => {
						let sx = item.hasOwnProperty('sx') ? item.sx : {};
						return (
							<TableRow
								key={outerIndex}
								sx={{
									'& td': { px: 0, py: spacing, ...borderObj, fontSize: fontSize, color: fontColor },
									'&:last-child td': { borderBottom: '0' },
									...sx,
								}}
							>
								{item.values.map((column, innerIndex) => {
									return (
										<TableCell key={innerIndex} align={alignment[innerIndex]}>
											{column}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default SimpleTable;
