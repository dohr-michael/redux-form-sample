import * as React from 'react';
import { Field as BaseField, BaseFieldProps, WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import {
    Form,
    Checkbox,
    Dropdown,
    DropdownProps,
    CheckboxProps,
    Select,
    SelectProps,
    Input,
    InputProps,
    TextArea,
    TextAreaProps,
    Radio,
    RadioProps,
    FormFieldProps,
    FormInputProps,
    Label,
} from 'semantic-ui-react';


type SemanticFieldProps = FormFieldProps & {
    canAsync?: boolean;
    errorAs?: React.ComponentType<any>;
    warnAs?: React.ComponentType<any>;
    internalLabel?: boolean;
    className?: string;
    required?: boolean;
}

type SemanticFormFieldComponentProps = SemanticFieldProps & {
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
    label?: any;
    valueName?: 'value' | 'checked';
};

type FieldErrorProps = {
    meta: WrappedFieldMetaProps;
    className: string;
}

const FieldError: React.SFC<FieldErrorProps> = ( { meta, className, ...props } ) => (
    <div className={ className + '__error' }>
        <Label className={ className + '__error__label' } basic color='red' pointing content={ meta.error }/>
    </div>
);

const FieldWarn: React.SFC<FieldErrorProps> = ( { meta, className, ...props } ) => (
    <div className={ className + '__warning' }>
        <Label className={ className + '__warning__label' } basic color='yellow' pointing content={ meta.warning }/>
    </div>
);

const SemanticFormFieldComponent: React.SFC<SemanticFormFieldComponentProps> = ( { input, meta, required, control: Control = Input, errorAs: ErrorAs = FieldError, warnAs: WarnAs = FieldWarn, className, label, canAsync, valueName, internalLabel, ...props } ) => {
    const { touched, error, warning, asyncValidating } = meta;
    const vname = valueName || 'value';
    
    function handleChange( e, data ) {
        return input.onChange( data[ vname ] );
    }
    
    const additionalProps: any = {};
    if( canAsync && asyncValidating ) additionalProps.loading = true;
    if( internalLabel ) additionalProps.label = label;
    let onError = touched && !!error;
    const { value, ...passInput } = input;
    const valueProps = { [vname]: (vname === 'checked' ? value === true : value) };
    const field = (
        <Form.Field error={ onError } required={ required }>
            { internalLabel ? null : <label>{ label }</label> }
            <Control { ...passInput } { ...valueProps } { ...props } { ...additionalProps } onChange={ handleChange }/>
            { onError ? <ErrorAs meta={ meta } className={ className }/> : null }
            { !!warning ? <WarnAs meta={ meta } className={ className }/> : null }
        </Form.Field>
    );
    return field;
};

const defaultProps = { component: SemanticFormFieldComponent, canAsync: true };

class IntField<T = {}> extends BaseField<FormInputProps & T> {static defaultProps = { ...defaultProps, type: 'number' };}

class SelectField<T = {}> extends BaseField<SelectProps & T> {static defaultProps = { ...defaultProps, control: Select, };}

class RadioField<T = {}> extends BaseField<RadioProps & T> {static defaultProps = { ...defaultProps, canAsync: false, type: 'radio', internalLabel: true, control: Radio };}

class CheckboxField<T = {}> extends BaseField<CheckboxProps & T> {static defaultProps = { ...defaultProps, canAsync: false, type: 'checkbox', control: Checkbox, valueName: 'checked', internalLabel: true };}

class DropdownField<T = {}> extends BaseField<DropdownProps & T> {static defaultProps = { ...defaultProps, control: Dropdown, };}

class TextAreaField<T = {}> extends BaseField<TextAreaProps & T> {static defaultProps = { ...defaultProps, canAsync: false, control: TextArea, };}


class Field<T = {}> extends BaseField<InputProps & T> {
    static defaultProps = { ...defaultProps };
    static Radio = RadioField;
    static Checkbox = CheckboxField;
    static Dropdown = DropdownField;
    static TextArea = TextAreaField;
    static Select = SelectField;
    static Input = Field;
    static Int = IntField;
}

export { SemanticFieldProps, SelectField, CheckboxField, RadioField, DropdownField, TextAreaField, Field, SemanticFormFieldComponentProps, SemanticFormFieldComponent };