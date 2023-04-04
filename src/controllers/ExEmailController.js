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
    <div>
    Bapak/Ibu {data.nama_pp}<br>
    {data.alamat_pp}<br>
    {data.kabupaten_pp}, {data.kode_pos_pp}<br>
    {data.provinsi_pp}
    <br>
    <br>
    Jakarta, {data.tgl} <br><br>
    Dengan Hormat,<br><br>
    Terima kasih atas kepercayaan yang telah Anda berikan kepada PT ASURANSI JIWA ASTRA sebagai penyedia layanan
    Asuransi Jiwa dan Keuangan bagi Anda dan Keluarga. <br><br>
    Bersama dengan ini kami sampaikan bahwa pengajuan Klaim reimbursement Anda dengan informasi sebagai berikut:
    <br><br>
    <table>
        <tr>
            <td style="width: 235px;">No. Polis</td>
            <td style="width: 355px;">: {data.policy_no}</td>
        </tr>
        <tr>
            <td style="width: 235px;">Produk</td>
            <td style="width: 355px;">: {data.produk}</td>
        </tr>
        <tr>
            <td style="width: 235px;">Pemegang Polis</td>
            <td style="width: 355px;">: {data.nama_pp}</td>
        </tr>
        <tr>
            <td style="width: 235px;">Peserta yang Diasuransikan</td>
            <td style="width: 355px;">: {data.nama_peserta}</td>
        </tr>
        <tr>
            <td style="width: 235px;">Tanggal Kejadian</td>
            <td style="width: 355px;">: {data.tgl_kejadian}</td>
        </tr>
    </table>
    <br>
    Kami telah menyetujui pengajuan klaim reimbursement Anda dengan total klaim layak bayar sebesar {data.jumlah_klaim}.
    <br><br>
    Dan akan membayarkan nilai dana Investasi atas polis Anda sebesar {data.jumlah_santunan_asuransi}. Pembayaran Klaim 
    akan dilakukan melalui transfer ke nomor rekening yang tercantum di formulir klaim dalam 3 (tiga) hari kerja sejak
    tanggal surat ini. <br><br>

    Untuk informasi lebih lanjut terkait hal ini, silakan menghubungi Call Center Hello Astra Life, 1500 (282) yang
    beroperasi 24/7 (24 jam setiap hari, dan 7 hari dalam seminggu) atau melalui email hello@astralife.co.id selama hari
    kerja (pukul 08.00 WIB sampai dengan 17.00 WIB). <br><br>
    Demikian informasi ini kami sampaikan. Atas perhatian dan kerjasama Anda, kami ucapkan terima kasih. <br><br><br>
    Hormat Kami,
    <br>
    PT ASURANSI JIWA ASTRA
    <br>
    <br>
    <br>
    <br>
    Claim Management
    </div>`;
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
