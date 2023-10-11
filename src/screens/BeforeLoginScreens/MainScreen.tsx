import {StyleSheet} from 'react-native';
import React from 'react';

// Screens
import HomeScreen from '../AfterLoginScreens/HomeScreen';
import HomeScreenNav from '../AfterLoginScreens/HomeScreenNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HostelSelect from '../AfterLoginScreens/HostelSelect';
import CartScreen from '../AfterLoginScreens/CartScreen/CartScreen';
import {CartData} from '../..';
import {CartProvider} from '../../contexts/cartContext';

export type RootHomeStackParamList = {
  HomeScreenNav: {
    screen: string;
    params: {
      hostelSelected: string;
    };
  };
  HostelSelect: undefined;
  HomeScreen: {
    hostelSelected: string;
  };
  CartScreen: undefined;
};

const MainStack = createNativeStackNavigator<RootHomeStackParamList>();

const MainScreen = () => {
  return (
    <CartProvider>
      <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeScreenNav">
        <MainStack.Screen name="HomeScreenNav" component={HomeScreenNav} />
        <MainStack.Screen name="HomeScreen" component={HomeScreen} />
        <MainStack.Group screenOptions={{presentation: 'modal'}}>
          <MainStack.Screen name="HostelSelect" component={HostelSelect} />
        </MainStack.Group>
        <MainStack.Screen name="CartScreen" component={CartScreen} />
      </MainStack.Navigator>
    </CartProvider>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
