import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useLinkTo, Link } from '@react-navigation/native'
import { topics, colors } from './Styles.js'
import { Button, Icon } from 'react-native-elements'
import { TextInput } from 'react-native-web'
import ActivityIndicatorView from './ActivityIndicatorView.js'
import { getTopics, getTimeSince, sqlToJsDate, parseSimpleDateText } from './API.js'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './StyleSheets/topics.css'

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

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]

  const getData = async () => {

    console.log(user)

    //const newData = await getTopics(user.Id, user.Token)

    // Temporary testing data.
    const newData = [
      {
        Id:1,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'October Discussion',
        Description:'Please talk with your mentor about what you\'d like to accomplish this year.',
        Created:'2021-10-10 08:00:00',
        LastUpdate:'2021-10-10 08:00:00',
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

    // Calculate created display time variable.
    for (var i = 0; i < newData.length; i++) {

      var topic = newData[i]

      var topicTimeStr = ''

      var curTime = new Date()
      var topicTime = sqlToJsDate(topic.Created)
      var diff = curTime - topicTime

      console.log('diff:',diff,'d1:',curTime,'d2:',topicTime)

      // Is this post over 3 days old? seconds*ms
      if (diff >= 259200*1000) {
        topicTimeStr = parseSimpleDateText(topicTime)
      } else {
        topicTimeStr = getTimeSince(diff) + ' ago'
      }

      newData[i].TimeString = topicTimeStr

    }

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
        buttonStyle={styles.topicsHeaderButton}
        onPress={addNewTopicTrigger}
      />
    </View>
    <View style={styles.topics}>
      {topicsData.map((topic, index) => {

        return (<View style={styles.topic} key={'topic_'+index}>
          <View style={styles.topicHeader}>
            <View>
              <Text style={styles.topicHeaderText}>{topic.Title}</Text>
              <Text style={styles.topicHeaderTime}>{topic.TimeString}</Text>
            </View>
            <Dropdown
              className='topicDropdown'
              floating
              pointing='right'
              direction='left'
              options={options}
              trigger={<Icon
                name='ellipsis-horizontal-outline'
                type='ionicon'
                size={28}
                color={colors.mainTextColor}
                style={{}}
              />}
            />
          </View>
          <View style={styles.topicBody}>
            <Text style={styles.topicBodyText}>{topic.Description}</Text>
          </View>
        </View>)

      })}
    </View>
  </View>)}
  </View>)
}
