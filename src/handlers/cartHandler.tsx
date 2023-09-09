import {CartData, FoodData} from '..';

const findItems = (itemToFind: FoodData, cartData: CartData[]): CartData => {
  return cartData.find(cartItem => {
    if (cartItem.name === itemToFind.name) return true;
  })!;
};

export const toDisplayCartButton = (cartData: CartData[]): boolean => {
  return cartData.find((cartItem) => {
    if(cartItem.quantity > 0) return true;
  })?true:false
}

export const getCount = (itemToFind: FoodData, cartData: CartData[]): number => findItems(itemToFind, cartData).quantity;
export const handleIncrement = (
  item: FoodData,
  cartData: CartData[],
  setCartData: any,
) => {
  setCartData(
    cartData.map(cartItem => {
      if (cartItem.name === item.name) cartItem.quantity++;
      return cartItem;
    }),
  );
};
export const handleDecrement = (
  item: FoodData,
  cartData: CartData[],
  setCartData: any,
): void => {
  setCartData(
    cartData.map(cartItem => {
      if (cartItem.name === item.name && cartItem.quantity> 0) cartItem.quantity--;
      return cartItem;
    }),
  );
};
