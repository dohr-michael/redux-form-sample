import * as React from 'react';
import { createSelector } from 'reselect';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import { /*Field, */InjectedFormProps, Validator } from 'redux-form';
// To Works with Semantic Ui, you need a wrapper on Field to propagate props to Semantic.
// In Component folder I've created this wrapper with correct typing.
import { Field } from '../../../components';
import { FormData } from '../models';


const required = value => value === undefined || value === '' ? 'required' : undefined;

// During the re-render of a Field with a validate function, we need a stable function (not change between 2 renderer)
// When you write only ( minLength ) => value => ... the instance of the function is reprocess at each re-render.
// To avoid that, I'm using the library `reselect` who will manage a cache of function (per minLength / maxLength value).
// So the minLength(5) is unique and we can now use `validate={[ minLength(5) ]}`

// minLength : ( minLength: number ) => Validator
const minLength = createSelector( ( min: number ) => min, min => ( value ) => {
    if( !value || !value.hasOwnProperty( 'length' ) ) return undefined;
    const length = value.length;
    if( min !== undefined && length < min ) return `Length must be greeter than ${min}`;
    return undefined;
} );

// maxLength : ( maxLength: number ) => Validator
const maxLength = createSelector( ( max: number ) => max, max => ( value ) => {
    if( !value || !value.hasOwnProperty( 'length' ) ) return undefined;
    const length = value.length;
    if( minLength !== undefined && length > max ) return `Length must be lower than ${max}`;
    return undefined;
} );

const email = ( value ) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( value ) ? 'Invalid email address' : undefined;

const minValue = createSelector( ( min: number ) => min, min => ( v ) => {
    const value = parseFloat( v );
    if( isNaN( value ) ) return undefined;
    return value < min ? `Value must be greater than ${min}` : undefined;
} );

const maxValue = createSelector( ( max: number ) => max, max => ( v ) => {
    const value = parseFloat( v );
    if( isNaN( value ) ) return undefined;
    return value > max ? `Value must be lower than ${max}` : undefined;
} );

const FieldValidationForm: React.ComponentType<InjectedFormProps<FormData>> = props => (
    <Form onSubmit={ props.handleSubmit }>
        <Field.Input name="firstName" label="First Name" placeholder="Bruce" required
                     validate={ [ required, minLength( 3 ), maxLength( 15 ) ] }/>
        <Field.Input name="lastName" label="Last Name" placeholder="Wayne"
                     validate={ [ required, minLength( 3 ), maxLength( 15 ) ] }/>
        <Field.Input name="email" label="Email" placeholder="bruce.wayne@gmail.com"
                     validate={ [ email ] }/>
        <Field.Int name="age" label="Age"
                   validate={ [ minValue( 18 ) ] }
                   warn={ maxValue( 65 ) }/>
        <Form.Group inline>
            <Button type="submit" loading={ props.submitting } disabled={ props.pristine }>
                Submit
            </Button>
            <Button onClick={ props.reset } disabled={ props.pristine || props.submitting }>
                Reset
            </Button>
        </Form.Group>
    </Form>
);


export { FieldValidationForm };
