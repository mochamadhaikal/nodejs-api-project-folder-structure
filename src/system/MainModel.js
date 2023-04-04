const { sequelize, DataTypes, QueryTypes } = require('../sequelize');
const { log, QueryGenerator } = require('../libraries');

class MainModel {
    queryType = QueryTypes;
    dataTypes = DataTypes;
    runSequelize = sequelize;
    createQuery = QueryGenerator;

    query = async (sql, param = [], type) => {
        let result = {
            status: true,
            message: 'OK',
            data: [],
        };

        try {
            const doQuery = await sequelize.query(sql, {
                replacements: param,
                type: type,
            });

            result.data = doQuery;
        } catch (error) {
            result.status = false;
            result.message = error.message;
        }

        if (result.status === false) {
            log.error(`Error query: ${result.message}`, result);
        }

        return result;
    };

    transaction = async (transParam) => {
        const client = await sequelize.transaction();

        const result = {
            status: true,
            message: 'OK',
            failedQuery: '',
            failedParam: [],
            failedQueryType: '',
        };

        try {
            for (let i = 0; i < transParam.length; i++) {
                const row = transParam[i];
                const sql = row.sql;
                const param = row.param;
                const queryType = row.queryType;

                result.failedParam = param;
                result.failedQuery = sql;
                result.failedQueryType = row.queryType;

                await sequelize.query(sql, {
                    type: queryType,
                    replacements: param,
                    transaction: client,
                });
            }

            result.failedParam = [];
            result.failedQuery = '';
            result.failedQueryType = '';

            await client.commit();
        } catch (error) {
            result.status = false;
            result.message = error.message;
            await client.rollback();
        }

        if (result.status === false) {
            console.log(result.message);
            log.error(`Error transaction: `, result);
        }

        return result;
    };
}

module.exports = MainModel;
