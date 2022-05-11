import { Divider, Chip, useTheme, PaletteColor } from '@mui/material';

type DialogHeaderProps = {
	label: string;
	size: 'big' | 'medium' | 'small';
	color?: string | PaletteColor;
	backgroundColor?: string | PaletteColor;
};

const DialogHeader = (props: DialogHeaderProps) => {
	const theme = useTheme();
	const {
		label,
		size = 'medium',
		color = theme.palette.text.primary,
		backgroundColor = theme.palette.action.selected,
	} = props;

	const propsObject: Record<'small' | 'medium' | 'big', { size: 'small' | 'medium'; sx: Record<string, any> }> = {
		small: {
			size: 'small',
			sx: { color: color, backgroundColor: backgroundColor },
		},
		medium: {
			size: 'medium',
			sx: { color: color, backgroundColor: backgroundColor },
		},
		big: {
			size: 'medium',
			sx: {
				fontSize: '1.25rem',
				height: '40px',
				borderRadius: '20px',
				color: color,
				backgroundColor: backgroundColor,
			},
		},
	};
	return (
		<Divider>
			<Chip label={label} size={propsObject[size].size} sx={{ ...propsObject[size].sx }} />
		</Divider>
	);
};

export default DialogHeader;
