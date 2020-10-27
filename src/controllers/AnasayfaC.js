import { makeObservable, action, observable } from 'mobx';
import shortid from 'shortid';
import MesajlasmaM from '../models/MesajlasmaM';

import UyelikM from '../models/UyelikM';

class AnasayfaC {
    constructor() {
        makeObservable(
            this,
            {
                mailModal: observable,

                mailModalInputValue: observable,

                set: action
            }
        );
    }

    mailModal = false;
    mailModalInputValue = 'asd@xyz.com';


    addMsg = async () => {
        const x = await UyelikM.uyeBul(this.mailModalInputValue);
        console.log('X', x);

        if (x.sonuc) {
            const keys = Object.keys(x.veri);
            const uid = keys[0];
            const mesajlasmaid = `${shortid()}${shortid()}`;
            const veri = {
                kisi1: UyelikM.uid,
                kisi2: uid,
                sonMesaj: '--',
                sonMesajTarih: '--'
            }

            const y = await MesajlasmaM.addMsg(mesajlasmaid, veri);
            console.log('y:', y);
        }
        else {

        }
    }


    set = (k, v) => (this[k] = v);
}

export default new AnasayfaC();