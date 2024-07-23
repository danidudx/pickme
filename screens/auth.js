import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Flag from 'react-native-flags'; 
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Auth = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: '',
        headerShown: false,
    });
  }, [navigation]);

  const countryOptions = [
    { code: 'US', dial_code: '+1', flag: 'US' },
    { code: 'IN', dial_code: '+91', flag: 'IN' },
    { code: 'GB', dial_code: '+44', flag: 'GB' },
    
  ];

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
          Enter your mobile number. We'll text you a verification code.
        </Text>
      </LinearGradient><View style={styles.contentwrap}>
      <View style={styles.inputContainer}>
        <View style={styles.countryCodeContainer}>
          <Flag code={countryOptions.find(c => c.code === selectedCountry)?.flag} size={32} />
          <Text style={styles.countryCode}>{countryOptions.find(c => c.code === selectedCountry)?.dial_code}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCountry}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
              mode="dropdown"
            >
              {countryOptions.map((country) => (
                <Picker.Item key={country.code} label={country.code} value={country.code} />
              ))}
            </Picker>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          
          navigation.navigate('Authentication',{ phoneNumber,countryCode: selectedCountry });
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentwrap: {
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    
  },
  gradient: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    color: '#31363F',
    marginBottom: 0,
    paddingRight:20,
    paddingLeft:20,
  },
  image: {
    width: '100%',
    height: 70,
    marginTop:20,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    flex: 1, 
  },
  countryCode: {
    marginLeft: 10,
    fontSize: 16,
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center', 
  },
  picker: {
    height: 50,
    width: '100%', 
  },
  input: {
    flex: 2, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  nextButton: {
    width: '100%',
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
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
    zIndex: 1, 
    
  },
});

export default Auth;
