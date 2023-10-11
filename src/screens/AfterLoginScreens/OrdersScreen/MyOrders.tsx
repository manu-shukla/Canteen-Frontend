import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//Screens
import CurrentOrders from './CurrentOrders';
import PastOrders from './PastOrders';
import {OrdersProvider} from '../../../contexts/ordersContext';
import {Appbar} from 'react-native-paper';

const TopTabsOrders = createMaterialTopTabNavigator();

const MyOrders = () => {
  return (
    <OrdersProvider>
      <Appbar.Header>
        <Appbar.Content title="My Orders" />
      </Appbar.Header>

      <TopTabsOrders.Navigator screenOptions={{}}>
        <TopTabsOrders.Screen
          name="CurrentOrders"
          component={CurrentOrders}
          options={{
            title: 'Current Orders',
          }}
        />
        <TopTabsOrders.Screen
          name="PastOrders"
          component={PastOrders}
          options={{
            title: 'Past Orders',
          }}
        />
      </TopTabsOrders.Navigator>
    </OrdersProvider>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  headingTxt: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
