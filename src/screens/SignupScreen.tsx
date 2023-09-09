import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
// import {Button} from '@react-native-material/core';
import {TextInput, Button} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

import Snackbar from 'react-native-snackbar';
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from 'react-native-autocomplete-dropdown';
import {hostelNames} from '../constants/hostelNames';
import {HostelData} from '..';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

type UserDataProps = PropsWithChildren<{
  email: string;
  name: string;
  hostelName: HostelData;
  roomNo: string;
}>;
const digitsOnly = (value: string | undefined) =>
  /^\d+$/.test(value!) || value!.length === 0;

const SignupFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  hostelName: Yup.mixed<HostelData>().required('Enter a valid Hostel Name'),
  roomNo: Yup.string()
    .required('Room No. is required')
    .test('roomNo', 'Enter a valid Room No', digitsOnly)
    .max(3, 'Max value: 999'),
});

const SignupScreen = ({route, navigation}: SignupProps) => {
  const [loading, setLoading] = useState(false);
  const [userData, setuserData] = useState<UserDataProps>({
    email: route.params?.userEmail,
    name: route.params?.userName,
    hostelName: {title: '', id: ''},
    roomNo: '',
  });

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Snackbar.show({
      text: 'User Not Registered! Register First.',
      duration: Snackbar.LENGTH_LONG,
    });
  }, [userData]);

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingTxt}>Signup</Text>
        </View>
        <Formik
          validationSchema={SignupFormSchema}
          initialValues={userData}
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
                  setFieldValue('hostelName', value)
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
              />
              <View style={styles.hairline} />

              {touched.hostelName && errors.hostelName && (
                <Text style={styles.errors}>{errors.hostelName.title}</Text>
              )}
              <TextInput
                onChangeText={handleChange('roomNo')}
                onBlur={handleBlur('roomNo')}
                value={values.roomNo}
                keyboardType="number-pad"
                label="Room No"
                error={touched.roomNo && errors.roomNo ? true : false}
                style={styles.formFields}
              />
              {touched.roomNo && errors.roomNo && (
                <Text style={styles.errors}>{errors.roomNo}</Text>
              )}

              <Button
                loading={loading}
                disabled={loading}
                mode="contained"
                style={styles.buttons}
                onPress={handleSubmit}>
                Sign Up
              </Button>
              <Button
                mode="contained-tonal"
                disabled={loading}
                style={styles.buttons}
                onPress={handleReset}>
                Log Out
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {},
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
