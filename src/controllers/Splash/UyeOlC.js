import { observable, action, makeObservable } from 'mobx';
import UyelikM from '../../models/UyelikM';
import GirisYapC from './GirisYapC';

class UyeOlC {
    constructor() {
        makeObservable(
            this,
            {
                durum: observable,
                isim: observable,
                eposta: observable,
                sifre: observable,
                sifreTekrar: observable,

                uyeOlunuyor: observable,
                uyeOl: action,
                girisYap: action,
                set: action
            }
        );
    }


    durum = false;

    isim = 'nurettin';
    eposta = 'asd@xyz.com';
    sifre = '00000000';
    sifreTekrar = '';

    /*
        view,controller'daki uyeOl fonksiyonunu tetikliyor ve üyelik işlemlerinin uygulama tarafındaki kısmı burada yapılıyor
        senaryo gereği üyelik işlemin de db ye iki kez bağlanmak gerekiyor: hesap oluşturmak ve üye bilgilerini kaydetmek için
        bu iki işlem uyelikM store dosyasında ayrı ayrı fonksiyonlar ile yapılıyor
        buradaki uyeol fonksiyonu uyelikM'deki fonksiyonları çalıştırıp onların sonuçlarına göre işlem yapıyor
    */

    uyeOlunuyor = false;
    uyeOl = async () => { //auth ile kullanıcı hesabı oluştur
        this.uyeOlunuyor = true;

        const uyelikSonuc = await UyelikM.uyeOl(this.eposta, this.sifre); //hesap oluştur

        if (uyelikSonuc) {
            const data = { isim: this.isim, eposta: this.eposta, sifre: this.sifre }; //kullanıcı için db ye kaydedilecek
            const bilgiKaydetSonuc = await UyelikM.uyeBilgiKaydet(UyelikM.uid, data); //üye bilgilerini kaydet

            if (bilgiKaydetSonuc) { //işlem başarılı olduysa üyelik işlemi tamamlandı demektir
                GirisYapC.set('eposta', this.eposta);
                GirisYapC.set('sifre', this.sifre);

                GirisYapC.set('durum', true)
                this.durum = false;

                this.isim = '';
                this.eposta = '';
                this.sifre = '';
                this.sifreTekrar = '';
            }
            else {
                alert('Bir hata oldu!');
            }
        }
        else {
            alert('Bir hata oldu!');
        }

        this.uyeOlunuyor = false;
    }

    girisYap = () => { //geri dön fonksiyonu

    }

    set = (k, v) => (this[k] = v);
}


export default new UyeOlC();