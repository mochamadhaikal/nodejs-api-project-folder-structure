const log = require('./logger');

class QueryGenerator {
    insert(table_name, data) {
        let result = {
            status: false,
            sql: '',
            params: [],
        };

        try {
            const keys = Object.keys(data);
            const columns = keys.toString();

            let params = [];
            let paramsLetters = [];
            let paramsLength = 0;

            Object.keys(data).forEach((key) => {
                paramsLength = paramsLength + 1;
                params.push(data[key]);
                paramsLetters.push('?');
            });

            const pLetters = paramsLetters.join(',');

            let sql = 'INSERT INTO ' + table_name + ' (' + columns + ') VALUES (' + pLetters + ')';

            result.status = true;
            result.sql = sql;
            result.params = params;
        } catch (e) {
            log.error('Generate INSERT query failed, reason: ', e.message);
        }

        return result;
    }

    update(table_name, data, where) {
        let result = {
            status: false,
            sql: '',
            params: [],
        };

        try {
            let setValue = [];
            let params = [];

            Object.keys(data).forEach((key) => {
                const value = key + '=' + '?';
                setValue.push(value);
                params.push(data[key]);
            });

            let wheresValue = [];

            Object.keys(where).forEach((key) => {
                const value = key + '=' + '?';
                wheresValue.push(value);
                params.push(where[key]);
            });
            const sV = setValue.join(',');
            let sql = 'UPDATE ' + table_name + ' SET ' + sV;
            const wheres = wheresValue.join(' AND ');

            if (wheresValue.length > 0) {
                sql += ' WHERE ' + wheres;
            }

            result.status = true;
            result.sql = sql;
            result.params = params;
        } catch (e) {
            log.error('Generate UPDATE query failed, reason: ', e.message);
        }

        return result;
    }
}

module.exports = new QueryGenerator();
