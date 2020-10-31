import { StyleSheet, Dimensions } from 'react-native';
import Helper from './Helper';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export const W = d => w * d / 100;
export const H = d => h * d / 100;


export const SplashS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    back1: {
        position: 'absolute',
        opacity: 1
    }
});


export const GirisYapS = StyleSheet.create({
    contrainer: {
        width: w,
        marginTop: H(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000000'
    },


    inputStyle: {
        padding: 0,
        borderBottomWidth: 2,
        borderColor: '#207dff'
    },
    inputContainerStyle: {
        flex: 1,
        marginTop: H(2)
    },
    inputLabelStyle: {
        color: '#207dff'
    },


    loginButtonTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    loginButtonContainerStyle: {
        borderRadius: 100,
        width: W(45)
    },

    uyeOlButonTitleStyle: {
        color: '#207dff',
        fontWeight: 'bold',
        fontSize: 16

    },
    uyeOlButtonContainerStyle: {
        marginTop: H(3)
    },

    inputGroupContainer: {
        width: W(75),
        flexDirection: 'row'
    }

});

export const UyeOlS = StyleSheet.create({
    ...GirisYapS, //stiller tamamane aynı olduğu için, spread operatörü ile birleştirdim
});


export const AnasayfaS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0
    },

    topContainer: {
        flexDirection: 'row',
        width: w,
        paddingHorizontal: W(2),
        paddingVertical: W(2),
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 999,
        aspectRatio: 1
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        color: '#fff',
        marginLeft: W(3)
    },
    searchInputContainer: {
        backgroundColor: '#ffffff33',
        borderRadius: 999,
        marginHorizontal: W(10),
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingLeft: W(5),
        paddingVertical: 10
    },
    searchInput: {
        padding: 0,
        marginLeft: W(3),
        flex: 1,
        color: '#fff',
        fontSize: 16
    },


    addMsg: {
        position: 'absolute',
        bottom: W(3),
        right: W(3),
        width: W(16),
        height: W(16),
        borderRadius: W(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#737ff0'
    },


    mailModalInput: {
        height: H(8),
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal: W(5),
        flex: 1
    }
});