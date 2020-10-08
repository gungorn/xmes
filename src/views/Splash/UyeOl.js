import { observer } from 'mobx-react';
import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo'
import UyeOlC from '../../controllers/Splash/UyeOlC';

import { UyeOlS as S, W, H } from '../../styles'

export default observer(() => {
    return (
        <View style={[S.contrainer, { display: UyeOlC.durum ? 'flex' : 'none' }]}>
            <Input
                placeholder={'E-Posta adresiniz'}
                containerStyle={S.inputContainerStyle}
                inputStyle={S.inputStyle}
                placeholderTextColor={'#207dff'}
                maxLength={64}
                value={UyeOlC.eposta}
                onChangeText={d => UyeOlC.set('eposta', d)}
            //rightIcon={<Entypo name={'email'} color={'#207dff'} size={64} />}
            />
            <Input
                placeholder={'Şifreniz'}
                containerStyle={S.inputContainerStyle}
                inputStyle={S.inputStyle}
                placeholderTextColor={'#207dff'}
                secureTextEntry
                maxLength={16}
                value={UyeOlC.sifre}
                onChangeText={d => UyeOlC.set('sifre', d)}
            //rightIcon={<Entypo name={'email'} color={'#207dff'} size={64} />}
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
            //rightIcon={<Entypo name={'email'} color={'#207dff'} size={64} />}
            />


            <Button
                title={'Üye Ol'}
                titleStyle={S.loginButtonTitleStyle}
                containerStyle={S.loginButtonContainerStyle}
                buttonStyle={S.loginButtonStyle}
                onPress={UyeOlC.girisYap}
            />
        </View>
    );
});