import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MyOrders from './MyOrders';


const HomeTab = createMaterialBottomTabNavigator();

const HomeScreenNav = () => {
  return (
    <HomeTab.Navigator
      initialRouteName="HomeScreen"
      // activeColor="red"
      // inactiveColor="blue"
      // barStyle={{backgroundColor: 'black'}}
    >
      <HomeTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="black" size={26} />
          ),
          title: 'Home',
        }}
      />
      <HomeTab.Screen
        name="Orders"
        component={MyOrders}

        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="rice" color="black" size={26} />
          ),
          title: 'My Orders',
        }}
      />
      <HomeTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color="black" size={26} />
          ),
          title: 'Your Profile',
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeScreenNav;

const styles = StyleSheet.create({});
