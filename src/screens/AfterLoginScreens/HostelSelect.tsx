import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {Button, ListItem, TextInput} from '@react-native-material/core';
import {hostelNames} from '../../constants/hostelNames';
import {HostelData} from '../..';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootHomeStackParamList} from '../MainScreen';
import {useNavigation} from '@react-navigation/native';

const HostelSelect = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();

  const [hostelSelected, setHostelSelected] = useState<HostelData>(
    hostelNames[0],
  );
  const [currHostelList, setcurrHostelList] =
    useState<HostelData[]>(hostelNames);
  const handleSearch = (text: string) => {
    setcurrHostelList(
      hostelNames.filter(hostel => {
        return hostel.title.toLowerCase().includes(text.toLowerCase());
      }),
    );
  };

  const handleHostelSelect = (hostel: HostelData) => {
    setHostelSelected(hostel);
    navigation.replace('HomeScreenNav', {
      screen: 'HomeScreen',
      params: {hostelSelected: hostel.title},
    });
    
  };

  return (
    <View>
      <TextInput label="Search Hostel" onChangeText={handleSearch} />
      <View>
        {currHostelList.map(hostel => {
          return (
            <ListItem
              title={hostel.title}
              onPress={() => {
                handleHostelSelect(hostel);
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default HostelSelect;

const styles = StyleSheet.create({});
