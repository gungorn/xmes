import { observable, action, makeObservable } from 'mobx';
import UyeOlC from './UyeOlC';
import UyelikM from '../../models/UyelikM';
import Helper from '../../Helper';

class GirisYapC {
    constructor() { //class için yapılandırıcı fonksiyon (constructor)
        makeObservable( //mobx'in yeni çıkan 6. sürümündeki değişiklik : decorate yerine makeObservable
            this, //bu nesne
            { //map
                durum: observable,
                eposta: observable,
                sifre: observable,

                girisYapiliyor: observable,
                girisYap: action,
                set: action
            }
        );
    }


    startup = async () => { //girişyap için componentDidMount
        const x = await Helper.oturumBilgiGetir(); //{ eposta: '', sifre: '' } şeklinde dönüş yapıyor, eposta ve sifre null olabilir!!

        if (x && x.eposta && x.sifre) { //geri dönüş değerini ve içinde eposta ve sifreyi knotrol et
            this.eposta = x.eposta;
            this.sifre = x.sifre;

            const sonuc = await this.girisYap();
            if (sonuc) { }
            else setTimeout(() => (this.durum = true), 1000);
        }
        else setTimeout(() => (this.durum = true), 1000);
    }


    durum = false; //false: splash screen, true:  splash screen + login box


    eposta = '';
    sifre = '';

    girisYapiliyor = false; //girişyap butonu loading
    girisYap = async () => { //oturum aç
        this.girisYapiliyor = true;
        const sonuc = await UyelikM.girisYap(this.eposta, this.sifre);

        if (sonuc) { //oturum açıldı
            await Helper.oturumBilgiKaydet(this.eposta, this.sifre);
        }
        else { //oturum açılamadı
        }

        this.girisYapiliyor = false;

        return sonuc;
    }

    uyeOl = () => { //uyeolma bileşenini aktif et
        this.durum = false;
        setTimeout(() => (UyeOlC.set('durum', true)), 150);
    }

    set = (k, v) => (this[k] = v);
}


export default new GirisYapC();