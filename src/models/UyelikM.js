import { observable, action, makeObservable } from 'mobx';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


class UyelikM {
    constructor() {
        makeObservable(
            this,
            {
                uyeOl: action,
                girisYap: action,

                uid: observable,
                uye: observable,

                uyeBilgiKaydet: action,
                uyeAvatarDegistir: action,

                uyeBul: action,

                getUye: action,

                set: action
            }
        );
    }

    uid = null; //giriş yapan kullanıcı için user id (uid yoksa oturum açılmamış demektir),
    uye = null; //giriş yapan kullanıcının bilgileri

    uyeOl = async (mail, password) => {
        //bir promise fonksiyon iki farklı şekilde kullanılabilir: then-catch mantığıyla ya da await ile
        //then-catch de, geriye bir şey return etmek mümkün olmadığı için await ile kullandık
        //hataları yakalabilmek için de try catch kullandık

        /*
        auth().createUserWithEmailAndPassword(mail, password)
            .then(d => {
                console.log(d);
                this.uid = d.user.uid;
            })
            .catch(e => console.log(e));
        */

        try {
            const d = await auth().createUserWithEmailAndPassword(mail, password); //await işlem bitene kadar bekletir
            this.uid = d.user.uid;
            return true;
        }
        catch (e) { //try içerisinde herhangi bir hata olduğunda doğrudan catch e düşer
            console.log(e);
            return false;
        }
    }
    uyeBilgiKaydet = async (uid, data) => {
        try {
            await database().ref(`/KULLANICILAR/${uid}/`).set(data);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    uyeAvatarDegistir = async (uid, data) => {
        try {
            await database().ref(`/KULLANICILAR/${uid}/avatar`).set(data);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    girisYap = async (eposta, sifre) => {
        try {
            const sonuc = await auth().signInWithEmailAndPassword(eposta, sifre);
            this.uid = sonuc.user.uid;
            console.log('uid', this.uid);

            const uye = await this.getUye(this.uid);
            if (uye.sonuc) this.uye = uye.veri;
            else { } //hata olması durumu

            console.log('UYE :', this.uye);

            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }


    uyeBul = (eposta) => new Promise(resolve => {
        database()
            .ref('/KULLANICILAR')
            .orderByChild('eposta')
            .equalTo(eposta)
            .once('value')
            .then(d => {
                resolve({ sonuc: true, veri: d.val() });
            })
            .catch(e => {
                resolve({ sonuc: false, hata: e });
            });
    });

    getUye = uid => new Promise(resolve => {
        database()
            .ref(`/KULLANICILAR/${uid}`)
            .once('value')
            .then(d => resolve({ sonuc: true, veri: d.val() }))
            .catch(e => resolve({ sonuc: false, hata: e }));
    });

    sifreSifirla = () => {
        auth().sendPasswordResetEmail('');
    }

    set = (k, v) => (this[k] = v);
}


export default new UyelikM();