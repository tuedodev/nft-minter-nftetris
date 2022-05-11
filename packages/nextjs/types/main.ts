import { DialogBoxContentType, ItemObjectType } from "./game";

export type InitType = {
    handler: (dispatch: string) => void;
}

export type FormType = {
    [key: string]: FormTypeItem
}

export type FormTypeItem = {
    value: string,
    errorMsg: string
}

export type GameContextType = {
    currentItem: ItemObjectType,
    unit: number,
    controlsHandler: (text: string) => void,
    speed: number,
    config: {[key: string]:any},
    dialogBoxContent: DialogBoxContentType,
}

export type FormValidationItemType = {
            regex: RegExp,
            errorMsg: string
}

export type TextFieldType = {
    [key: string]: {
        value: string,
        label: string,
        required?: boolean,
        valid: boolean,
        validation: Array<FormValidationItemType>,
        select?: Array<string> 
    }
}

export type CurrentContractType = {
  currentContract: Record<string, any> | undefined | null;
}

export type SimpleTableDataType = {values: Array<string | React.ReactElement>, sx?: Record<string, any> | undefined};

export type SimpleTablePropsType = {
    tableData: SimpleTableDataType[],
    tableHeader?: React.ReactElement,
    alignment?: Array<'left' | 'right' | 'center' | 'justify'>,
    spacing?: number,
    divider?: boolean,
    fontSize?: string,
    fontColor?: string,
    sx?: Record<string, any>,
}
export type GridItemType = number | boolean | 'auto';

export type SimpleGridPropsType = {
    tableData: {value: string | React.ReactElement, sx?: Record<string, any>, xs?: GridItemType, sm?: GridItemType, md?: GridItemType, lg?: GridItemType, xl?: GridItemType}[],
    direction?: 'row' | 'column',
    spacing?: number,
}