import AsyncStorage from '@react-native-community/async-storage';
import { action, observable, makeObservable } from 'mobx';
import { Keyboard } from 'react-native';


class Helper {
    constructor() {
        makeObservable(
            this,
            {
                klavye: observable,
                klavyeTakip: action,
                klavyeAcildi: action,
                klavyeKapandi: action,

                oturumBilgiKaydet: action,
                oturumBilgiGetir: action,

                hafizayaKaydet: action,
                hafizadanGetir: action,
            }
        );
    }



    klavye = { d: false, h: 0 };
    klavyeTakip = () => {
        Keyboard.addListener('keyboardDidShow', this.klavyeAcildi);
        Keyboard.addListener('keyboardDidHide', this.klavyeKapandi);
    }
    klavyeAcildi = e => (this.klavye = { d: true, h: e.endCoordinates.height });
    klavyeKapandi = () => (this.klavye = { d: false, h: 0 });



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