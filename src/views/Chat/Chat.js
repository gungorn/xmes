import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import SImage from 'react-native-scalable-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import C from '../../controllers/Chat/ChatC';

import MesajlasmaM from '../../models/MesajlasmaM';

import { H, W } from '../../styles';

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

const message = (LorR = 'R') => {
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
                    source={{ uri: 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png' }}
                    width={W(8)}
                    style={{ marginTop: W(2), marginHorizontal: W(2), backgroundColor: '#00000044', borderRadius: W(4) }}
                />
            }

            <View style={[commonStyle, (LorR === 'R') && rightStyle, (LorR === 'L') && leftStyle]}>
                <Text
                    style={{ color: '#eee', fontWeight: 'bold' }}
                >
                    Velit irure id nostrud fugiat ea anim eiusmod irure nostrud non commodo
                </Text>

            </View>

            {
                LorR === 'R' &&
                <SImage
                    source={{ uri: 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png' }}
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
            <TextInput style={{ flex: 1, marginRight: 10 }} />

            <TouchableOpacity
                style={{ transform: [{ rotate: '-45deg' }] }}
            >
                <Ionicons name={'send'} color={'#747FEF'} size={W(9)} />
            </TouchableOpacity>
        </View>
    );
}

export default observer(() => {
    console.log(MesajlasmaM.mesajlasma);

    useNav = useNavigation();

    if (!MesajlasmaM.mesajlasma) return <View />;

    return (
        <View style={{ flex: 1, backgroundColor: '#e4deff' }}>
            <SImage source={require('../../../assets/b3.png')} width={W(100)} resizeMode={'contain'} />

            {top()}

            <View style={{ flex: 1 }}>
                {message('R')}
                {message('R')}
                {message('L')}
                {message('R')}
                {message('L')}
            </View>

            {chatBar()}
        </View>
    );
});


