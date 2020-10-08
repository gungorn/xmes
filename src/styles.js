import { StyleSheet, Dimensions } from 'react-native';

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
        width: W(75),
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
    }

});

export const UyeOlS = StyleSheet.create({
    ...GirisYapS, //stiller tamamane aynı olduğu için, spread operatörü ile birleştirdim
});