import React, {createContext, useContext, useState} from 'react';
import {CartData, FoodData} from '../index';
import {foodItems} from '../constants/foodItems';

export type CartContextType = {
  cartData: CartData[];
  handleIncrement: (itemName: string) => void;
  handleDecrement: (itemName: string) => void;
  cartButton: boolean;
  getCount: (itemName: string) => number;
  foodItemList: FoodData[];
  onSearchFoodList: (query: string) => void;
};
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: any) => {
  const [cartData, setCartData] = useState<CartData[]>(
    foodItems.map(item => {
      const cartItemToAdd: CartData = {
        name: item.name,
        price: item.price,

        foodType: item.foodType,
        quantity: 0,
      };
      return cartItemToAdd;
    }),
  );
  const [cartButton, setCartButton] = useState<boolean>(false);
  const [foodItemList, setFoodItemList] = useState<FoodData[]>(foodItems);

  const onSearchFoodList = (query: string) => {
    setFoodItemList(
      foodItems.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      }),
    );
  };

  const handleDecrement = (itemName: string) => {
    let totalItems = 0;

    setCartData(
      cartData.map(cartItem => {
        if (cartItem.name === itemName && cartItem.quantity > 0) {
          cartItem.quantity--;
        }
        totalItems += cartItem.quantity;
        return cartItem;
      }),
    );
    setCartButton(totalItems > 0);
  };
  const handleIncrement = (itemName: string) => {
    let totalItems = 0;
    setCartData(
      cartData.map(cartItem => {
        if (cartItem.name === itemName) {
          cartItem.quantity++;
        }
        totalItems += cartItem.quantity;
        return cartItem;
      }),
    );
    setCartButton(totalItems > 0);
  };

  const getCount = (itemName: string): number => {
    return cartData.find(cartItem => {
      if (cartItem.name === itemName) {
        return true;
      }
    })!.quantity;
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        handleDecrement,
        handleIncrement,
        cartButton,
        getCount,
        foodItemList,
        onSearchFoodList,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartButton: false,
      cartData: [],
      getCount: () => 0,
      handleDecrement: () => {},
      handleIncrement: () => {},
      foodItemList: [],
      onSearchFoodList: () => {},
    };
  }
  return context;
};
