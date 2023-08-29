import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>YourProfile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: Dimensions.get('window').height,
  },
});
