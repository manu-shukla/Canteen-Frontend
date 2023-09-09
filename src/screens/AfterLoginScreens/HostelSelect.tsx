import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
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
    navigation.replace('HomeScreenNav', {
      screen: 'HomeScreen',
      params: {hostelSelected: hostel.title},
    });
  };

  return (
    <View>
      <TextInput label="Search Hostel" onChangeText={handleSearch} />
      <View>
        <FlatList
          data={currHostelList}
          renderItem={({item, index}) => {
            return (
              <ListItem
                
                key={index}
                onPress={() => handleHostelSelect(item)}
                title={item.title}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default HostelSelect;

const styles = StyleSheet.create({});
