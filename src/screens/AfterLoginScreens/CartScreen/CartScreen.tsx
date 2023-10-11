import {Dimensions, FlatList, StyleSheet, View} from 'react-native';

import React, {useEffect} from 'react';
import {Appbar, Text, Button} from 'react-native-paper';

import {useCartContext} from '../../../contexts/cartContext';
import CartItemCard from '../../../components/CartItemCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootHomeStackParamList} from '../../BeforeLoginScreens/MainScreen';
import {useNavigation} from '@react-navigation/native';

const dimensions = Dimensions.get('window');
const CartScreen = () => {
  const {cartData, cartButton} = useCartContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();

  useEffect(() => {
    console.log(cartData);
  }, [cartData]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartData.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Cart Checkout" />
      </Appbar.Header>
      <View style={{flex: 1, padding: 16}}>
        {cartButton ? (
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              if (item.quantity > 0) {
                return <CartItemCard cartItemData={item} />;
              }
              return null;
            }}
          />
        ) : (
          <View style={styles.noItemContainer}>
            <MaterialCommunityIcons name={'cart-off'} size={225} />
            <Text variant="headlineSmall" style={styles.noItemTxt}>
              No Items in Cart
            </Text>
            <Button
              mode="contained"
              icon={'plus-box-multiple-outline'}
              onPress={() => {
                navigation.goBack();
              }}>
              Add Items
            </Button>
          </View>
        )}
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>
            Total Price: ₹{calculateTotalPrice()}
          </Text>
          <Button
            mode="contained"
            disabled={!cartButton}
            style={styles.checkoutButton}>
            Proceed to Checkout
          </Button>
        </View>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  checkoutContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: dimensions.width,
  },
  checkoutButton: {
    marginVertical: 16,
    width: dimensions.width - 32,
  },
  checkoutTxt: {fontSize: 20, marginTop: 16},
  noItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  noItemTxt: {
    // textAlign: 'center',
    marginVertical: 15,
  },
});
