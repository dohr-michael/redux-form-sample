import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { /*Field, */InjectedFormProps } from 'redux-form';
// To Works with Semantic Ui, you need a wrapper on Field to propagate props to Semantic.
// In Component folder I've created this wrapper with correct typing.
import { Field } from '../../../components';
import { FormData } from '../models';


const GlobalValidationForm: React.ComponentType<InjectedFormProps<FormData>> = props => (
    <Form onSubmit={ props.handleSubmit }>
        <Field.Input name="firstName" label="First Name" placeholder="Bruce" required/>
        <Field.Input name="lastName" label="Last Name" placeholder="Wayne"/>
        <Field.Input name="email" label="Email" placeholder="bruce.wayne@gmail.com"/>
        <Field.Int name="age" label="Age"/>
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


export { GlobalValidationForm };