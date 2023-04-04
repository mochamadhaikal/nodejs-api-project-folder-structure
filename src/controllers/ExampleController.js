const MainController = require('../system/MainController');
const ExampleModel = require('../models/ExampleModel');

const Models = new ExampleModel();

class ExampleController extends MainController {
    validate = async (req, res, next) => {
        try {
            const schema = {
                query_type: {
                    type: 'enum',
                    values: ['single', 'transaction'],
                },
            };

            const check = this.validator.compile(schema);
            const checkResult = check(req.body);

            if (checkResult === true) {
                return next();
            } else {
                this.m.code = '100';
                this.m.data = checkResult;
                return this.m.getMessage(res);
            }
        } catch (error) {
            return next(error);
        }
    };

    process = async (req, res, next) => {
        const body = req.body;
        const query_type = body.query_type;

        try {
            if (query_type === 'single') {
                const doQuery = await Models.singleQueryExample();
                if (doQuery.status) {
                    this.m.code = '000';
                    this.m.data = doQuery.data;
                } else {
                    this.m.code = '300';
                    this.m.message = doQuery.message;
                }
            } else {
                const doQuery = await Models.transactionQueryExample();
                if (doQuery.status) {
                    this.m.code = '000';
                    this.m.data = doQuery;
                } else {
                    this.m.code = '300';
                    this.m.message = doQuery.message;
                }
            }

            return this.m.getMessage(res);
        } catch (error) {
            return next(error);
        }
    };

    ping = async (req, res, next) => {
        this.log.debug('PING DEBUG', {});
        this.log.info('PING INFO', {});
        this.log.error('PING ERROR', {});
        this.log.warning('PING WARNING', {});

        try {
            this.m.code = '000';
            this.m.message = 'PONG!';
            return this.m.getMessage(res);
        } catch (error) {
            return next(error);
        }
    };

    err = async (req, res, next) => {
        this.log.debug('PING DEBUG', {});
        this.log.info('PING INFO', {});
        this.log.error('PING ERROR', {});
        this.log.warning('PING WARNING', {});

        try {
            throw new Error('testing error');
        } catch (error) {
            return next(error);
        }
    };
}

module.exports = ExampleController;
