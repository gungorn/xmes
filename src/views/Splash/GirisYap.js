
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import GirisYapC from '../../controllers/Splash/GirisYapC';

import { GirisYapS as S } from '../../styles'

export default observer(() => {
    useEffect(() => { GirisYapC.startup(); }, []); //girişyap sayfası (bileşeni) için lifecycle fonksiyonu oluştur

    return (
        <View style={[S.contrainer, { display: GirisYapC.durum ? 'flex' : 'none' }]}>


            <View style={S.inputGroupContainer}>
                <Input
                    placeholder={'E-Posta adresiniz'}
                    containerStyle={S.inputContainerStyle}
                    inputStyle={S.inputStyle}
                    placeholderTextColor={'#207dff'}
                    maxLength={64}
                    value={GirisYapC.eposta}
                    onChangeText={d => GirisYapC.set('eposta', d)}
                />
            </View>


            <View style={S.inputGroupContainer}>
                <Input
                    placeholder={'Şifreniz'}
                    containerStyle={S.inputContainerStyle}
                    inputStyle={S.inputStyle}
                    placeholderTextColor={'#207dff'}
                    secureTextEntry
                    maxLength={16}
                    value={GirisYapC.sifre}
                    onChangeText={d => GirisYapC.set('sifre', d)}
                />
            </View>

            <Button
                title={'Oturum Aç'}
                titleStyle={S.loginButtonTitleStyle}
                containerStyle={S.loginButtonContainerStyle}
                onPress={GirisYapC.girisYap} //butona dokununca controller girisYap fonkasiyonunu çalıştır
                loading={GirisYapC.girisYapiliyor}
            />



            <Button
                type={'clear'}
                title={'Üye olmak için dokunun'}
                titleStyle={S.uyeOlButonTitleStyle}
                containerStyle={S.uyeOlButtonContainerStyle}
                onPress={GirisYapC.uyeOl}
            />
        </View>
    );
});