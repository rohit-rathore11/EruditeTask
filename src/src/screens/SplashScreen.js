import React, { useEffect } from 'react';
import { View, StyleSheet,Image } from 'react-native'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUpScreen'); 
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.img}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  img: {
    resizeMode:"contain",
    height:300,
    width:300
  }
});

export default SplashScreen;
