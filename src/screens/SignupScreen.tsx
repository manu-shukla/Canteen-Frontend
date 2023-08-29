import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, TextInput} from '@react-native-material/core';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

import Snackbar from 'react-native-snackbar';
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from 'react-native-autocomplete-dropdown';
import {hostelNames} from '../constants/hostelNames';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

type userDetailsProps = PropsWithChildren<{
  userEmail: string;
  userName: string;
}>;
const digitsOnly = (value: string | undefined) =>
  /^\d+$/.test(value!) || value!.length === 0;

const SignupFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  hostelName: Yup.string().required('Enter a valid Hostel Name'),
  roomNo: Yup.string()
    .required('Room No. is required')
    .test('roomNo', 'Enter a valid Room No', digitsOnly)
    .max(3, 'Max value: 999'),
});

const SignupScreen = ({route, navigation}: SignupProps) => {
  const [loading, setLoading] = useState(false);
  const {userEmail, userName}: userDetailsProps = route.params;

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(userEmail, userName);
    Snackbar.show({
      text: 'User Not Registered! Register First.',
      duration: Snackbar.LENGTH_LONG,
    });
  }, [userEmail, userName]);

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingTxt}>Signup</Text>
        </View>
        <Formik
          validationSchema={SignupFormSchema}
          initialValues={{
            email: userEmail,
            name: userName,
            hostelName: '',
            roomNo: '',
          }}
          onSubmit={values => {
            setLoading(true);
            console.log(values);
            setTimeout(() => {
              setLoading(false);
              navigation.replace('Main');
            }, 2000);
          }}
          onReset={values => {
            signOut();
            navigation.replace('Login');
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            handleReset,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                label="Your Email"
                editable={false}
                style={styles.formFields}
              />

              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                label="Your Name"
                editable={false}
                style={styles.formFields}
              />
              <Text style={styles.placeholder}>Hostel Name</Text>
              <AutocompleteDropdown
                clearOnFocus={true}
                onBlur={handleBlur('hostelName')}
                onChangeText={handleChange('hostelName')}
                onSelectItem={value =>
                  setFieldValue('hostelName', value?.title)
                }
                textInputProps={{
                  placeholder: 'Search Hostel',
                  placeholderTextColor: 'black',
                  style: {
                    color: 'black',
                  },
                }}
                dataSet={hostelNames}
                containerStyle={styles.dropdownContainer}
                inputContainerStyle={styles.inputContainer}
                // suggestionsListTextStyle={styles.suggestionListText}
              />
              <View style={styles.hairline} />

              {/* <TextInput
                onChangeText={handleChange('hostelName')}
                onBlur={handleBlur('hostelName')}
                value={values.hostelName}
                label="Hostel Name"
                style={styles.formFields}
              /> */}
              {touched.hostelName && errors.hostelName && (
                <Text style={styles.errors}>{errors.hostelName}</Text>
              )}
              <TextInput
                onChangeText={handleChange('roomNo')}
                onBlur={handleBlur('roomNo')}
                value={values.roomNo}
                keyboardType="number-pad"
                label="Room No"
                style={styles.formFields}
              />
              {touched.roomNo && errors.roomNo && (
                <Text style={styles.errors}>{errors.roomNo}</Text>
              )}

              <Button
                title="Sign Up"
                loading={loading}
                style={styles.buttons}
                loadingIndicatorPosition="overlay"
                onPress={handleSubmit}
              />
              <Button
                title="Log Out"
                style={styles.buttons}
                onPress={handleReset}
              />
            </View>
          )}
        </Formik>
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
  },
  formContainer: {
    margin: 18,
  },
  formFields: {
    marginBottom: 5,
  },
  headingTxt: {
    fontSize: 32,
    margin: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  buttons: {
    margin: 5,
  },
  dropdownContainer: {
    // backgroundColor: 'blue',

    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '',
    borderRadius: 15,
    // padding: ,
  },
  placeholder: {
    color: 'black',
    marginStart: 14,
    fontSize: 12,
    marginTop: 5,
  },

  errors: {
    color: '#f03040',
    fontSize: 14,
    marginBottom: 10,
    marginStart: 10,
  },
  hairline: {
    backgroundColor: '#ccc8c8',
    height: 1.5,
    width: 'auto',
  },
});
