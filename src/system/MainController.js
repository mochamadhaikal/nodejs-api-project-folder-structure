const Validator = require('fastest-validator');
const { util, log, m } = require('../libraries');

class MainController {
    util = util;
    log = log;
    m = m;
    validator = new Validator();
}

module.exports = MainController;
