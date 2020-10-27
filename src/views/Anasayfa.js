import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import SImage from 'react-native-scalable-image';
import { getStatusBarHeight as sbh } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import C from '../controllers/AnasayfaC';

import { AnasayfaS as S, W } from '../styles';
import { observer } from 'mobx-react';
import Helper from '../Helper';


const mesajlasmalar = () => {
    return (
        <View>
            {mesajlasma()}
            {mesajlasma()}
            {mesajlasma()}
        </View>
    );
}
const mesajlasma = () => {
    return (
        <View style={{ borderRadius: 10, padding: W(3), flexDirection: 'row', alignItems: 'center', margin: W(5) }}>
            <SImage
                source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
                width={W(20)}
                style={{ borderRadius: W(10) }}
            />

            <View style={{ marginLeft: W(5), flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nurettin Güngör</Text>
                <View style={{ height: 10 }} />
                <Text style={{ color: 'gray', fontWeight: 'bold' }}>lorem ipsum dolar sit amet</Text>
            </View>

            <Text style={{ position: 'absolute', top: 5, right: 5 }}>08:15</Text>
        </View>
    );
}


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

            <SImage source={require('../../assets/b1.png')} width={W(100)} resizeMode={'contain'} />

            <View style={{ position: 'absolute' }}>
                <View style={{ height: sbh() }} />

                <View style={S.topContainer}>
                    <SImage
                        source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
                        style={S.avatar}
                        width={W(13)}
                    />

                    <Text style={S.name}>Nurettin Güngör</Text>

                    <TouchableOpacity>
                        <Entypo name={'game-controller'} color={'#fff'} size={24} />
                    </TouchableOpacity>
                    <View style={{ width: 5 }} />
                    <TouchableOpacity>
                        <MCI name={'account'} color={'#fff'} size={24} />
                    </TouchableOpacity>
                    <View style={{ width: 5 }} />
                    <TouchableOpacity>
                        <Entypo name={'dots-three-horizontal'} color={'#fff'} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={S.searchInputContainer}>
                    <FA name={'search'} color={'#fff'} size={28} />
                    <TextInput
                        style={S.searchInput}
                    />
                </View>
            </View>


            {mesajlasmalar()}



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