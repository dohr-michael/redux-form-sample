import { Epic, combineEpics } from 'redux-observable';


export const allEpics: Epic<any, any>[] = [];

export const epics: Epic<any, any> = ( action$, store ) => combineEpics<any>( ...allEpics )( action$, store ).catch( ( err, source ) => {
    console.log( err );
    return source;
} );