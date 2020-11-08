import { makeObservable, action, observable } from 'mobx';
import shortid from 'shortid';
import MesajlasmaM from '../../models/MesajlasmaM';
import UyelikM from '../../models/UyelikM';

class chatC {
    constructor() {
        makeObservable(
            this,
            {
                mesaj: observable,
                goBack: action,
                gonderMesaj: action,
                set: action
            }
        );
    }

    mesaj = '';


    goBack = (useNav) => {
        MesajlasmaM.set('mesajlasma', null);
        useNav.goBack();
    }

    //kuyruk = [];


    gonderiliyor = false;
    gonderMesaj = async () => {
        if (this.gonderiliyor || (this.mesaj.split(' ').join('')).length < 1) return;

        this.gonderiliyor = true;

        const tarih = new Date().getTime();

        const mesajid = `${tarih}|${shortid()}`;

        const data = {
            mesaj: this.mesaj.trim(),
            tarih,
            gonderen: UyelikM.uid
        }
        const x = await MesajlasmaM.gonderMesaj(mesajid, data);

        if (x.sonuc) {
            this.mesaj = '';
        }
        else {
            console.log('GÖNDERİLEMEDİ');
        }

        this.gonderiliyor = false;
    }


    set = (k, v) => (this[k] = v);
}

export default new chatC();