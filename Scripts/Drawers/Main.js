/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, createContext, useContext, createRef } from 'react'
import { TouchableOpacity, Animated, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useLinkTo, Link, useRoute } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'
import { main, colors, logo } from '../Styles.js'

// Sub Drawers.
import Home from './Home.js'
import UserManagement from './UserManagement.js'
import Settings from './Settings.js'

import userContext from '../Context.js'

// Create Sidebar.
const Drawer = createDrawerNavigator()

export default function Main() {

  const user = useContext(userContext)
  const route = useRoute()
  const linkTo = useLinkTo()
  const [routeData] = useState({})

  const [styles, setStyles] = useState(main)
  const [colors, setColors] = useState(colors)

  const [userData, setUserData] = useState(user)
  const [userName, setUserName] = useState('')
  
  const [fromWelcome, setFromWelcome] = useState(false)
  const [showMain, setMain] = useState(false)

  const getRoute = () => {
    var route = window.location.href.split('/')
    route = route[3]
    console.log('main route:',route)
  }

  useEffect(() => {

    getRoute()
    console.log('userData:',userData)
    if (userData != null) {
      var name = userData.FirstName + ' ' + userData.LastName.charAt(0) + '.'
      setUserName(name)
      setMain(true)
    } else {
      linkTo('/welcome')
    }

  }, [])

  const logout = () => {

    set('User',null,ttl)
    setUserData(null)
    linkTo('/welcome')
    window.location.reload();

  }

  return (<>{showMain && (<View style={{flex:1}}>
    <View style={styles.header}>
      <View style={styles.headerLogoContainer}>
        <Image
            source={logo}
            resizeMode="contain"
            style={[
              styles.headerLogo
            ]}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>MentoringDashboard</Text>
      </View>
      <View style={styles.headerMain}>
        <View style={styles.headerUser}>
          <Image
            source={{ uri: userData.Avatar }}
            resizeMode="contain"
            style={styles.headerAvatar}
          />
          <View style={styles.headerUserBoxText}>
            <Text style={styles.headerUserName}>{userName}</Text>
          </View>
        </View>
      </View>
      
    </View>
    <Drawer.Navigator
      drawerType='permanent'
      drawerStyle={styles.drawer}
      drawerContentOptions={{
        activeBackgroundColor:colors.mainBackground,
        style: {
        },
        contentContainerStyle: {
          margin:0,padding:0,
        },
        labelStyle: {
          borderWidth:0,
        },
        itemStyle: {
          padding:3,
          paddingLeft:7,
          marginRight:-3,
          justifyContent:'center',
          borderTopLeftRadius:10,
          borderBottomLeftRadius:10
        }
      }}
    >
      <Drawer.Screen name="Home" component={Home} 
        options={{
          title:'Home - WWU CS Mentoring',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='home'
              type='ionicon'
              size={30}
              color={focused ? userData.SecondaryHighlight : colors.mainBackground}
            />
          )
        }}
      />
      <Drawer.Screen name="UserManagement" component={UserManagement}
        options={{
          title:'Users - WWU CS Mentoring',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='people-circle-outline'
              type='ionicon'
              size={30}
              color={focused ? userData.SecondaryHighlight : colors.mainBackground}
            />
          )
        }}
      />
      <Drawer.Screen name="Settings" component={Settings}
        options={{
          title:'Settings - WWU CS Mentoring',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='cog'
              type='ionicon'
              size={30}
              color={focused ? userData.SecondaryHighlight : colors.mainBackground}
            />
          )
        }}
      />
    </Drawer.Navigator>
  </View>)}</>)
}
