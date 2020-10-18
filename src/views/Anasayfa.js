import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import SImage from 'react-native-scalable-image';
import { getStatusBarHeight as sbh } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome';

import UyelikM from '../models/UyelikM';
import { AnasayfaS as S, W } from '../styles';

export default () => {
    return (
        <View style={S.container}>
            <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} />

            <SImage
                source={require('../../assets/b1.png')}
                style={S.background}
                width={W(100)}
                resizeMode={'contain'}
            />

            <View style={{ height: sbh() }} />

            <View style={S.topContainer}>
                <SImage
                    source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
                    style={S.avatar}
                    width={W(13)}
                />

                <Text style={S.name}>Nurettin Güngör</Text>

                <TouchableOpacity>
                    <Entypo name={'game-controller'} color={'#fff'} size={32} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name={'game-controller'} color={'#fff'} size={32} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name={'game-controller'} color={'#fff'} size={32} />
                </TouchableOpacity>
            </View>

            <View style={S.searchInputContainer}>
                <FA name={'search'} color={'#fff'} size={28} />
                <TextInput
                    style={S.searchInput}
                />
            </View>
        </View>
    );
}