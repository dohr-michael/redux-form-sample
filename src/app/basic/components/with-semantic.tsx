import * as React from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import { /*Field, */InjectedFormProps } from 'redux-form';
// TO Works with Semantic Ui, you need a wrapper on Field to propagate props to Semantic.
// In Component folder I've created this wrapper with correct typing.
import { Field } from '../../../components';
import { FormData } from '../models';

const colors = [
    { key: '', text: '', value: '' },
    { key: 'r', text: 'Red', value: 'FF0000' },
    { key: 'g', text: 'Green', value: '00FF00' },
    { key: 'b', text: 'Blue', value: '0000FF' },
];


const BasicForm: React.ComponentType<InjectedFormProps<FormData>> = props => (
    <Form onSubmit={ props.handleSubmit }>
        <Field.Input name="firstName" label="First Name" placeholder="Bruce"/>
        <Field.Input name="lastName" label="Last Name" placeholder="Wayne"/>
        <Field.Input name="email" label="Email" placeholder="bruce.wayne@gmail.com"/>
        <Form.Group inline>
            <label>Sex</label>
            <Field.Radio name="sex" value="male" label="Male"/>
            <Field.Radio name="sex" value="female" label="Female"/>
        </Form.Group>
        <Field.Select name="favoriteColor" label="Favorite Color" placeholder="Select ..." options={ colors }/>
        <Field.Checkbox name="employed" label="Employed"/>
        <Field.TextArea name="notes" label="Notes"/>
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


export { BasicForm };
