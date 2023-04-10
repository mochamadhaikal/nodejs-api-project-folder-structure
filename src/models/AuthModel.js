const MainModel = require('../system/MainModel');
module.exports = class ModelAuth extends MainModel {
    getUserdata = async (username) => {
        const sql = 'SELECT * FROM users WHERE username=?';
        const param = [username];
        const runQuery = await this.query(sql, param, this.queryType.SELECT);
        return runQuery;
    };

    updateUserAccess = async (id, accessDate) => {
        const sql = 'UPDATE users SET last_access=? WHERE id=?';
        const param = [accessDate, id];
        const runQuery = await this.query(sql, param, this.queryType.UPDATE);
        return runQuery;
    };
};
