import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Orders} from '..';
import {Button, Card, Text, Title, useTheme} from 'react-native-paper';
import { OrderStatus } from '../constants/sampleOrders';

type OrderCardProps = {
  order: Orders;
};

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <Title style={{color: useTheme().colors.primary, fontWeight: 'bold'}}>
          Order: #{order.orderId}
        </Title>
        <Text style={styles.orderField}>
          <Text style={styles.subHeading}>Title: </Text>
          {order.title}
        </Text>
        <Text style={styles.orderField}>
          <Text style={styles.subHeading}>Price: </Text>₹{order.price}
        </Text>
        <Text style={styles.orderField}>
          <Text style={styles.subHeading}>Description: </Text>
          {order.description}
        </Text>
        <Text style={styles.orderField}>
          <Text style={styles.subHeading}>Hostel: </Text> {order.hostel?.title}
        </Text>
        <Text style={styles.orderField}>
          <Text style={styles.subHeading}>Order Time: </Text>
          {order.time.toLocaleString()}
        </Text>
        <Text style={styles.orderField}>
          <Text style={styles.subHeading}>Order Status: </Text>
          {(order.orderStatus === OrderStatus.COMPLETED) ? 'Completed' : 'Preparing'}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    elevation: 4,
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  orderField:{
   marginVertical: 3,
  }
});
