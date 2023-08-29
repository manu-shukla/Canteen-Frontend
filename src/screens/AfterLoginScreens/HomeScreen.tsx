import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Button} from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HostelSelect from './HostelSelect';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {hostelNames} from '../../constants/hostelNames';
import {RootHomeStackParamList} from '../MainScreen';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

type HomeScreenRouteProps = RouteProp<RootHomeStackParamList, "HomeScreen">

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();
  const route = useRoute<HomeScreenRouteProps>();

  useEffect(() => {
   
    console.log(route.params?.hostelSelected);
    if(route.params?.hostelSelected){
      setHostelSelected(route.params?.hostelSelected);
    }
  }, [route.params?.hostelSelected]);

  const [hostelSelected, setHostelSelected] = useState(hostelNames[5].title);

  const handleHostelSelectNavigation = () => {
    navigation.replace('HostelSelect');
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
});
