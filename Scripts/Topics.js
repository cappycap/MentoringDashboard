import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { topics, colors } from './Styles.js';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-web';

import userContext from './Context.js'

export default function Topics() {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [userData, setUserData] = useState(user)
  
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(topics)
  const [colors, setColors] = useState(colors)

  const [topicsData, setTopicsData] = useState([])

  useEffect(() => {

    if (userData == null) {
      linkTo('/welcome')
    }

  })

  return (<View style={styles.container}>
    <View style={styles.topics}>
      <TouchableOpacity style={styles.addTopicContainer}>
        <Text style={styles.addTopicContainerText}>Add New Topic</Text>
      </TouchableOpacity>
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
    <View style={styles.topicStats}>
      <Text style={styles.topicStatsHeader}>Statistics</Text>
      <View style={styles.topicStatsRow}>
        <Text style={styles.topicStatsNum}>{topicsData.length}</Text>
        <Text style={styles.topicStatsText}>Topics</Text>
      </View>
    </View>
  </View>)
}
