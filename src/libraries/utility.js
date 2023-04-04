const uuid = require('uuid');

class Utility {
    uuid() {
        return uuid.v4();
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fonts() {
        const fonts = {
            Courier: {
                normal: 'Courier',
                bold: 'Courier-Bold',
                italics: 'Courier-Oblique',
                bolditalics: 'Courier-BoldOblique',
            },
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique',
            },
            Times: {
                normal: 'Times-Roman',
                bold: 'Times-Bold',
                italics: 'Times-Italic',
                bolditalics: 'Times-BoldItalic',
            },
            Symbol: {
                normal: 'Symbol',
            },
            ZapfDingbats: {
                normal: 'ZapfDingbats',
            },
        };
        return fonts;
    }
}

module.exports = new Utility();
