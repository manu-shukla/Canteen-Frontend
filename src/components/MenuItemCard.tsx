import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, FAB, Text} from 'react-native-paper';
import {
  getCount,
  handleDecrement,
  handleIncrement,
} from '../handlers/cartHandler';
import {CartData, FoodData} from '..';
import { Image } from 'react-native';

type MenuItemCardProps = {
  item: FoodData;
  cartData: CartData[];
  setCartData: Function;
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartData,
  setCartData,
}) => {
  return (
    <Card style={styles.itemCard}>
      <Card.Content>
        <View style= {styles.cardName}>
          <View>
          <Text variant="titleLarge" style={styles.itemName}>
          {item.name}
        </Text>
          <Text variant="bodyMedium" style={styles.itemPrice}>
          ₹{item.price}
        </Text>
          </View>
          
          {/* <Text variant="titleLarge" style={styles.itemName}>
          {item.name}
        </Text> */}
        <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} 
          style= {{height: 60, width: 60}} />
          </View>
      </Card.Content>
      <Card.Content>
        <View style={styles.cardDescAndCart}>
          <View><Text style={styles.itemDescription}>{item.description}</Text></View>
          <View style={styles.cartGroup}>
            <FAB
              disabled={(cartData && (getCount(item, cartData) > 0)) ? false : true}
              mode="flat"
              icon="minus"
              customSize={28}
              onPress={() => {
                handleDecrement(item, cartData, setCartData);
              }}
              style={styles.cartButton}
            />
            <Text style={styles.cartText}>
              {(cartData && getCount(item, cartData)) ? getCount(item, cartData) : 'Add'}
            </Text>
            <FAB
              mode="flat"
              icon="plus"
              onPress={() => {
                handleIncrement(item, cartData, setCartData);
              }}
              customSize={28}
              style={styles.cartButton}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  itemCard: {
    margin: 8,
    elevation: 10,
    minHeight: 140,
  },
  itemPrice: {
    textAlign: 'left',
    borderColor: 'black',
    textAlignVertical: 'top',
    fontSize: 18,
    paddingTop: 5
  },
  itemName: {
    fontSize: 24,
  },
  cartButton: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: 'purple',
    height: 32,
    verticalAlign: 'middle'
  },
  itemDescription: {
    maxWidth: 200,
  },
  cardName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardDescAndCart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartGroup: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  cartText: {
    textAlignVertical: 'center',
    padding: 6,
  },
});
