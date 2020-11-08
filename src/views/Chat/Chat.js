import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import SImage from 'react-native-scalable-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import C from '../../controllers/Chat/ChatC';

import MesajlasmaM from '../../models/MesajlasmaM';

import { H, W } from '../../styles';
import UyelikM from '../../models/UyelikM';

let useNav;

const top = () => {
    const { isim } = MesajlasmaM.mesajlasma.kullanici;

    return (
        <View
            style={{
                position: 'absolute',
                width: W(100), height: H(13),
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                paddingLeft: W(1),
                paddingRight: W(3)
            }}>

            <TouchableOpacity onPress={() => C.goBack(useNav)}>
                <Entypo name={'chevron-left'} size={W(10)} color={'#fff'} />
            </TouchableOpacity>

            <Text
                style={{
                    flex: 1,
                    fontSize: W(4.5),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    marginHorizontal: W(3)
                }}
                numberOfLines={1}
            >
                {isim}
            </Text>

            <TouchableOpacity>
                <Entypo name={'dots-three-horizontal'} size={W(7)} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
}

const message = d => {
    const { avatar } = MesajlasmaM.mesajlasma.kullanici;
    const { LorR, gonderen, mesaj, tarih } = d;

    const rightStyle = {
        marginRight: W(1),
        borderTopRightRadius: 2,
    };
    const leftStyle = {
        marginLeft: W(1),
        borderTopLeftRadius: 2,

    };
    const commonStyle = {
        backgroundColor: LorR === 'L' ? '#978AD6' : '#747FEF',
        minWidth: W(25),
        maxWidth: W(50),
        padding: W(3),
        marginTop: 10,
        borderRadius: 10,
    };

    return (
        <View style={[{ flexDirection: 'row' }, LorR === 'R' && { alignSelf: 'flex-end' }]}>
            {
                LorR === 'L' &&
                <SImage
                    source={{ uri: avatar }}
                    width={W(8)}
                    style={{ marginTop: W(2), marginHorizontal: W(2), backgroundColor: '#00000044', borderRadius: W(4) }}
                />
            }

            <View style={[commonStyle, (LorR === 'R') && rightStyle, (LorR === 'L') && leftStyle]}>
                <Text
                    style={{ color: '#eee', fontWeight: 'bold' }}
                >
                    {mesaj}
                </Text>
            </View>

            {
                LorR === 'R' &&
                <SImage
                    source={{ uri: UyelikM.uye.avatar }}
                    width={W(8)}
                    style={{ marginTop: W(2), marginHorizontal: W(2), backgroundColor: '#00000044', borderRadius: W(4) }}
                />
            }
        </View>
    );
}

const chatBar = () => {
    return (
        <View style={{
            backgroundColor: '#fff',
            borderTopRightRadius: W(3), borderTopLeftRadius: W(3),
            flexDirection: 'row', alignItems: 'center',
            padding: W(3)
        }}>
            <TextInput
                style={{ flex: 1, marginRight: 10, maxHeight: H(20) }}
                multiline
                value={C.mesaj}
                onChangeText={d => C.set('mesaj', d)}
            />

            <TouchableOpacity
                style={{ transform: [{ rotate: '-45deg' }], alignSelf: 'flex-end' }}
                onPress={C.gonderMesaj}
            >
                <Ionicons name={'send'} color={'#747FEF'} size={W(9)} />
            </TouchableOpacity>
        </View>
    );
}

export default observer(() => {
    useNav = useNavigation();

    useEffect(() => { //componentdidmount
        MesajlasmaM.getMesajlar();

        return () => {  //componentwillunmount
            MesajlasmaM.offMesajlar();
        }
    }, []);


    if (!MesajlasmaM.mesajlasma) return <View />;

    const resim = <SImage source={require('../../../assets/b3.png')} width={W(100)} resizeMode={'contain'} />

    return (
        <View style={{ flex: 1, backgroundColor: '#e4deff' }}>
            {resim}

            {top()}

            <View
                style={{
                    zIndex: -99,
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                }}>

                <View style={{ flex: 1, paddingBottom: 5 }}>
                    <FlatList
                        data={MesajlasmaM.mesajlar}
                        extraData={MesajlasmaM.mesajlar}
                        renderItem={d => message(d.item)}
                        ListFooterComponent={() => <View style={{ opacity: 0 }}>{resim}</View>}
                        inverted
                    />
                </View>

                {chatBar()}
            </View>

        </View>
    );
});


