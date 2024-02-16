import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Landing from '../screens/preAuth/Landing';
import Calculator from '../screens/preAuth/Calculator';
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function PreAuthNavigator(props) {
  const {colors} = useTheme()
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerStyle: {
 
      backgroundColor:colors.secondary,
    
    }, headerShadowVisible: false,}
    }>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Calculator"
        component={Calculator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default PreAuthNavigator;
