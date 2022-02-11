/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { home, colors, innerDrawer } from '../Styles.js'
import { useLinkTo } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { set, get, getTTL, ttl } from '../Storage.js'

// Create drawer.
const Drawer = createDrawerNavigator()

// Items.
import Topics from '../Topics.js'
import Summaries from '../Summaries.js'

export default function Home() {

  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(home)

  const [drawerStyles, setDrawerStyles] = useState(innerDrawer)

  useEffect(() => {

  }, [])

  return (<View style={{height:'100%'}}>
    <View style={drawerStyles.drawerTop}>
      <Text style={drawerStyles.drawerTopTitle}>Home</Text>
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
      <Drawer.Screen name="Topics" component={Topics}
        options={{
          title:'Topics - CS/M Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='albums'
              type='ionicon'
              size={20}
              style={{backgroundColor:''}}
              color={focused ? colors.secondaryHighlight : colors.mainTextColor}
            />
          ),
          drawerLabel:({focused}) => {
            const color = focused ? colors.secondaryHighlight : colors.mainTextColor
            return (<Text style={{marginLeft:-25,fontSize:14,fontFamily:'Poppins',color:color}}>Topics</Text>)
          }
        }}
      />

      <Drawer.Screen name="Summaries" component={Summaries}
        options={{
          title:'Summaries - CS/M Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon
              name='pencil'
              type='ionicon'
              size={20}
              style={{backgroundColor:''}}
              color={focused ? colors.secondaryHighlight : colors.mainTextColor}
            />
          ),
          drawerLabel:({focused}) => {
            const color = focused ? colors.secondaryHighlight : colors.mainTextColor
            return (<Text style={{marginLeft:-25,fontSize:14,fontFamily:'Poppins',color:color}}>Summaries</Text>)
          }
        }}
      />
    </Drawer.Navigator>
  </View>)

}
