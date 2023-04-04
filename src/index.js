const dotenv = require('dotenv');
dotenv.config();
const app = require('./server');
const { log } = require('./libraries');

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
    log.info(`Server start on port ${SERVER_PORT} at ${new Date()}`, {});
});
