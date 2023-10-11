import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, FAB, Text} from 'react-native-paper';

import {FoodData} from '..';
import {Image} from 'react-native';
import {useCartContext} from '../contexts/cartContext';
import {FoodType} from '../constants/foodItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type MenuItemCardProps = {
  foodItem: FoodData;
};
const MenuItemCard: React.FC<MenuItemCardProps> = ({foodItem}) => {
  const {getCount, handleIncrement, handleDecrement, cartButton} =
    useCartContext();

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
      <Card.Content>
        <View style={styles.cardName}>
          <View>
            <View style={styles.headingContainer}>
              <Text variant="titleLarge" style={styles.itemName}>
                {foodItem.name}
              </Text>

              <MaterialCommunityIcons
                name={getFoodIcon(foodItem.foodType)}
                size={24}
                style={styles.foodItemTypeIcon}
                color={getFoodColor(foodItem.foodType)}
              />
            </View>

            <Text variant="bodyMedium" style={styles.itemPrice}>
              ₹{foodItem.price}
            </Text>
          </View>
          <Image
            source={{uri: foodItem.imageUrl}}
            style={styles.foodItemImage}
          />
        </View>
      </Card.Content>
      <Card.Content>
        <View style={styles.cardDescAndCart}>
          <View>
            <Text style={styles.itemDescription}>{foodItem.description}</Text>
          </View>
          <View style={styles.cartGroup}>
            <FAB
              disabled={!(cartButton && getCount(foodItem.name) > 0)}
              mode="flat"
              icon="minus"
              customSize={28}
              onPress={() => {
                handleDecrement(foodItem.name);
              }}
              style={styles.cartButton}
            />
            <Text style={styles.cartText}>
              {cartButton ? getCount(foodItem.name) || 'Add' : 'Add'}
            </Text>
            <FAB
              mode="flat"
              icon="plus"
              onPress={() => {
                handleIncrement(foodItem.name);
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
  headingContainer: {
    flexDirection: 'row',
  },

  itemPrice: {
    textAlign: 'left',
    borderColor: 'black',
    textAlignVertical: 'top',
    fontSize: 18,
    paddingTop: 5,
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
    verticalAlign: 'middle',
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
    alignItems: 'center',
  },
  cartText: {
    textAlignVertical: 'center',
    padding: 6,
  },
  foodItemImage: {
    height: 60,
    width: 60,
  },
  foodItemTypeIcon: {
    marginLeft: 10,
  },
});
