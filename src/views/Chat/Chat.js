import { observer } from 'mobx-react';
import React from 'react';
import { View, Text } from 'react-native';

export default observer(() => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>TEST</Text>
        </View>
    );
});