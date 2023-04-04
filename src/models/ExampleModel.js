const MainModel = require('../system/MainModel');

class ExampleModel extends MainModel {
    singleQueryExample = async () => {
        const doQuery = await this.query(
            'SELECT * FROM family WHERE LOWER(fullname) LIKE ? ',
            ['%rahma%'],
            this.queryType.SELECT
        );
        return doQuery;
    };

    transactionQueryExample = async () => {
        const doQuery = await this.transaction([
            {
                sql: 'SELECT 1+1 as result',
                param: [],
                queryType: this.queryType.SELECT,
            },
        ]);

        return doQuery;
    };
}

module.exports = ExampleModel;
