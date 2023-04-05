const MainController = require('../system/MainController');
const { mail } = require('../libraries');

class ExEmailController extends MainController {
    validate = async (req, res, next) => {
        try {
            const schema = {
                email: {
                    type: 'string',
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

    generateEmail = async (req, res, next) => {
        try {
            const { email } = req.body;

            mail.to = email;
            mail.subject = 'Welcome World';
            mail.html = `
    <body style="font-family: Arial, Helvetica, sans-serif;">
    <div style="border: 0.5px solid black; width: 560px; padding: 10px">
        <img src="cid:logo" alt="logo" width="200" style="float: right; margin-top: 10px" />
        <br />
        <p><strong>Anda telah terproteksi!</strong></p>
        <br />
        <p><strong>Dear Bapak {username},</strong></p>
        <p>
        Selamat bergabung dengan keluarga besar Capital Life, asuransinya orang Indonesia untuk mencintai hidup. Dengan
        ini kami informasikan bahwa pengajuan asuransi jiwa Anda telah disetujui disetujui.
        </p>
        <p>
        Bersama ini kami kirimkan dokumen Polis Elektronik (e-Policy) beserta seluruh lampirannya. Untuk lebih memahami
        produk dan manfaat asuransi yang Anda pilih, Anda wajib mempelajari Polis Anda sesuai dengan ketentuan masa
        mempelajari Polis (free-look period) yang berlaku.
        </p>
        <br />
        <div style="border: 2px solid #7dc44c"></div>
        <br />
        <h3><strong>DETAIL PERLINDUNGAN</strong></h3>
        <table style="padding: 20px; background-color: #7dc44c; color: white">
        <tr>
            <th style="text-align: left; width: 300px; display: flex; justify-content: flex-start">
            Nomor Polis {no_polis}
            </th>
            <th style="text-align: left; width: 200px">Total Kontribusi <br />{total_kontribusi}</th>
        </tr>
        <tr>
            <td>
            <strong> <br /><br /><br />Flexi Life Protection Syariah</strong>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
            <strong><br /><br />Manfaat Asuransi <br /></strong>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>Manfaat Meninggal Dunia</td>
            <td>{manfaat_md}</td>
        </tr>
        <tr>
            <td>
            Manfaat Meninggal Dunia Karena <br />Kecelakaan (Tambahan)
            <br />
            <br />
            </td>
            <td>{manfaat_mdk}</td>
        </tr>
        <tr>
            <td colspan="2">
            Detail manfaat asuransi tercantum pada dokumen polis
            <br />
            <br />
            </td>
        </tr>
        <tr>
            <td>
            <strong>Pemegang Polis</strong> <br />{pemegang_polis}
            <br />
            <br />
            </td>
            <td>
            <strong>Masa Asuransi</strong> <br />{masa_asuransi}
            <br />
            <br />
            </td>
        </tr>
        </table>
        <br />
        <div style="border: 1px solid black; width: 525px; padding: 10px">
        <br />
        <h3>Password untuk membuka e-Policy</h3>
        <br />
        <p>
            Untuk menjaga kerahasiaan dokumen nasabah, maka seluruh dokumen e-Policy dilindungi 
            dengan password. Silahkan mempergunakan password e-Policy Anda untuk membukanya. <br />Contoh :
        </p>
        <img src="cid:pw-policy" alt="contoh" width="200px" />
        </div>
    </div>
    <div style="border: none; background-color: #e8e8e3; width: 560px; padding: 10px">
        <h3>Punya pertanyaan?</h3>
        <p style="font-size: 14px">
        Apabila Anda mengalami kesulitan untuk mengakses e-Policy atau memiliki pertanyaan, silahkan hubungi
        <strong>Layanan 24/7 Hello Astralife Contact Center.</strong>
        </p>
        <br />
        <div style="display: flex">
        <div style="width: 800px">
            <img src="cid:logo" alt="call center" width="200px" />
            <p>Email : hello@calisa.co.id <br />www.calisa.co.id</p>
        </div>
        <p style="font-size: 14px">
            <strong>Capital Life Syariah Center PT Capital Life Syariah</strong> 
            Pondok Indah Office Tower 3, Lantai 1 Jl.
            Sultan Iskandar Muda Kav. V - TA Pondok Indah, Jakarta Selatan 12310
        </p>
        </div>
    </div>
    <table style="border: none; background-color: #7dc44c; width: 580px; padding: 10px">
        <tr style="display: flex; justify-content: space-between; align-items: center">
        <td>
            <img src="cid:logo" 
                alt="logo" width="200px" />
        </td>
        <td style="display: flex; justtify-content: flex-end">
            <img src="cid:wa" 
                alt="whatsapp" width="40" height="40" />
            <img src="cid:fb" 
                alt="facebook" width="40" height="40" />
            <img src="cid:tw" 
                alt="twitter" width="40" height="40" />
            <img src="cid:yt" 
                alt="youtube" width="40" height="40" />
            <img src="cid:ig" 
                alt="instagram" width="40" height="40" />
        </td>
        </tr>
    </table>
    <table style="text-align: right; padding: 10px; width: 580px; background: #75b641">
        <tr>
        <td>
            <p style="color: #ffffff; font-size: 12px">
            PT Capital Life Syariah berizin dan diawasi oleh Otoritas Jasa Keuangan
            </p>
        </td>
        </tr>
    </table>
    <table style="text-align: right; padding: 10px; width: 580px; background: #62a22c">
        <tr>
        <td>
            <p style="color: #ffffff; font-size: 12px">PT Capital Life Syariah. Hak Cipta Dilindungi.</p>
        </td>
        </tr>
    </table>
    </body>`;
            let send = await mail.send();

            if (send) {
                this.m.code = '000';
                this.m.message = 'Please check your inbox';
                return this.m.getMessage(res);
            }
        } catch (error) {
            return next(error);
        }
    };
}

module.exports = ExEmailController;
