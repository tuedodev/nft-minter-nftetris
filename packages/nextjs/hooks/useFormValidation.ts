import React, { useState } from "react"
import { TextFieldType, InitFormType } from "../types/form";

const NO_ERROR = ' '; // empty char in order to display helper text field permanently
const FIELD_REQUIRED = {regex: /\S/g, errorMsg: 'Mandatory Field'};

export const useFormValidation = (props: TextFieldType) => {
    const {initValue, initValid, initHelperText} = getInitValues();
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(initValid);
    const [helperText, setHelperText] = useState(initHelperText);

    function getInitValues(){
        let initValue: InitFormType = {};
        let initValid: InitFormType = {};
        let initHelperText: InitFormType = {};
        for (const [key, value] of Object.entries(props)) {
            initValue[key] = value.value;
            initValid[key] = value.valid;
            initHelperText[key] = NO_ERROR;
        }
        return {initValue, initValid, initHelperText};
    }

    let obj: InitFormType = {};

    for (const [key, val] of Object.entries(props)) {
        obj[key] = {
            value: value[key],
            isValid: isValid[key],
            required: val.required,
            bind: {
                value: value![key],
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(prev => {
                        return {...prev, [key]: event.target.value};
                    });
                    const required = event.target.required;
                    let validationArr = required ? [FIELD_REQUIRED]: [];
                    validationArr = validationArr.concat(val.validation);
                    let errArr = validationArr.map(v => {
                        return event.target.value.search(v.regex);
                    });
                    let validationState = errArr.filter(i => i < 0).length === 0 ? true : false;
                    let index = errArr.findIndex(e => e === -1 );
                    let errorMsg = validationState ? NO_ERROR : validationArr[index].errorMsg;
                    setHelperText(prev => {
                        return {...prev, [key]: errorMsg};
                    });
                    setIsValid(prev => {
                        return {...prev, [key]: validationState};
                    });
                    if (val.select && val.selectHandler){
                        val.selectHandler.call(null, event);
                    }
                },
                helperText: isValid[key] ? NO_ERROR : helperText![key],
                error: !isValid[key],
            },
        }
    }
    obj.resetValue = () => {
        const {initValue, initValid, initHelperText} = getInitValues();
        setValue(initValue);
        setIsValid(initValid);
        setHelperText(initHelperText);
    };
    obj = {...obj, get disabled(){
        let valid =  Object.keys(initValue).map(item=>{
            let isValid = obj[item].isValid;
            let isNotRequired = obj[item].required ? false : true;
            let isRequiredAndNotEmpty = isNotRequired ? true: obj[item].value.length > 0;
            return isValid && isRequiredAndNotEmpty ;
        }).filter(x=>x).length === Object.keys(initValue).length;
        return !valid;
    }};
    return obj;
}