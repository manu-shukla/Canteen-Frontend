import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  SectionList,
  VirtualizedList,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ListItem} from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HostelSelect from './HostelSelect';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {hostelNames} from '../../constants/hostelNames';
import {RootHomeStackParamList} from '../MainScreen';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {foodItems} from '../../constants/foodItems';
import {CartData, FoodData} from '../..';
import {
  Card,
  Button,
  Text,
  Searchbar,
  IconButton,
  FAB,
} from 'react-native-paper';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {inlineStyles} from 'react-native-svg';

import {
  getCount,
  handleDecrement,
  handleIncrement,
  toDisplayCartButton,
} from '../../handlers/cartHandler';
import MenuItemCard from '../../components/MenuItemCard';

type HomeScreenRouteProps = RouteProp<RootHomeStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();
  const route = useRoute<HomeScreenRouteProps>();

  useEffect(() => {
    console.log(route.params?.hostelSelected);
    if (route.params?.hostelSelected) {
      setHostelSelected(route.params?.hostelSelected);
    }
  }, [route.params?.hostelSelected]);

  const [hostelSelected, setHostelSelected] = useState(hostelNames[5].title);

  const [foodItemList, setFoodItemList] = useState<FoodData[]>(foodItems);

  const [cartButton, setCartButton] = useState(false);

  
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

  // const [countOfCartItem, setcountOfCartItem] = useState(second)

  const handleHostelSelectNavigation = () => {
    navigation.replace('HostelSelect');
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    setFoodItemList(
      foodItems.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      }),
    );
  };

  useEffect(() => {
          setCartButton(toDisplayCartButton(cartData));

  }, [cartData])


  return (
    <View>
      <TouchableOpacity onPress={handleHostelSelectNavigation}>
        <View style={styles.hostelSelectedContainer}>
          <MaterialCommunityIcons
            style={styles.hostelSelectedIcon}
            name="map-marker"
            color="black"
            size={21}
          />
          <Text style={styles.hostelSelectedTxt}>{hostelSelected}</Text>
          <MaterialCommunityIcons
            style={styles.hostelSelectedIcon}
            name="chevron-down"
            color="black"
            size={22}
          />
        </View>
      </TouchableOpacity>
      <SafeAreaView>
        <Searchbar
          placeholder="Search Menu"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {foodItemList.length ? (
          <View>
            <FlatList
              data={foodItemList}
              renderItem={({item}) => (
                <MenuItemCard
                  item={item}
                  cartData={cartData}
                  setCartData={setCartData}
                />
              )}
              keyExtractor={(item, index) => index.toString()} 
              ListFooterComponent={<Text variant='bodyLarge' style={styles.endOfList}>End of List</Text>}
              ListFooterComponentStyle={{height: 300, margin: 10}}
            />
            {cartButton ? (
              <View style={{alignItems: 'center'}}>
                <FAB
                  mode="elevated"
                  icon="cart"
                  customSize={50}
                  style={{
                    position: 'absolute',
                    bottom: 300,
                  }}
                  animated={true}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <Text style={styles.noItems}>No items available</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: Dimensions.get('window').height,
  },
  hostelSelectedTxt: {
    color: 'black',
    fontSize: 22,
    paddingLeft: 4,
    paddingRight: 0,
  },
  hostelSelectedContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  hostelSelectedIcon: {
    marginTop: 4,
  },
  noItems: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 18,
  },
  endOfList: {
    textAlign: 'center',
  }
});
