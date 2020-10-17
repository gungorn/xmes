import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, LayoutAnimation } from 'react-native';
import Image from 'react-native-scalable-image';

import { SplashS as S, W, H } from '../../styles';

import appIcon from '../../../assets/appicon.png';
import back1 from '../../../assets/back1.png';

import GirisYap from './GirisYap';
import UyeOl from './UyeOl';
import GirisYapC from '../../controllers/Splash/GirisYapC';
import UyeOlC from '../../controllers/Splash/UyeOlC';



export default observer(() => {
    useEffect(() => setTimeout(() => GirisYapC.set('durum', true), 3000), []);
    useEffect(() => LayoutAnimation.easeInEaseOut());


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