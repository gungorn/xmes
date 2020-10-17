import { observable, action, makeObservable } from 'mobx';

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

                girisYap: action,
                set: action
            }
        );
    }


    durum = false;

    isim = '';
    eposta = '';
    sifre = '';
    sifreTekrar = '';


    uyeOl = () => {

    }

    girisYap = () => {

    }

    set = (k, v) => (this[k] = v);
}


export default new UyeOlC();