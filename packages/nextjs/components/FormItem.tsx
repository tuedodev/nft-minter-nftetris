import { TextField, MenuItem } from '@mui/material';
import { TextFieldItemType } from '../types/form';

type FormItemProps = {
	itemObj: TextFieldItemType;
	itemBind: any;
	id: string;
};
const FormItem = (props: FormItemProps) => {
	const { itemObj, itemBind, id } = props;
	return (
		<TextField
			variant="standard"
			size="medium"
			fullWidth
			id={id}
			{...itemBind}
			label={itemObj.label}
			autoComplete="off"
			select={itemObj.select && itemObj.select.length > 0}
		>
			{itemObj.select &&
				itemObj.select.map((sel, selIndex) => {
					return (
						<MenuItem key={selIndex} value={sel.value}>
							{sel.label}
						</MenuItem>
					);
				})}
		</TextField>
	);
};

export default FormItem;
