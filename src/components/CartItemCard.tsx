import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, FAB, Text} from 'react-native-paper';

import {CartData} from '..';
import {useCartContext} from '../contexts/cartContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FoodType} from '../constants/foodItems';

type CartItemCardProps = {
  cartItemData: CartData;
};
const CartItemCard: React.FC<CartItemCardProps> = ({cartItemData}) => {
  const {handleIncrement, handleDecrement} = useCartContext();

  const getFoodColor = (foodType: string) => {
    switch (foodType) {
      case FoodType.VEG:
        return 'green';
      case FoodType.NONVEG:
        return 'red';
      case FoodType.EGG:
        return 'orange';
      default:
        return 'black';
    }
  };
  const getFoodIcon = (foodType: string) => {
    switch (foodType) {
      case FoodType.VEG:
        return 'food-apple';
      case FoodType.NONVEG:
        return 'food-drumstick';
      case FoodType.EGG:
        return 'egg';
      default:
        return 'food';
    }
  };

  return (
    <Card style={styles.itemCard}>
      <Card.Content style={styles.cardContainer}>
        <View style={styles.itemHeadingContainer}>
          <Text variant="titleLarge" style={styles.itemName}>
            {cartItemData.name}
          </Text>
          <MaterialCommunityIcons
            name={getFoodIcon(cartItemData.foodType)}
            size={24}
            style={styles.foodTypeIcon}
            color={getFoodColor(cartItemData.foodType)}
          />
        </View>
        <View style={styles.cartGroup}>
          <View>
            <Text variant="bodyLarge" style={styles.itemPrice}>
              ₹{cartItemData.price} x
              <Text variant="headlineSmall"> {cartItemData.quantity}</Text> = ₹
              {cartItemData.price * cartItemData.quantity}
            </Text>
          </View>
          <View style={styles.itemCounter}>
            <FAB
              mode="flat"
              icon="minus"
              customSize={28}
              onPress={() => {
                handleDecrement(cartItemData.name);
              }}
              style={styles.countButton}
            />
            <Text style={styles.counterText}>{cartItemData.quantity}</Text>
            <FAB
              mode="flat"
              icon="plus"
              onPress={() => {
                handleIncrement(cartItemData.name);
              }}
              customSize={28}
              style={styles.countButton}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  itemHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodTypeIcon: {
    marginLeft: 10,
  },
  itemCard: {
    margin: 5,
    elevation: 10,
  },
  itemPrice: {
    textAlign: 'left',
  },
  itemName: {
    fontSize: 24,
  },
  itemCounter: {
    flexDirection: 'row',
  },
  countButton: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: 'purple',
    height: 32,
  },

  itemDescription: {
    maxWidth: 200,
  },

  cartGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  counterText: {
    textAlignVertical: 'center',
    padding: 6,
  },
});
