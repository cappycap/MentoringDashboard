import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useLinkTo, Link } from '@react-navigation/native'
import { topics, colors } from './Styles.js'
import { Button, Icon } from 'react-native-elements'
import { TextInput } from 'react-native-web'
import ActivityIndicatorView from './ActivityIndicatorView.js'
import { getTopics } from './API.js'

import userContext from './Context.js'

export default function Topics() {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  // Topics and user data.
  const [userData, setUserData] = useState(user)
  const [topicsData, setTopicsData] = useState([])

  // UI control.
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(topics)

  const getData = async () => {

    //const newData = await getTopics(user.Token)

    // Temporary testing data.
    const newData = [
      {
        Id:1,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'October Discussion',
        Description:'Please talk with your mentor about what you\'d like to accomplish this year.',
        Created:'2021-10-05 08:00:00',
        LastUpdate:'2021-10-05 08:00:00',
        ActiveTopic:1,
      },
      {
        Id:2,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'November Discussion',
        Description:'What is something your mentor and you could accomplish together by the end of the quarter?',
        Created:'2021-10-01 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        ActiveTopic:0,
      }
    ]

    if (newData.length > 0) {
      setTopicsData(newData)
      setRefreshing(false)
    }

  }

  useEffect(() => {

    if (userData == null) {
      linkTo('/welcome')
    } else {
      getData()
    }

  }, [])

  const addNewTopicTrigger = () => {

  }

  return (<View>
    {refreshing && (<View style={styles.activityIndicatorContainer}>
      <ActivityIndicatorView />
    </View>) || (<View style={styles.container}>
    <View style={styles.topicsHeader}>
      <Text style={styles.topicsHeaderText}>Topics</Text>
      <Button 
        title='Add New Topic'
        buttonStyle={styles.topicHeaderButton}
        onPress={addNewTopicTrigger}
      />
    </View>
    <View style={styles.topics}>
      {topicsData.map((topic, index) => {

        return (<View style={styles.topic} key={'topic_'+index}>
          <View style={styles.topicHeader}>
            <Text style={styles.topicHeaderText}>{topic.Title}</Text>
            <Icon
              name='ellipsis-horizontal-outline'
              type='ionicon'
              size={28}
              color={colors.mainTextColor}
              style={{}}
            />
          </View>
        </View>)

      })}
    </View>
  </View>)}
  </View>)
}
