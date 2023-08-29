import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './AfterLoginScreens/HomeScreen';
import MyOrders from './AfterLoginScreens/MyOrders';
import Profile from './AfterLoginScreens/Profile';
import HomeScreenNav from './AfterLoginScreens/HomeScreenNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HostelSelect from './AfterLoginScreens/HostelSelect';

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
};

const MainStack = createNativeStackNavigator<RootHomeStackParamList>();

const MainScreen = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreenNav">
      <MainStack.Screen name="HomeScreenNav" component={HomeScreenNav} />
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Group screenOptions={{presentation: 'modal'}}>
        <MainStack.Screen name="HostelSelect" component={HostelSelect} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
