import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {hostelNames} from '../../constants/hostelNames';
import {RootHomeStackParamList} from '../BeforeLoginScreens/MainScreen';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Text, Searchbar, FAB} from 'react-native-paper';

import MenuItemCard from '../../components/MenuItemCard';
import {useCartContext} from '../../contexts/cartContext';

type HomeScreenRouteProps = RouteProp<RootHomeStackParamList, 'HomeScreen'>;

const dimensions = Dimensions.get('window');

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();
  const route = useRoute<HomeScreenRouteProps>();

  const {cartButton, foodItemList, onSearchFoodList} = useCartContext();

  const [hostelSelected, setHostelSelected] = useState(hostelNames[5].title);
  const [searchQueryText, setSearchQueryText] = useState('');

  useEffect(() => {
    console.log(route.params?.hostelSelected);
    if (route.params?.hostelSelected) {
      setHostelSelected(route.params?.hostelSelected);
    }
  }, [route.params?.hostelSelected]);

  const handleHostelSelectNavigation = () => {
    navigation.replace('HostelSelect');
  };

  const onChangeSearch = (query: string) => {
    setSearchQueryText(query);
    onSearchFoodList(query);
  };

  const handleCartButton = () => {
    navigation.navigate('CartScreen');
  };
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
          value={searchQueryText}
        />
        {foodItemList.length ? (
          <View>
            <FlatList
              data={foodItemList}
              renderItem={({item}) => <MenuItemCard foodItem={item} />}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
                <Text variant="bodyLarge" style={styles.endOfList}>
                  End of List
                </Text>
              }
              ListFooterComponentStyle={{height: 300, margin: 10}}
            />
            {cartButton ? (
              <View style={styles.cartButtonContainer}>
                <FAB
                  mode="elevated"
                  icon="cart"
                  onPress={handleCartButton}
                  customSize={50}
                  style={styles.cartButton}
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
    height: dimensions.width,
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
  cartButtonContainer: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 300,
  },
  cartButton: {},
  endOfList: {
    textAlign: 'center',
  },
});
