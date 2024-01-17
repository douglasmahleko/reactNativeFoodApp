// import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import Home from './src/screens/home';
import Restaurant from './src/screens/restaurant';
import OrderDelivery from './src/screens/orderDelivery';
import BottomTab from './src/navigation/bottomTab';

const Stack = createStackNavigator()
export default function App() {
  
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
        <Stack.Navigator 
          screenOptions={{
            headerShown:false
          }}
        >
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


