import {StyleSheet, RefreshControl, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  OrdersContextType,
  useOrdersContext,
} from '../../../contexts/ordersContext';

import {Orders} from '../../..';
import OrderCard from '../../../components/OrderCard';
import {OrderStatus} from '../../../constants/sampleOrders';
import {Text} from 'react-native-paper';

const CurrentOrders = () => {
  const [refreshing, setrefreshing] = useState<boolean>(false);

  const {orderList, refreshOrdersList}: OrdersContextType = useOrdersContext();

  useEffect(() => {
    console.log(orderList);
  }, [orderList]);

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
        item.orderStatus === OrderStatus.PREPARING ? (
          <OrderCard order={item} />
        ) : null
      }
      keyExtractor={(item: Orders) => item.orderId.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={
        <Text variant="bodyLarge" style={styles.endOfList}>
          End of List
        </Text>
      }
      ListFooterComponentStyle={{height: 150}}
    />
  );
};

export default CurrentOrders;

const styles = StyleSheet.create({
  endOfList: {
    textAlign: 'center',
  },
});
