import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { welcome, colors, logo, messageBox, boxColors } from '../Scripts/Styles.js';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-web';

import userContext from './Context.js'

export default function Welcome() {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [userData, setUserData] = useState(user)
  
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(welcome)
  const [colors, setColors] = useState(colors)

  // Form data.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Control data.
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (userData != null) {
        linkTo('/home')
    }
  })

  const updateEmail = (t) => {
    setShowError(false)
    setEmail(t)
  }

  const updatePassword = (t) => {
    setShowError(false)
    setPassword(t)
  }

  const logIn = async () => {
    var check = await loginCheck(email, password)
  }

  return (<View style={styles.container}>
    <Image 
      source={logo} 
      style={styles.logo}    
    />
    <View style={styles.logInContainer}>
      <View style={styles.logInStripeTop}></View>
      <View style={styles.logIn}>
        <Text style={styles.logInTitle}>Log In to CS/M Dashboard</Text>
        {showError && (<View style={messageBox.errorBox}>
          <Text style={messageBox.text}>There was a problem logging you in!{'\n'}Please check your credentials and try again.</Text>
        </View>)}
        <View style={styles.inputGroup}>
          <TextInput 
            placeholder={'Email...'} 
            style={styles.logInTextInput} 
            value={email}
            onChangeText={updateEmail}
          />
          <TextInput 
            placeholder={'Password...'} 
            style={styles.logInTextInput}
            value={password} 
            onChangeText={updatePassword}
          />
        </View>
        <Button 
          title={'Submit'}
          buttonStyle={styles.logInSubmitButton} 
          onPress={() => logIn}
          disabled={email.length == 0 || password.length < 8}
        />
        <Text style={styles.forgotPasswordText}>Forgot password?
        <Link to={'/forgot-password'} style={styles.forgotPasswordLink}>No problem!</Link>
        </Text>
      </View>
      <View style={styles.logInStripeBottom}></View>
    </View>
  </View>)
}
