import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/welcomeScreen';
import Auth from './screens/auth';
import Verification from './screens/verification';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen name="Auth" component={Auth} options={{
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000', // Optional: to make the back button visible
        headerTitle: '', // Optional: to hide the title
      }}/>


<Stack.Screen name="Authentication" component={Verification}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
