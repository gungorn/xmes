import AsyncStorage from '@react-native-community/async-storage';
import { action, observable, makeObservable } from 'mobx';
import { Keyboard } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Storage from '@react-native-firebase/storage';
import shortid from 'shortid';

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



    dosyaUpload = (ref, path) => new Promise(resolve => {
        Storage()
            .ref(ref)
            .putFile(path)
            .then(async () => {
                resolve(await Storage().ref(ref).getDownloadURL());
            })
            .catch(e => resolve(false));
    });


    galeridenSec = () => new Promise(resolve => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            compressImageQuality: 0.85
        })
            .then(d => {
                console.log('SEÇİLEN GÖRSEL : ', d);
                resolve(d);
            })
            .catch(() => resolve(false));
    });
}

export default new Helper();