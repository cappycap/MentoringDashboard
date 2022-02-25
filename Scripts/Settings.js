import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { settings, colors, btnColors } from '../Scripts/Styles.js';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-web';
import { Popup } from 'semantic-ui-react'
import { changePasswordRequest } from './API.js'

import userContext from './Context.js'

export default function Empty() {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [coach, setCoach] = useState(user)
  
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(settings)
  const [colors, setColors] = useState(colors)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
  const [showSuccessBox, setShowSuccessBox] = useState(false)
  const [showErrorBox, setShowErrorBox] = useState(false)
  const [requiredMessage, setRequiredMessage] = useState('Ensure password follows requirements.')

  const [showActivityIndicator, setShowActivityIndicator] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  useEffect(() => {
    if (coach == null) {
        linkTo('/welcome')
    }
  })

  // Update password functions.
  const validatePass = (p) => {
    var ret = true
    // Check length, uppercase, and special.
    var containsSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var doesntContainUppercase = (p === p.toLowerCase);
    if (p.length < 9 || !containsSpecial.test(p) || doesntContainUppercase) {
      ret = false
    }
    return ret
  }

  const validateInput = (text, type) => {

    // Save to var.
    var other = false
    var otherPass = ''
    if (type == 0) {
      setPassword(text)
      other = validatePass(passwordConfirm)
      otherPass = passwordConfirm
    } else if (type == 1) {
      setPasswordConfirm(text)
      other = validatePass(password)
      otherPass = password
    } else if (type == 2) {
      setOldPassword(text)
    }

    // Validation checks.
    if (validatePass(text) && other) {
      console.log('')
      if (text === otherPass) {
        setSubmitButtonDisabled(false)
      } else {
        setRequiredMessage('Passwords must match.')
        setSubmitButtonDisabled(true)
      }
    } else {
      setRequiredMessage('Ensure password follows requirements.')
      setSubmitButtonDisabled(true)
    }
    setShowSuccessBox(false)

  }

  const submitInput = async () => {
    setSubmitButtonDisabled(true)
    setShowForm(false)
    setShowActivityIndicator(true)
    var post = await changePasswordRequest(oldPassword, password, user.Token)
    setShowActivityIndicator(false)
    if (post) {
      setShowSuccessBox(true)
      setOldPassword('')
      setPassword('')
      setPasswordConfirm('')
    } else {
      setShowErrorBox(true)

    }
  }

  return (<View style={styles.container}>
    <View style={styles.bodyContainer}>
        <Icon name='lock-closed' size={50} type='ionicon' color={styles.mainTextColor}/>
        <Text style={styles.bodyTitle}>Update Password</Text>
        <Text style={styles.bodyDesc}>Enter something memorable and secure:{"\n"}9+ chars, one uppercase, one special character.</Text>
        {showSuccessBox && (<View style={[styles.infoBox,{backgroundColor:btnColors.success}]}>
          <Text style={styles.infoBoxText}>Password updated!</Text>
        </View>)}
        {showErrorBox && (<View style={[styles.infoBox,{backgroundColor:btnColors.danger}]}>
          <Text style={styles.infoBoxText}>Incorrect current password provided.</Text>
        </View>)}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <TextInput
            style={[styles.inputStyle,{marginBottom:0}]}
            value={oldPassword}
            secureTextEntry={true}
            placeholder='Enter password...'
            onChangeText={(text) => validateInput(text, 2)}
          />
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            style={[styles.inputStyle,{marginBottom:0}]}
            value={password}
            secureTextEntry={true}
            placeholder='Enter password...'
            onChangeText={(text) => validateInput(text, 0)}
          />
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.inputStyle}
            value={passwordConfirm}
            secureTextEntry={true}
            placeholder='Confirm password...'
            onChangeText={(text) => validateInput(text, 1)}
          />
          {submitButtonDisabled && (<Popup 
            position='bottom center'
            wide='very'
            content={requiredMessage}
            trigger={<Button
              title='Submit'
              buttonStyle={styles.forgotPasswordButton}
              containerStyle={styles.forgotPasswordButtonContainer}
              titleStyle={{color:'#fff'}}
              onPress={submitInput}
              disabled={submitButtonDisabled}
            />}
          />) ||
          (<Button
            title='Submit'
            buttonStyle={styles.forgotPasswordButton}
            containerStyle={styles.forgotPasswordButtonContainer}
            titleStyle={{color:'#fff'}}
            onPress={submitInput}
            disabled={submitButtonDisabled}
          />)}
        </View>
      </View>
  </View>)
}
