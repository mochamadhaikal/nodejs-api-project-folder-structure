const express = require('express');
//define app
const app = express();

//define middleware bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const middleware = require('./middleware');

app.use(middleware.dbAuth);
app.use(middleware.logRequest);

//define routes
const indexroute = require('./routers');
const ExampleRoute = require('./routers/example');

const runServer = async () => {
    if (process.env.APPS_STAGE === 'dev' || process.env.APPS_STAGE === 'development') {
        app.use('/example', ExampleRoute);
    }

    app.use(indexroute);
    //token verification
    // app.use(middleware.tokenAuth)

    //invalid request handler: always place between others route and error handler
    // app.use(middleware.invalidRequest)

    //error handler: always place at the bottom of others middleware and routes
    app.use(middleware.errorHandler);
};

runServer();

module.exports = app;
