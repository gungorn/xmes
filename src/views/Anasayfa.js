import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import SImage from 'react-native-scalable-image';
import { getStatusBarHeight as sbh } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import C from '../controllers/AnasayfaC';

import { AnasayfaS as S, W } from '../styles';
import { observer } from 'mobx-react';
import Helper from '../Helper';

const mailModal = () => {
    return (
        <Modal
            isVisible={C.mailModal}
            backdropOpacity={0}
            style={{
                justifyContent: 'flex-end',
                marginBottom: Helper.klavye.d ? 0 : W(24),
                marginHorizontal: Helper.klavye.d ? 0 : undefined
            }}
            onBackdropPress={() => C.set('mailmodal', false)}
        >
            <View style={{ backgroundColor: '#737ff0', borderRadius: Helper.klavye.d ? 0 : 10 }}>
                <TextInput
                    style={S.mailModalInput}
                    value={C.mailModalInputValue}
                    onChangeText={d => C.set('mailModalInputValue', d)}
                    onSubmitEditing={C.addMsg}
                />
            </View>
        </Modal>
    );
}

const Anasayfa = () => {
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


            {
                !Helper.klavye.d &&
                <TouchableOpacity style={S.addMsg} onPress={() => C.set('mailModal', !C.mailModal)}>
                    <Feather name={'message-circle'} size={36} color={'#fff'} />
                </TouchableOpacity>
            }


            {mailModal()}
        </View>
    );
}

export default observer(Anasayfa);