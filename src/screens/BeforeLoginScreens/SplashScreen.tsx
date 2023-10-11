import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
const SplashScreen = ({navigation}: SplashProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./path/to/your/splash-image.png')}
        style={styles.logo}
      /> */}
      <Text style={styles.heading}>Canteen App</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set your desired background color
  },
  logo: {
    width: 150, // Adjust the image size as needed
    height: 150,
    resizeMode: 'contain',
  },
  heading: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
