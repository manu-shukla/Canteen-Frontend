import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const MyOrders = () => {
  return (
    <View style={styles.container}>
      <Text>MyOrders</Text>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    height: Dimensions.get('window').height,
  },
});
