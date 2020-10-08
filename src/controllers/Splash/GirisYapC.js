import { observable, action, makeObservable } from 'mobx';
import UyeOlC from './UyeOlC';

class GirisYapC {
    constructor() { //class için yapılandırıcı fonksiyon (constructor)
        makeObservable( //mobx'in yeni çıkan 6. sürümündeki değişiklik : decorate yerine makeObservable
            this, //bu nesne
            { //map
                durum: observable,
                eposta: observable,
                sifre: observable,

                girisYap: action,
                set: action
            }
        );
    }


    durum = false; //false: splash screen, true:  splash screen + login box


    eposta = '';
    sifre = '';


    girisYap = () => {

    }

    uyeOl = () => {
        this.durum = false;
        setTimeout(() => (UyeOlC.set('durum', true)), 150);
    }

    set = (k, v) => (this[k] = v);
}


export default new GirisYapC();