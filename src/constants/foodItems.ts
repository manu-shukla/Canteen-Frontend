import {FoodData} from '..';

export enum FoodType {
  VEG = 'Veg',
  NONVEG = 'Non-Veg',
  EGG = 'Egg',
}

export const foodItems: FoodData[] = [
  {
    name: 'Cheese Maggi',
    price: 35,
    description: 'Maggi with extra cheese',
    availability: true,
    foodType: FoodType.VEG,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    name: 'Plain Maggi',
    price: 25,
    description: 'Maggi with only maggi masala',
    availability: true,
    foodType: FoodType.VEG,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    name: 'Masala Maggi',
    price: 30,
    description: 'Maggi with extra masala and veggies',
    availability: true,
    foodType: FoodType.VEG,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    name: 'Bread Omlette',
    price: 35,
    description: 'Egg omlette with bread',
    availability: true,
    foodType: FoodType.EGG,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    name: 'Chicken Roll',
    price: 35,
    description: 'Roll of chicken and veggies',
    availability: true,
    foodType: FoodType.NONVEG,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
  },
];
