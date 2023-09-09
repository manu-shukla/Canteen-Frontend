import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {TextInput, Button, Avatar, Appbar} from 'react-native-paper';
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from 'react-native-autocomplete-dropdown';
import {hostelNames} from '../../constants/hostelNames';
import {HostelData} from '../..';

const digitsOnly = (value: string | undefined) =>
  /^\d+$/.test(value!) || value!.length === 0;

const ProfileFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  hostelName: Yup.mixed<HostelData>().required('Enter a valid Hostel Name'),
  roomNo: Yup.string()
    .required('Room No. is required')
    .test('roomNo', 'Enter a valid Room No', digitsOnly)
    .max(3, 'Max value: 999'),
});

type UserDataProps = PropsWithChildren<{
  email: string;
  name: string;
  hostelName: HostelData;
  roomNo: string;
}>;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setuserData] = useState<UserDataProps>({
    email: 'shukla.manu09@gmail.com',
    name: 'Manu Shukla',
    hostelName: hostelNames[2],
    roomNo: '123',
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <AutocompleteDropdownContextProvider>
      <Appbar.Header>
        <Appbar.Content title="My Profile" />
      </Appbar.Header>
      <View style={styles.container}>
        <Avatar.Text size={100} label="XD" />
        <Formik
          validationSchema={ProfileFormSchema}
          initialValues={userData}
          onSubmit={values => {
            setIsEditing(false);
            console.log(values);
          }}
          onReset={values => {
            values = userData;
            setIsEditing(false);
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
                editable={isEditing}
                style={styles.formFields}
              />
              {isEditing ? (
                <>
                  <Text style={styles.placeholder}>Hostel Name</Text>

                  <AutocompleteDropdown
                    clearOnFocus={true}
                    onBlur={handleBlur('hostelName')}
                    onChangeText={handleChange('hostelName')}
                    initialValue={values.hostelName}
                    onSelectItem={value => setFieldValue('hostelName', value)}
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
                </>
              ) : (
                <TextInput
                  label="Hostel Name"
                  value={values.hostelName.title}
                  editable={false}
                />
              )}

              <View style={styles.hairline} />

              {touched.hostelName && errors.hostelName && (
                <Text style={styles.errors}>{errors.hostelName.title}</Text>
              )}
              <TextInput
                onChangeText={handleChange('roomNo')}
                onBlur={handleBlur('roomNo')}
                value={values.roomNo}
                editable={isEditing}
                keyboardType="number-pad"
                label="Room No"
                error={!!(touched.roomNo && errors.roomNo)}
                style={styles.formFields}
              />
              {touched.roomNo && errors.roomNo && (
                <Text style={styles.errors}>{errors.roomNo}</Text>
              )}

              {isEditing ? (
                <Button mode="contained" onPress={handleSubmit}>
                  Save
                </Button>
              ) : (
                <Button mode="contained" onPress={handleEdit}>
                  Edit
                </Button>
              )}
              <Button
                mode="contained-tonal"
                disabled={loading}
                style={styles.buttons}
                onPress={handleReset}>
                Reset
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
  },
  formContainer: {
    margin: 18,
    width: 350,
  },
  formFields: {
    marginVertical: 8,
  },
  headingTxt: {
    fontSize: 32,
    margin: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  buttons: {
    marginVertical: 5,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderRadius: 15,
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
