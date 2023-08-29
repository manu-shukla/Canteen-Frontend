import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {ActivityIndicator} from '@react-native-material/core';
import Snackbar from 'react-native-snackbar';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

GoogleSignin.configure();

export default function LoginScreen({navigation}: LoginProps) {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [signInStatus, setSignInStatus] = useState(false);

  useEffect(() => {
    isSignedIn();
  }, [signInStatus]);

  useEffect(() => {
    if (signInStatus) {
      const domainRegex = /@gmail.com\s*$/;
      if (domainRegex.test(userEmail)) {
        setTimeout(() => {
          navigation.replace('Signup', {userEmail, userName});
        }, 1500);
      } else {
        signOut();
        Snackbar.show({
          text: 'Login using IIT BHU Domain',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [signInStatus]);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setSignInStatus(false);
      setUserEmail('');
      setUserName('');
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    setUserName(currentUser?.user?.name!);
    setUserEmail(currentUser?.user?.email!);
  };
  const isSignedIn = async () => {
    const status = await GoogleSignin.isSignedIn();
    await getCurrentUser();
    setSignInStatus(status);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      await getCurrentUser();
      setSignInStatus(true);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Sigin cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Sigin under progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.loginPage}>
      <Text style={styles.headingTxt}>Login</Text>
      <View style={styles.formContainer}>
        {!signInStatus ? (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    minWidth: 250,
  },
  headingTxt: {
    fontSize: 28,
    marginBottom: 18,
    fontFamily: 'Ubuntu-Bold',
    fontWeight: 'bold',
    color: 'black',
  },
});
