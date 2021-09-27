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
import Pairs from '../Pairs.js'
import Users from '../Users.js'

export default function UserManagement() {
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(home)
  const [colors, setColors] = useState(colors)
  const [drawerStyles, setDrawerStyles] = useState(innerDrawer)

  useEffect(() => {

  }, [])

  return (<View style={{height:'100%'}}>
    <View style={drawerStyles.drawerTop}>
      <Text style={drawerStyles.drawerTopTitle}>User Management</Text>
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
      <Drawer.Screen name="Pairs" component={Pairs}
        options={{
          title:'Pairs - CS/M Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='people'
              type='ionicon'
              size={20}
              style={{backgroundColor:''}}
              color={focused ? colors.secondaryHighlight : colors.mainTextColor}
            />
          ),
          drawerLabel:({focused}) => {
            const color = focused ? colors.secondaryHighlight : colors.mainTextColor
            return (<Text style={{marginLeft:-25,fontSize:14,fontFamily:'Poppins',color:color}}>Pairs</Text>)
          }
        }}
      />
      <Drawer.Screen name="Users" component={Users}
        options={{
          title:'Users - CS/M Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='person-circle'
              type='ionicon'
              size={20}
              style={{backgroundColor:''}}
              color={focused ? colors.secondaryHighlight : colors.mainTextColor}
            />
          ),
          drawerLabel:({focused}) => {
            const color = focused ? colors.secondaryHighlight : colors.mainTextColor
            return (<Text style={{marginLeft:-25,fontSize:14,fontFamily:'Poppins',color:color}}>Users</Text>)
          }
        }}
      />
    </Drawer.Navigator>
  </View>)

}
