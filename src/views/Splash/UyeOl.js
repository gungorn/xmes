import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import UyeOlC from '../../controllers/Splash/UyeOlC';

import { UyeOlS as S } from '../../styles'

export default observer(() => {
    return (
        <View style={[S.contrainer, { display: UyeOlC.durum ? 'flex' : 'none' }]}>

            <View style={S.inputGroupContainer}>
                <Input
                    placeholder={'Adınız'}
                    containerStyle={S.inputContainerStyle}
                    inputStyle={S.inputStyle}
                    placeholderTextColor={'#207dff'}
                    maxLength={64}
                    value={UyeOlC.isim}
                    onChangeText={d => UyeOlC.set('isim', d)}
                />
            </View>


            <View style={S.inputGroupContainer}>
                <Input
                    placeholder={'E-Posta adresiniz'}
                    containerStyle={S.inputContainerStyle}
                    inputStyle={S.inputStyle}
                    placeholderTextColor={'#207dff'}
                    maxLength={64}
                    value={UyeOlC.eposta}
                    onChangeText={d => UyeOlC.set('eposta', d)}
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
                    value={UyeOlC.sifre}
                    onChangeText={d => UyeOlC.set('sifre', d)}
                />
                <Input
                    placeholder={'Tekrar'}
                    containerStyle={S.inputContainerStyle}
                    inputStyle={S.inputStyle}
                    placeholderTextColor={'#207dff'}
                    secureTextEntry
                    maxLength={16}
                    value={UyeOlC.sifreTekrar}
                    onChangeText={d => UyeOlC.set('sifreTekrar', d)}
                />
            </View>


            <Button
                title={'Üye Ol'}
                titleStyle={S.loginButtonTitleStyle}
                containerStyle={S.loginButtonContainerStyle}
                buttonStyle={S.loginButtonStyle}
                onPress={UyeOlC.uyeOl}
                loading={UyeOlC.uyeOlunuyor}
            />
        </View>
    );
});