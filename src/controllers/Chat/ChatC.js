import { makeObservable, action, observable } from 'mobx';
import MesajlasmaM from '../../models/MesajlasmaM';

class chatC {
    constructor() {
        makeObservable(
            this,
            {
                goBack: action,

                set: action
            }
        );
    }


    goBack = (useNav) => {
        MesajlasmaM.set('mesajlasma', null);
        useNav.goBack();
    }

    set = (k, v) => (this[k] = v);
}

export default new chatC();