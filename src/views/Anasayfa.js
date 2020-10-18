import React from 'react';
import { View, Text } from 'react-native';
import UyelikM from '../models/UyelikM';

export default () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>ANASAYFA, {UyelikM.uid}</Text>
        </View>
    );
}