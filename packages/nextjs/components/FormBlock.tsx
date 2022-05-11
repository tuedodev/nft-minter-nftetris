import { Box } from '@mui/material';
import FormItem from './FormItem';
import { InitFormType, TextFieldType } from '../types/form';

type FormBlockProps = {
	initValue: TextFieldType;
	obj: InitFormType;
	sx?: React.CSSProperties;
};
const FormBlock = (props: FormBlockProps) => {
	const { initValue, obj, sx } = props;
	return (
		<Box sx={sx}>
			{Object.keys(initValue).map((item, index) => {
				const itemObj = initValue[item];
				return <FormItem id={item} itemObj={itemObj} key={index} itemBind={obj[item]?.bind} />;
			})}
		</Box>
	);
};

export default FormBlock;
