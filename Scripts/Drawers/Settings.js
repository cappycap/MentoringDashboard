/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { home, colors, innerDrawer } from '../Styles.js'
import { useLinkTo } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { set, get, getTTL, ttl } from '../Storage.js'

// Create drawer.
const Drawer = createDrawerNavigator()

// Items.
import AppSettings from '../AppSettings.js'
import UserSettings from '../UserSettings.js'

export default function Settings() {
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(home)
  const [colors, setColors] = useState(colors)
  const [drawerStyles, setDrawerStyles] = useState(innerDrawer)

  useEffect(() => {

  }, [])

  return (<View style={{height:'100%'}}>
    <View style={drawerStyles.drawerTop}>
      <Text style={drawerStyles.drawerTopTitle}>Settings</Text>
    </View>
    <Drawer.Navigator
      drawerType='permanent'
      drawerStyle={drawerStyles.drawer}
      sceneContainerStyle={{
        height:'100%' + 60,
        marginTop:-60
      }}
      screenContainerStyle={{}}
      drawerContentOptions={{
        activeBackgroundColor:colors.mainBackground,
        activeTintColor:colors.secondaryHighlight,
        inactiveTintColor:colors.mainTextColor,
        style: {
        },
        contentContainerStyle: {

        },
        labelStyle: {

        },
        itemStyle: {
          marginBottom:0,
          marginTop:0,
          paddingLeft:3,
        }
      }}
    >
      <Drawer.Screen name="AppSettings" component={AppSettings}
        options={{
          title:'App Settings - CS/M Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='phone-portrait'
              type='ionicon'
              size={20}
              style={{backgroundColor:''}}
              color={focused ? colors.secondaryHighlight : colors.mainTextColor}
            />
          ),
          drawerLabel:({focused}) => {
            const color = focused ? colors.secondaryHighlight : colors.mainTextColor
            return (<Text style={{marginLeft:-25,fontSize:14,fontFamily:'Poppins',color:color}}>App Settings</Text>)
          }
        }}
      />
      <Drawer.Screen name="UserSettings" component={UserSettings}
        options={{
          title:'User Settings - CS/M Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='cog'
              type='ionicon'
              size={20}
              style={{backgroundColor:''}}
              color={focused ? colors.secondaryHighlight : colors.mainTextColor}
            />
          ),
          drawerLabel:({focused}) => {
            const color = focused ? colors.secondaryHighlight : colors.mainTextColor
            return (<Text style={{marginLeft:-25,fontSize:14,fontFamily:'Poppins',color:color}}>User Settings</Text>)
          }
        }}
      />
    </Drawer.Navigator>
  </View>)

}
