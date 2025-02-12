import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ label, placeholder, value, onChangeText, onBlur, error, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.errorBorder]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color:"#4F4F4F"
  },
  input: {
    borderBottomColor:"#B3B3B3",
    borderBottomWidth:1
  },
  errorBorder: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12
  }
});

export default CustomInput;
