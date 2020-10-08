import { AppRegistry, View, Text, Platform, UIManager, LogBox } from 'react-native';
import Splash from './src/views/Splash/Splash';
import { name as appName } from './app.json';


LogBox.ignoreAllLogs();

//react-native layout animation - android
if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);


AppRegistry.registerComponent(appName, () => Splash);
