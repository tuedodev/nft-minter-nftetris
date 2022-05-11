export type InitFormType = {
    [key: string]: any
}

export type FormValidationItemType = {
            regex: RegExp,
            errorMsg: string
}

export type TextFieldType = {
    [key: string]: TextFieldItemType
}

export type TextFieldItemType = {
        value: string,
        label: string,
        required?: boolean,
        valid: boolean,
        validation: Array<FormValidationItemType>,
        select?: Array<SelectItemType>,
        selectHandler?: (event: React.ChangeEvent<HTMLInputElement>)=>void;
}

export type SelectItemType = {
    value: string,
    label: string
}

export type FormType = {
    [key: string]: FormTypeItem
}

export type FormTypeItem = {
    value: string,
    errorMsg: string
}
