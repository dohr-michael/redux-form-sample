import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { FormData } from '../models';


const BasicForm: React.ComponentType<InjectedFormProps<FormData>> = props => (
    <form onSubmit={ props.handleSubmit } className="ui form">
        <div className="field">
            <label>First Name</label>
            <Field name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
        <div className="field">
            <label>Last Name</label>
            <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
        </div>
        <div className="field">
            <label>Email</label>
            <Field name="email" component="input" type="text" placeholder="Email"/>
        </div>
        <div className="field">
            <label>Sex</label>
            <div>
                <label>
                    <Field name="sex" component="input" type="radio" value="male"/>
                    &nbsp;
                    Male
                </label>
                &nbsp;
                &nbsp;
                <label>
                    <Field name="sex" component="input" type="radio" value="female"/>
                    &nbsp;
                    Female
                </label>
            </div>
        </div>
        <div className="field">
            <label>Favorite Color</label>
            <Field name="favoriteColor" component="select">
                <option/>
                <option value="FF0000">Red</option>
                <option value="00FF00">Green</option>
                <option value="0000FF">Blue</option>
            </Field>
        </div>
        <div className="field">
            <label>Employed</label>
            <Field name="employed" component="input" type="checkbox"/>
        </div>
        <div className="field">
            <label>Notes</label>
            <Field name="notes" component="textarea"/>
        </div>
        <button className="ui button" type="submit" disabled={ props.pristine || props.submitting }>
            Submit
        </button>
        <button className="ui button" type="submit" disabled={ props.pristine || props.submitting } onClick={ props.reset }>
            Clear
        </button>
    </form>
);


export { BasicForm };
