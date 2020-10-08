import { observable, action, makeObservable } from 'mobx';
import auth from '@react-native-firebase/auth';


class UyelikM {
    constructor() {
        makeObservable(
            this,
            {
                uyeOl: action,
                girisYap: action,
                set: action
            }
        );
    }

    uid = null; //giriş yapan kullanıcı için user id (uid yoksa oturum açılmamış demektir)

    uyeOl = () => {

    }

    girisYap = (eposta, sifre) => {
        auth().signInWithEmailAndPassword(eposta, sifre)
            .then(d => {
                this.uid = d.user.uid;
            })
            .catch(e => {

            });
    }

    set = (k, v) => (this[k] = v);
}


export default new UyelikM();