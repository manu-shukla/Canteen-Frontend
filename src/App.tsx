import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import LoginScreen from './screens/BeforeLoginScreens/LoginScreen';
import SignupScreen from './screens/BeforeLoginScreens/SignupScreen';
import SplashScreen from './screens/BeforeLoginScreens/SplashScreen';
import MainScreen from './screens/BeforeLoginScreens/MainScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: {
    userEmail: string;
    userName: string;
  };
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
