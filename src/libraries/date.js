const dayjs = require('dayjs');

const LOCALE = process.env.NODE_APP_DATE_LOCALE || 'id';

class Dates {
    now(format = 'YYYY-MM-DD') {
        return dayjs().locale(LOCALE).format(format);
    }

    convertDate(date, format) {
        return date ? dayjs(date).locale(LOCALE).format(format) : '';
    }

    dateToTextMonth(dateString, lang = 'id', monthType = 's', output = 'f') {
        const arrId = [
            '',
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];
        const arrEn = [
            '',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const arrIdShort = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const arrEnShort = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let arrMonth = [];
        if (lang == 'id') {
            if (monthType == 's') {
                arrMonth = arrIdShort;
            } else {
                arrMonth = arrId;
            }
        } else {
            if (monthType == 's') {
                arrMonth = arrEnShort;
            } else {
                arrMonth = arrEn;
            }
        }
        const arrDate = dateString.split('-');
        const month = arrMonth[parseInt(arrDate[1])];

        let result;

        if (output == 'f') {
            arrDate[1] = month;
            result = arrDate.reverse().join(' ');
        } else {
            result = month;
        }

        return result;
    }
}

module.exports = new Dates();
