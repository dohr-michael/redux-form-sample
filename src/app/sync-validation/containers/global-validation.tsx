import { reduxForm, FormErrors } from 'redux-form';
import { FieldValidationFormBase, GlobalValidationFormBase } from '../components';
import { FormData } from '../models';


function submit( values: Partial<FormData> ) {
    return new Promise( resolve => {
        setTimeout( () => {
            alert( `Submit : ${JSON.stringify( values, null, 2 )}` );
            resolve();
        }, 1000 );
    } );
    
}

const GlobalValidationForm = reduxForm<FormData>( {
    form:     'global-validation', onSubmit: submit,
    validate: ( values, props ) => {
        // The complete validation of the form is done here.
        const res: FormErrors<FormData> = {};
        if( !values.email || values.email.length === 0 ) res.email = 'Required';
        else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email ) ) res.email = 'Invalid email';
        
        if( !values.firstName || values.firstName.length === 0 ) res.firstName = 'Required';
        
        return res;
    }
} )( GlobalValidationFormBase );


export { GlobalValidationForm };