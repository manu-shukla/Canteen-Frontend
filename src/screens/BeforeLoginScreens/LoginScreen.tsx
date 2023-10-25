import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {ActivityIndicator} from '@react-native-material/core';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

GoogleSignin.configure();

type userLoginDetails = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};

export default function LoginScreen({navigation}: LoginProps) {
  const [signInStatus, setSignInStatus] = useState(false);
  const [user, setUser] = useState<userLoginDetails | null>(null);
  useEffect(() => {
    isSignedIn().then(res => {
      console.log(res);
      setSignInStatus(res);
    });
  }, []);

  useEffect(() => {
    if (signInStatus) {
      getCurrentUser().then(currentUser => {
        if (currentUser) {
          console.log('Here1: ' + currentUser.user);
          setUser(currentUser.user);
        } else {
          throw new Error('User not found');
        }
      });
    }
  }, [signInStatus]);

  useEffect(() => {
    if (user) {
      console.log('Here2 ' + user);
      const {email: userEmail, name: userName} = user;
      const domainRegex = /@gmail.com\s*$/;
      if (domainRegex.test(userEmail)) {
        setTimeout(() => {
          axios
            .get('http://localhost:8080/auth/login', {
              params: {email: userEmail},
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => console.log(err));

          navigation.replace('Signup', {userEmail, userName});
        }, 1500);
      } else {
        signOut().then(res => {
          setSignInStatus(false);
          Snackbar.show({
            text: 'Login using IIT BHU Domain',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
      }
    }
  }, [user]);

  const signIn = () => {
    GoogleSignin.hasPlayServices()
      .then(hasPlayServices => {
        if (hasPlayServices) {
          GoogleSignin.signIn().then(res => {
            setSignInStatus(true);
          });
        }
      })
      .catch(error => {
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
      });
  };

  const signOut = async () => {
    return await GoogleSignin.signOut();
  };
  const getCurrentUser = async () => {
    return await GoogleSignin.getCurrentUser();
  };

  const isSignedIn = async () => {
    return await GoogleSignin.isSignedIn();
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
