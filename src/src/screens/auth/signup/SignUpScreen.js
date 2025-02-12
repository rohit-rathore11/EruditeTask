import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ImageBackground, ScrollView } from 'react-native';
import CustomInput from '../../../components/CustomInput'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import qs from 'qs';

// Validation Schema
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  username:Yup.string().required('username is required'),
});

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = async (values, { resetForm }) => {
    try {
      const formData = qs.stringify(values);
  
      const response = await axios.post(
        'http://3.7.81.243/projects/plie-api/public/api/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      Alert.alert('Success', 'Sign up successful!');
      resetForm();
      // navigation.navigate('LoginScreen');  
    }catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        Alert.alert('Response data:', error.response.data);
        Alert.alert('Status code:', error.response.status);
        Alert.alert('Headers:', error.response.headers);
        Alert.alert('Error', error.response.data?.message || 'Server error');
      } else if (error.request) {
        // Request was made but no response received
        Alert.alert('No response received:', error.request);
        Alert.alert('Error', 'No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        console.log('Error in setting up request:', error.message);
        Alert.alert('Error', 'Error setting up the request');
      }
    }
    
  };

  return (
    <ScrollView style={styles.container}>
    <ImageBackground source={require('../../../assets/Path.png')} style={{alignItems:"center"}}>
    <Image source={require('../../../assets/signup.png')} style={styles.signup}/>
    </ImageBackground>
    <View style={{padding:25}}>
    <Text style={styles.title}>Sign up</Text>
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '',username:"" }}
      validationSchema={SignUpSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <CustomInput
            label="First Name"
            placeholder="Enter your first name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            error={touched.firstName && errors.firstName}
          />
          <CustomInput
            label="Last Name"
            placeholder="Enter your last name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            error={touched.lastName && errors.lastName}
          />
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && errors.email}
          />
          <CustomInput
          label="username"
          placeholder="Enter your username"
          value={values.username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          error={touched.username && errors.username}
        />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password && errors.password}
          />

         <View style={styles.checkboxView}>
         <TouchableOpacity>
         <Image source={require('../../../assets/Shape.png')} style={styles.checkbox}/>
         </TouchableOpacity>
         <Text style={styles.footerText2}>
         By clicking here you are agreed to our{' '}
         <Text style={styles.Condition} onPress={() => navigation.navigate('Login')}>
         Terms & Condition
         </Text></Text>
         </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.shareOTP}>We will share OTP to your Email ID for authentication</Text>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
              Login
            </Text>
          </Text>
        </View>
      )}
    </Formik>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color:"#000"
  },
  button: {
    backgroundColor: '#314FA4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight:'400'
  },
  loginLink: {
    color: '#314FA4',
    fontWeight: '700',
    fontSize:16
  },
  signup:{
    height:209,
    width:170,
    resizeMode:"contain"
  },
  shareOTP:{
    color:"#454545",
    fontSize:12,
    fontWeight:"500",
    textAlign:"center",
    marginTop:5
  },
  footerText2: {
    marginTop: 14,
    fontWeight:'400',
    marginLeft:10
  },
  Condition: {
    color: '#314FA4',
    fontWeight: '700',
    fontSize:14,
    letterSpacing:0.78
  },
  checkbox:{
    height:16,
    width:16,
    resizeMode:'contain',
  
  },
  checkboxView:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  }
});

export default SignUpScreen;
