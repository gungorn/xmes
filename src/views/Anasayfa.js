import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import SImage from 'react-native-scalable-image';
import { getStatusBarHeight as sbh } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import C from '../controllers/AnasayfaC';

import { AnasayfaS as S, W } from '../styles';
import { observer } from 'mobx-react';
import Helper from '../Helper';
import MesajlasmaM from '../models/MesajlasmaM';
import UyelikM from '../models/UyelikM';


const varsayilanAvatar = 'https://g7.pngresmi.com/preview/178/595/684/user-profile-computer-icons-login-user-avatars.jpg';

let useNav;


const mesajlasmalar = () => {
    return (
        <View>
            <FlatList
                data={MesajlasmaM.mesajlasmalar}
                extraData={MesajlasmaM.mesajlasmalar}
                renderItem={(d, i) => mesajlasma(d.item, i)}
            />
        </View>
    );
}
const mesajlasma = (d, i) => {
    const { sonMesaj, sonMesajTarihi, kullanici } = d;
    console.log(kullanici);

    if (!kullanici) return null;

    const { isim, eposta, avatar } = kullanici;

    const tarih = Moment(sonMesajTarihi).format('D MMMM, HH:mm'); //D, DD, M, MM, MMM, MMMM, YY, YYYY, H, HH, m, mm, s, ss

    return (
        <TouchableOpacity
            style={{ borderRadius: 10, padding: W(3), flexDirection: 'row', alignItems: 'center', margin: W(5) }}
            onPress={() => C.goChat(useNav, d)}
        >
            <SImage
                source={{ uri: avatar || varsayilanAvatar }}
                width={W(20)}
                style={{ borderRadius: W(10) }}
            />

            <View style={{ marginLeft: W(5), flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{isim}</Text>
                <View style={{ height: 10 }} />
                <Text style={{ color: 'gray', fontWeight: 'bold' }}>{sonMesaj}</Text>
            </View>

            <Text style={{ position: 'absolute', top: 5, right: 5 }}>{tarih}</Text>
        </TouchableOpacity>
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
            <View style={{
                backgroundColor: '#737ff0',
                borderRadius: Helper.klavye.d ? 0 : 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: W(2)
            }}>
                <TouchableOpacity onPress={C.modalKapat}>
                    <Entypo name={'chevron-down'} color={'#fff'} size={32} />
                </TouchableOpacity>

                <TextInput
                    style={S.mailModalInput}
                    value={C.mailModalInputValue}
                    onChangeText={d => C.set('mailModalInputValue', d)}
                    onSubmitEditing={C.addMsg}
                />


                {
                    C.mailModalInputValue.includes('@') && (C.mailModalInputValue.length > 10) &&
                    <TouchableOpacity onPress={C.addMsg}>
                        <Entypo name={'check'} color={'#fff'} size={32} />
                    </TouchableOpacity>
                }
            </View>
        </Modal>
    );
}

const Anasayfa = () => {
    const uye = UyelikM.uye;

    useNav = useNavigation();

    return (
        <View style={S.container}>
            <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} />

            <SImage source={require('../../assets/b1.png')} width={W(100)} resizeMode={'contain'} />

            <View style={{ position: 'absolute' }}>
                <View style={{ height: sbh() }} />

                <View style={S.topContainer}>
                    <TouchableOpacity onPress={C.profilFotoDegistir}>
                        <SImage
                            source={{ uri: ((uye && uye.avatar) ? uye.avatar : varsayilanAvatar) }}
                            style={S.avatar}
                            width={W(13)}
                        />
                    </TouchableOpacity>

                    <Text style={S.name}>{uye && uye.isim}</Text>

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