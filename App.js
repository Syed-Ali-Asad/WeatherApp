import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import WeatherDetails from './screens/WeatherDetails';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown : false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="WeatherDetails" component={WeatherDetails}/>
          </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({})