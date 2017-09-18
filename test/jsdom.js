const jsdom = require( 'jsdom/lib/old-api.js' ).jsdom;

const exposedProps = [ 'window', 'navigator', 'document' ];
global.document = jsdom('<!DOCTYPE html><body></body>');
global.window = document.defaultView;
Object.keys( document.defaultView ).forEach( k => {
    if( typeof global[k] === 'undefined' ) {
        exposedProps.push( k );
        global[k] = document.defaultView[k];
    }
});
window.Object = Object;
window.Math = Math;
global.navigator = {
    userAgent: 'node.js'
};
