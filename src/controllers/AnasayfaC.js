import { makeObservable, action, observable } from 'mobx';
import { Alert } from 'react-native';
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

                modalKapat: action,

                addMsg: action,

                set: action
            }
        );
    }

    mailModal = false;
    mailModalInputValue = 'k2@xmes.com';


    modalKapat = () => {
        this.mailModal = false;
        this.mailModalInputValue = '';
    }

    addMsg = async () => {
        const x = await UyelikM.uyeBul(this.mailModalInputValue);
        console.log('X', x);


        if (x.sonuc && x.veri) {
            const keys = Object.keys(x.veri);
            const uid = keys[0];
            const mesajlasmaid = `${shortid()}${shortid()}`;


            if (uid === UyelikM.uid) {
                Alert.alert('Hata', 'Kendi mail hesabınızı kullanamazsınız!');
                return;
            }

            const veri = {
                kisi1: UyelikM.uid,
                kisi2: uid,
                sonMesaj: '--',
                sonMesajTarih: '--'
            }

            const y = await MesajlasmaM.addMsg(mesajlasmaid, veri);

            if (y.sonuc) {
                //?
            }
            else {
                Alert.alert('Hata', 'Bilinmeyen bir hata oluştu!');
            }
        }
        else {
            Alert.alert('Hata', 'Böyle bir kullanıcı sistemde kayıtlı değil!');
        }

        this.mailModal = false;
        this.mailModalInputValue = '';
    }


    set = (k, v) => (this[k] = v);
}

export default new AnasayfaC();