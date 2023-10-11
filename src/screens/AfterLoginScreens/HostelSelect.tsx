import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {ListItem} from '@react-native-material/core';
import {hostelNames} from '../../constants/hostelNames';
import {HostelData} from '../..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootHomeStackParamList} from '../BeforeLoginScreens/MainScreen';
import {useNavigation} from '@react-navigation/native';

import {Searchbar} from 'react-native-paper';

const HostelSelect = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeStackParamList>>();

  const [currHostelList, setCurrHostelList] =
    useState<HostelData[]>(hostelNames);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (text: string) => {
    setCurrHostelList(
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
                style={styles.hostelListItem}
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

const styles = StyleSheet.create({
  hostelListItem: {},
});
