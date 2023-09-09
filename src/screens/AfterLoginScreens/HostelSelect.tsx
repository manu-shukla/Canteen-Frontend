import {Dimensions, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';

import {Button, ListItem} from '@react-native-material/core';
import {hostelNames} from '../../constants/hostelNames';
import {HostelData} from '../..';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootHomeStackParamList} from '../MainScreen';
import {useNavigation} from '@react-navigation/native';

import {Searchbar} from 'react-native-paper';

const HostelSelect = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();

  const [currHostelList, setcurrHostelList] =
    useState<HostelData[]>(hostelNames);
  const [searchText, setSearchText  ] = useState<string>('');

  const handleSearch = (text: string) => {
    setcurrHostelList(
      hostelNames.filter(hostel => {
        return hostel.title.toLowerCase().includes(text.toLowerCase());
      }),
    );
    setSearchText(text);
  };

  const handleHostelSelect = (hostel: HostelData) => {
    navigation.replace('HomeScreenNav', {
      screen: 'HomeScreen',
      params: {hostelSelected: hostel.title},
    });
  };

  return (
    <View>
      <Searchbar
        placeholder="Search Hostel"
        onChangeText={handleSearch}
        value={searchText}
      />
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
