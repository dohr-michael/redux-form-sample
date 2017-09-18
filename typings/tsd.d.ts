declare module 'app-config' {
    export const version: string;
}

declare module 'redux-devtools-extension' {
    import { GenericStoreEnhancer } from 'redux';
    export const composeWithDevTools: ( ...e: GenericStoreEnhancer[] ) => GenericStoreEnhancer;
}

declare module 'redux-devtools-extension/logOnlyInProduction' {
    import { GenericStoreEnhancer } from 'redux';
    export const composeWithDevTools: ( ...e: GenericStoreEnhancer[] ) => GenericStoreEnhancer;
}

declare type LocationChangeAction = { type: string, payload: { pathname: string, search: string, hash: string } };

