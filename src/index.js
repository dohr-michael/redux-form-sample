const React = require( 'react' ),
      load  = require( './app' ).default;

require( './index.scss' );


function startApp() {
    window.React = React;
    load();
}

startApp();
