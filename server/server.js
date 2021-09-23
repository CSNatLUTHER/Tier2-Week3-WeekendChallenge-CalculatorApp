// REQUIRES
    let express = require ( 'express' );
    let app = express();

    let bodyParser = require ( 'body-parser' );

// USES
    app.use ( express.static( 'server/public' ) );
    app.use (bodyParser.urlencoded( { extended: true } ) );

// GLOBAL VIARIABLES
    const port = 5000;

// SPIN UP SERVER
    app.listen( port, () => {
        console.log( 'server is up on:', port );
    })
// ROUTES