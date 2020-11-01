import React, { useEffect } from 'react';
import { View, StatusBar, LayoutAnimation } from 'react-native';
import { observer } from 'mobx-react';
import Image from 'react-native-scalable-image';

import { SplashS as S, W } from '../../styles'; //daha pratik şekilde kullanmak için bileşene ait stili S ismi ile import ediyorum

import appIcon from '../../../assets/appicon.png';
import back1 from '../../../assets/back1.png';

import GirisYap from './GirisYap';
import UyeOl from './UyeOl';

import GirisYapC from '../../controllers/Splash/GirisYapC';
import UyeOlC from '../../controllers/Splash/UyeOlC';

import UyelikM from '../../models/UyelikM';

import Nav from '../Nav';




export default observer(() => {
    useEffect(() => LayoutAnimation.easeInEaseOut()); //layout animation için

    //oturum açılmışsa, uyelik model store'da uid değişkeni kullanıcının id'sini tutar
    //id varsa oturum açılmış demektir, bu durumda anaasyfayı return et
    if (UyelikM.uid) return <Nav />;


    return (
        <View style={S.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />

            <Image source={back1} width={W(100)} resizeMode={'cover'} style={S.back1} />
            <Image source={appIcon} width={(GirisYapC.durum || UyeOlC.durum) ? W(40) : W(65)} />

            <GirisYap />
            <UyeOl />
        </View>
    );
});