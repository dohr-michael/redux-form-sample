import { reduxForm } from 'redux-form';
import { FieldValidationFormBase } from '../components';
import { FormData } from '../models';


function submit( values: Partial<FormData> ) {
    return new Promise( resolve => {
        setTimeout( () => {
            alert( `Submit : ${JSON.stringify( values, null, 2 )}` );
            resolve();
        }, 1000 );
    } );
    
}

const FieldValidationForm = reduxForm<FormData>( { form: 'field-validation', onSubmit: submit } )( FieldValidationFormBase );

export { FieldValidationForm };