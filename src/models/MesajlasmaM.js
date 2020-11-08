import { observable, action, makeObservable } from 'mobx';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import UyelikM from './UyelikM';


class MesajlasmaM {
    constructor() {
        makeObservable(
            this,
            {
                mesajlasma: observable,
                mesajlasmalar: observable,
                mesajlar: observable,

                addMsg: action,
                getMesajlasmalarKisi1: action,
                getMesajlasmalarKisi2: action,

                set: action
            }
        );
    }


    mesajlasma = null; //kullanıcının anasayfada dokunduğu mesajlaşma bilgisi
    mesajlasmalar = []; //aansayfada görünecek data

    mesajlar = []; //o anki mesajlaşmadaki mesajlar

    addMsg = (mesajlasmaid, veri) => new Promise(resolve => {
        database()
            .ref(`/MESAJLASMALAR/${mesajlasmaid}`)
            .set(veri)
            .then(() => resolve({ sonuc: true }))
            .catch(e => resolve({ sonuc: false, hata: e }));
    });


    getMesajlasmalarKisi1 = uid => new Promise(resolve => {
        database()
            .ref('/MESAJLASMALAR')
            .orderByChild('kisi1')
            .equalTo(uid)
            .once('value')
            .then(d => resolve({ sonuc: true, veri: d.val() }))
            .catch(e => resolve({ sonuc: false, hata: e }));
    });
    getMesajlasmalarKisi2 = uid => new Promise(resolve => {
        database()
            .ref('/MESAJLASMALAR')
            .orderByChild('kisi2')
            .equalTo(uid)
            .once('value')
            .then(d => resolve({ sonuc: true, veri: d.val() }))
            .catch(e => resolve({ sonuc: false, hata: e }));
    });


    getMesajlasmalar = () => {
        const uid = UyelikM.uid;

        database()
            .ref(`/MESAJLASMALAR`)
            .on(
                'value',
                async () => {
                    let A = await this.getMesajlasmalarKisi1(uid);
                    let B = await this.getMesajlasmalarKisi2(uid);

                    if (A.sonuc && A.veri) {
                        const tmp = [];
                        const keys = Object.keys(A.veri);

                        keys.forEach(d => tmp.push({ sonMesajTarihi: A.veri[d].sonMesajTarihi, sonMesaj: A.veri[d].sonMesaj, kullaniciid: A.veri[d].kisi2, mesajlasmaid: d }));

                        A = tmp;
                    }
                    else A = [];

                    if (B.sonuc && B.veri) {
                        const tmp = [];
                        const keys = Object.keys(B.veri);

                        keys.forEach(d => tmp.push({ sonMesajTarihi: B.veri[d].sonMesajTarihi, sonMesaj: B.veri[d].sonMesaj, kullaniciid: B.veri[d].kisi1, mesajlasmaid: d }));

                        B = tmp;
                    }
                    else B = [];

                    const C = A.concat(B);

                    for (let i = 0; i < C.length; i++) {
                        const x = await UyelikM.getUye(C[i].kullaniciid);

                        //if (x.sonuc && x.veri) C[i] = { ...C[i], ...x.veri };
                        if (x.sonuc && x.veri) C[i].kullanici = x.veri;
                        else C[i].kullanici = false;
                    }

                    this.mesajlasmalar = C;
                }
            );
    };

    getMesajlarREF = null;
    getMesajlar = () => {
        const mesajlasmaid = this.mesajlasma.mesajlasmaid;

        this.getMesajlarREF = database()
            .ref(`/MESAJLASMALARDATA/${mesajlasmaid}`)
            .on(
                'value',
                d => {
                    const data = d.val();

                    const keys = Object.keys(data);
                    const mesajlar = [];

                    keys.forEach(x => mesajlar.push({
                        ...data[x],
                        LorR: (data[x].gonderen === UyelikM.uid) ? 'R' : 'L',
                    }));

                    mesajlar.sort((a, b) => a.tarih < b.tarih);

                    this.mesajlar = mesajlar;
                }
            );
    }
    offMesajlar = () => {
        const mesajlasmaid = this.mesajlasma.mesajlasmaid;

        database().ref(`/MESAJLASMADATA/${mesajlasmaid}`).off('value', this.getMesajlarREF);
    }


    gonderMesaj = (mesajid, data) => new Promise(resolve => {
        const mesajlasmaid = this.mesajlasma.mesajlasmaid;

        database()
            .ref(`/MESAJLASMALARDATA/${mesajlasmaid}/${mesajid}`)
            .set(data)
            .then(() => resolve({ sonuc: true }))
            .catch(e => resolve({ sonuc: false, hata: e }));
    });


    set = (k, v) => (this[k] = v);
}


export default new MesajlasmaM();