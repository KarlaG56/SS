import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Camara from '../screens/Camera';
import Description from '../screens/Description'

const Stack = createNativeStackNavigator();

function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Camara" component={Camara} options={{ headerShown: false }} />
        <Stack.Screen name="Description" component={Description} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
