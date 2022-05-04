import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { empty, colors } from '../Scripts/Styles.js';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-web';

import userContext from './Context.js'

export default function ForgotPassword() {

  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [coach, setCoach] = useState(user)

  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(empty)
  const [colors, setColors] = useState(colors)

  useEffect(() => {
    document.title = 'MentoringDashboard';
    if (coach == null) {
        linkTo('/dash/welcome')
    }
  })

  return (<View style={styles.container}>
  </View>)
}
