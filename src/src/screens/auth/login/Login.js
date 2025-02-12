import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ImageBackground, ScrollView } from 'react-native';
import CustomInput from '../../../components/CustomInput'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation Schema
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const LoginScreen = ({ navigation }) => {
  const handleSignUp = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://3.7.81.243/projects/plie-api/public/api/register', values);
      Alert.alert('Success', 'Sign up successful!',response);
      resetForm();
      // navigation.navigate('VerifyCode');  
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
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
      initialValues={{ email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && errors.email}
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
          <Text style={styles.loginLink}>Forgot password?</Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
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
    fontSize:16,
    textAlign:"right",
    
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

export default LoginScreen;
