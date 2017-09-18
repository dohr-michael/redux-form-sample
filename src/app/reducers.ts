import { ReducersMapObject } from 'redux';
import * as reduxForm from 'redux-form';
import * as reduxRouter from 'react-router-redux';

export type Stores = {
    form: reduxForm.FormState;
    router: reduxRouter.RouterState;
};

export const reducers: ReducersMapObject = {
    form:   reduxForm.reducer,
    router: reduxRouter.routerReducer,
};
