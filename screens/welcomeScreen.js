import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const WelcomeScreen = ({ navigation }) => {
  const [drawerVisible, setDrawerVisible] = useState(true); 
  const translateY = new Animated.Value(500); 
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        Animated.timing(translateY, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setDrawerVisible(false);
          translateY.setValue(0);
        });
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFF00', '#FFD700']}
        style={styles.background}
      >
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {!drawerVisible && (
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.loading}
          >
            <Text style={styles.loadingText}>Loading...</Text>
          </Animatable.View>
        )}
      </LinearGradient>

      <Modal
        animationType="none"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleStateChange}
          >
            <Animated.View style={[styles.drawer, { transform: [{ translateY }] }]}>
              <Text style={styles.drawerText}>Please select your language</Text>
              <TouchableOpacity style={styles.languageButton} onPress={() => navigation.navigate('Auth')}>
                <Text style={styles.languageText}>Sinhala</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageButton} onPress={() => navigation.navigate('Auth')}>
                <Text style={styles.languageText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageButton} onPress={() => navigation.navigate('Auth')}>
                <Text style={styles.languageText}>Tamil</Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loading: {
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  drawerText: {
    textAlign: 'center',
    paddingBottom: 15,
  },
  languageButton: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 15,
    margin: 5,
  },
  languageText: {
    color: '#31363F',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
