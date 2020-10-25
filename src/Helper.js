import AsyncStorage from '@react-native-community/async-storage';
import { action, observable, makeObservable } from 'mobx';


class Helper {
    constructor() {
        makeObservable(
            this,
            {
                oturumBilgiKaydet: action,
                oturumBilgiGetir: action,

                hafizayaKaydet: action,
                hafizadanGetir: action,
            }
        );
    }




    oturumBilgiKaydet = async (eposta, sifre) => { //controller da pratik şekilde kullanabilmek için bu fonksiyonu yazdık
        const x = await this.hafizayaKaydet('eposta', eposta);
        const y = await this.hafizayaKaydet('sifre', sifre);

        return x && y;
    }
    oturumBilgiGetir = async () => {
        const eposta = await this.hafizadanGetir('eposta');
        const sifre = await this.hafizadanGetir('sifre');

        return { eposta, sifre };
    }


    hafizayaKaydet = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    hafizadanGetir = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        }
        catch (e) {
            console.log('TEST', e);
            return false;
        }
    }
}

export default new Helper();