import { observer } from 'mobx-react';
import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo'
import GirisYapC from '../../controllers/Splash/GirisYapC';

import { GirisYapS as S, W, H } from '../../styles'

export default observer(() => {
    return (
        <View style={[S.contrainer, { display: GirisYapC.durum ? 'flex' : 'none' }]}>
            <Input
                placeholder={'E-Posta adresiniz'}
                containerStyle={S.inputContainerStyle}
                inputStyle={S.inputStyle}
                placeholderTextColor={'#207dff'}
                maxLength={64}
                value={GirisYapC.eposta}
                onChangeText={d => GirisYapC.set('eposta', d)}
            //rightIcon={<Entypo name={'email'} color={'#207dff'} size={64} />}
            />
            <Input
                placeholder={'Şifreniz'}
                containerStyle={S.inputContainerStyle}
                inputStyle={S.inputStyle}
                placeholderTextColor={'#207dff'}
                secureTextEntry
                maxLength={16}
                value={GirisYapC.sifre}
                onChangeText={d => GirisYapC.set('sifre', d)}
            //rightIcon={<Entypo name={'email'} color={'#207dff'} size={64} />}
            />

            <Button
                title={'Oturum Aç'}
                titleStyle={S.loginButtonTitleStyle}
                containerStyle={S.loginButtonContainerStyle}
                onPress={GirisYapC.girisYap}
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