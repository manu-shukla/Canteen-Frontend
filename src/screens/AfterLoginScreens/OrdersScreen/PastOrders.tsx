import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
 
} from 'react-native';
import React, {useState} from 'react';
import {OrdersContextType, useOrdersContext} from '../../../contexts/ordersContext';
import {Orders} from '../../..';
import OrderCard from '../../../components/OrderCard';
import {OrderStatus} from '../../../constants/sampleOrders';

const PastOrders = () => {
  const [refreshing, setrefreshing] = useState<boolean>(false);
  const {orderList, refreshOrdersList}: OrdersContextType = useOrdersContext();

  const onRefresh = () => {
    setrefreshing(true);
    refreshOrdersList();
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
  };

  return (
    <FlatList
      data={orderList}
      renderItem={({item}) =>
        item.orderStatus === OrderStatus.COMPLETED ? (
          <OrderCard order={item} />
        ) : null
      }
      keyExtractor={(item: Orders) => item.orderId.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={<Text>End of List</Text>}
      ListFooterComponentStyle={{height: 150}}
    />
  );
};

export default PastOrders;

const styles = StyleSheet.create({});
