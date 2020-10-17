const dbJSON = { //kök - root

    KULLANICILAR: {
        uid1: { /* KULLANICI BİLGİLERİ (isim, eposta) */ },
        uid2: {},
        uid3: {},
        uid4: {}
    },

    MESAJLASMALAR: {
        mesajlasmaid1: { //uid1 ile uid2 arasındaki konuşma
            kisi1: 'uid1',
            kisi2: 'uid2',
            sonMesaj: '',
            sonMesajTarih: '',
        },
        mesajlasmaid2: { //uid2 ile uid4 arasındaki konuşma
            kisi1: 'uid2',
            kisi2: 'uid4',
            sonMesaj: '',
            sonMesajTarih: '',
        },
    },

    MESAJLASMALARDATA: {
        mesajlasmaid1: {
            mesajid1: { mesaj: '', gonderen: '', tarih: '' },
            mesajid2: {},
            mesajid3: {},
        },
        mesajlasmaid2: {
            mesajid1: {},
            mesajid2: {},
            mesajid3: {},
        }
    }

}