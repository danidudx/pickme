import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Verification = ({ route, navigation }) => {
  const { phoneNumber } = route.params; 
  const [otp, setOtp] = useState(['', '', '', '']);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleChangePhoneNumber = () => {
    navigation.goBack(); 
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden={true} />
      <LinearGradient
        colors={['#FFE5B4', '#f2f2f2']}
        style={styles.gradient}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#222831" />
        </TouchableOpacity>
        <Image source={require('../assets/phone.png')} style={styles.image} />
        <Text style={styles.title}>
          Please enter the 4-Digit code provided via SMS or call to
        </Text>
      </LinearGradient>
      <View style={styles.contentwrap}>
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          <TouchableOpacity onPress={handleChangePhoneNumber}>
            <Text style={styles.changeLabel}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              
              console.log('Retrying OTP request');
            }}
          >
            <Text style={styles.retryLabel}>Didn't get code?</Text>
            <Text style={styles.tryLabel}>Try again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              
              console.log('OTP Submitted:', otp.join(''));
              
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    gradient: {
      paddingTop:20, 
      alignItems: 'center',
      paddingVertical: 10, 
    },
    backButton: {
      position: 'absolute',
      top: 20, 
      left: 20,
      zIndex: 1,
    },
    image: {
        width: '100%',
        height: 70,
        marginTop:20,
        resizeMode: 'contain',
        marginBottom: 10, 
    },
    title: {
      textAlign: 'center',
      color: '#31363F',
      paddingHorizontal: 50,
    },
    contentwrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
     
    },
    phoneContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
      marginBottom: 15, 
      padding:10,
    },
    phoneNumber: {
      fontSize: 16,
      color: '#31363F',
      fontWeight: 'bold',
    },
    changeLabel: {
      fontSize: 16,
      color: '#FFD700',
      paddingLeft:10,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 15, 
    },
    otpInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 22,
      marginHorizontal: 5,
    },
    bottomContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10, 
    },
    retryLabel: {
      fontSize: 16,
      color: '#222831',
      fontWeight:'500',
    },
    tryLabel: {
        fontSize: 16,
        color: '#FFD700',
      },
    nextButton: {
      backgroundColor: '#FFD700',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      alignItems: 'center',
    },
    nextButtonText: {
      color: '#222831',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default Verification;
