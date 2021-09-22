import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useLinkTo } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { colors } from './Scripts/Styles.js'
import { Provider } from './Scripts/Context.js'

// URL linking configuration.
const linking = {
  prefixes: ['http://mentorship.cs.wwu.edu'],
  config: {
    screens: {
      Welcome: 'welcome',
      LogIn: 'log-in',
      ForgotPassword: 'forgot-password',
      Main: {
        screens: {
          Home: {
            screens: {
              Topics: 'topics',
            }
          },
          UserManagement: {
            screens: {
              Pairs: 'pairs',
              Users: 'users',
              }
            }
          }
        }
      }
    }
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>MentoringDashboard v1.0</Text>
      <StatusBar style="auto" />
    </View>
  );
}