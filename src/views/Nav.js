import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Anasayfa from './Anasayfa';
import Chat from './Chat/Chat';

const Stack = createStackNavigator();



export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'Anasayfa'} component={Anasayfa} />
                <Stack.Screen name={'Chat'} component={Chat} />
                <Stack.Screen name={'TEST'} component={() => <Text style={{ flex: 1, backgroundColor: 'red', textAlign: 'center', textAlignVertical: 'center' }}>-- TEST --</Text>} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}