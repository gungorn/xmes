import { observable, action, makeObservable } from 'mobx';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


class MesajlasmaM {
    constructor() {
        makeObservable(
            this,
            {
                set: action
            }
        );
    }


    addMsg = (mesajlasmaid, veri) => new Promise(resolve => {
        database()
            .ref(`/MESAJLASMALAR/${mesajlasmaid}`)
            .set(veri)
            .then(() => resolve({ sonuc: true }))
            .catch(e => resolve({ sonuc: false, hata: e }));
    });


    set = (k, v) => (this[k] = v);
}


export default new MesajlasmaM();