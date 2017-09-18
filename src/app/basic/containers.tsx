import { reduxForm } from 'redux-form';
import { BasicForm as BasicFormBase, SemanticBasicForm as SemanticBasicFormBase } from './components';
import { FormData } from './models';


function submit( values: Partial<FormData> ) {
    return new Promise( resolve => {
        setTimeout( () => {
            alert( `Submit : ${JSON.stringify( values, null, 2 )}` );
            resolve();
        }, 1000 );
    } );
    
}

const BasicForm = reduxForm<FormData>( { form: 'basic', onSubmit: submit } )( BasicFormBase );
const SemanticBasicForm = reduxForm<FormData>( { form: 'basic-semantic', onSubmit: submit } )( SemanticBasicFormBase );

export { BasicForm, SemanticBasicForm };