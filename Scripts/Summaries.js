import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useLinkTo, Link } from '@react-navigation/native'
import { summaries, colors } from './Styles.js'
import { Button, Icon } from 'react-native-elements'
import { TextInput } from 'react-native-web'
import ActivityIndicatorView from './ActivityIndicatorView.js'
import { getSummaries, getAppointments, getTopics, getUsers, getTimeSince, sqlToJsDate, parseSimpleDateText } from './API.js'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './StyleSheets/summaries.css'

import userContext from './Context.js'

export default function Summaries() {

  const user = useContext(userContext)
  const linkTo = useLinkTo()

  // Topics and user data.
  const [userData, setUserData] = useState(user)
  const [summData, setSummData] = useState([])

  // UI control.
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(summaries)
  const [displaying, setDisplaying] = useState(false)
  const [summIndex, setSummIndex] = useState(0)
  const [updating, setUpdating] = useState(false)

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete'}
  ]

  const hiddenIds = []

  const getData = async () => {

    //const newData = await getTopics(user.Token)

    // Temporary testing data.
    const summaryData = [
      {
        Id:41,
        AppointmentId:1,
        UserID:1,
        Topic:'Title1',
        SummaryText:'Met with mentor and decided to design a game this year.',
        Status:'Submitted',
        Created:'2021-10-10 08:00:00',
        LastUpdate:'2021-10-10 08:00:00',
        ActiveTopic:1,
      },
      {
        Id:2,
        AppointmentId:2,
        UserID:1,
        Topic:'Title2',
        SummaryText:'Met with mentor and decided to whitebox a level this month in Unity',
        Created:'2021-11-16 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        Status:'Edited',
      },
      {
        Id:3,
        AppointmentId:3,
        UserID:1,
        Topic:'Title3',
        SummaryText:'Met with mentor and decided to go into game design',
        Created:'2021-12-04 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        Status:'Edited',
      },
      {
        Id:4,
        AppointmentId:4,
        Topic:'Title4',
        UserID:1,
        SummaryText:'Met with mentor and decided to go into game design',
        Created:'2021-12-04 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        Status:'Edited',
      },
      {
        Id:5,
        AppointmentId:5,
        Topic:'Title5',
        UserID:1,
        SummaryText:'Met with mentor and decided to go into game design',
        Created:'2021-12-04 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        Status:'Edited',
      },
      {
        Id:6,
        AppointmentId:6,
        Topic:'Title6',
        UserID:1,
        SummaryText:'Met with mentor and decided to go into game design',
        Created:'2021-12-04 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        Status:'Edited',
      }
    ]

    const pairData = {
      Id:1,
      MentorId:2,
      MenteeId:1,
      Created:'2021-12-04 08:00:00',
      LastUpdate:'2021-12-04 08:00:00',
      PrivacyAccepted:0,
    }

    const mentorData = {
        Id:2,
        FirstName:'Christina',
        LastName:'Heater',
      }

    const menteeData = {
      Id:1,
      FirstName:'Elijah',
      LastName:'Gonzales',
    }

    const topicData = [
      {
        Id:1,
        PostedBy:1,
        DueDate:'2021-09-31 08:00:00',
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
      },
      {
        Id:3,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'December Discussion',
        Description:'What are your goals for after you graduate?',
        Created:'2021-10-01 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        ActiveTopic:0,
      },
      {
        Id:4,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'January Discussion',
        Description:'What are your goals for after you graduate?',
        Created:'2021-10-01 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        ActiveTopic:0,
      },
      {
        Id:5,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'February Discussion',
        Description:'What are your goals for after you graduate?',
        Created:'2021-10-01 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        ActiveTopic:0,
      },
      {
        Id:6,
        PostedBy:1,
        DueDate:'2021-10-31 08:00:00',
        Title:'March Discussion',
        Description:'What are your goals for after you graduate?',
        Created:'2021-10-01 08:00:00',
        LastUpdate:'2021-10-01 08:00:00',
        ActiveTopic:0,
      }
    ]

    const apptData = [
      {
        Id:1,
        PairId:1,
        TopicId:1,
        ScheduledAt:'2021-09-15 08:00:00',
        Status:'Completed',
        Created:'2021-09-01 08:00:00',
        LastUpdate:'2021-09-27 08:00:00',
      },
      {
        Id:2,
        PairId:1,
        TopicId:2,
        ScheduledAt:'2021-09-15 08:00:00',
        Status:'Completed',
        Created:'2021-09-01 08:00:00',
        LastUpdate:'2021-09-27 08:00:00',
      },
      {
        Id:3,
        PairId:2,
        TopicId:3,
        ScheduledAt:'2021-09-15 08:00:00',
        Status:'Completed',
        Created:'2021-09-01 08:00:00',
        LastUpdate:'2021-09-27 08:00:00',
      },
      {
        Id:4,
        PairId:2,
        TopicId:4,
        ScheduledAt:'2021-09-15 08:00:00',
        Status:'Completed',
        Created:'2021-09-01 08:00:00',
        LastUpdate:'2021-09-27 08:00:00',
      },
      {
        Id:5,
        PairId:3,
        TopicId:5,
        ScheduledAt:'2021-09-15 08:00:00',
        Status:'Completed',
        Created:'2021-09-01 08:00:00',
        LastUpdate:'2021-09-27 08:00:00',
      },
      {
        Id:6,
        PairId:3,
        TopicId:6,
        ScheduledAt:'2021-09-15 08:00:00',
        Status:'Completed',
        Created:'2021-09-01 08:00:00',
        LastUpdate:'2021-09-27 08:00:00',
      }
    ]

    //const newData = await getSummaries(user.Token)

    // Calculate created display time variable.
    for (var i = 0; i < summaryData.length; i++) {
      var summ = summaryData[i]

      var apptId = summ.AppointmentId
      var topicId = 0
      for (var j = 0; j < apptData.length; j++) {
        if (apptId == apptData[j].Id) {
          topicId = apptData[j].TopicId
          summ.PairId = apptData[j].PairId
        }
      }

      for (var j = 0; j < topicData.length; j++) {
        if (topicId == topicData[j].Id) {
          summ.Topic = topicData[j].Title
          summ.TopicDesc = topicData[j].Description
        }
      }

      //Use API call to access endpoints and obtain Pair from PairID;
      //Then use two more API calls to access mentor and mentee through
      //Associated id's

      summ.MentorName = mentorData.FirstName + ' ' + mentorData.LastName
      summ.MenteeName = menteeData.FirstName + ' ' + menteeData.LastName

      var summTimeStr = ''

      var curTime = new Date()
      var summTime = sqlToJsDate(summ.Created)
      var diff = curTime - summTime

      console.log('diff:',diff,'d1:',curTime,'d2:',summTime)

      // Is this post over 3 days old? seconds*ms
      if (diff >= 259200*1000) {
        summTimeStr = parseSimpleDateText(summTime)
      } else {
        summTimeStr = getTimeSince(diff) + ' ago'
      }

      summaryData[i].TimeString = summTimeStr

    }

    if (summaryData.length > 0) {
      setSummData(summaryData)
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

  const changeDisplay = (index) => {
    setSummIndex(index)
    setDisplaying(true)
  }

  const returnSummaries = () => {
    setSummIndex(0)
    setDisplaying(false)
  }

  // const handleDropDownSelect = (index) => (event, data) => {
  //  console.log(data.value)
  //  console.log(index)
  //  if(data.value == 'hide'){
  //    //API call to remove summary after caution
  //    setUpdating(true)
  //    summData.splice(index, 1)
  //  }
  // }

  if(displaying){
    return (<ScrollView>
      {refreshing && (<View style={styles.activityIndicatorContainer}>
        <ActivityIndicatorView />
      </View>) || (<View style={styles.container}>
      <View style={styles.summariesHeader}>
        <Text style={styles.summariesHeaderText}>Summaries</Text>
      </View>
      <View style={styles.summaries}>

        <View style={styles.summary} key={'summary_'+summIndex}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryHeaderText}>{summData[summIndex].Topic}</Text>
              <Text style={styles.summaryHeaderTime}>{summData[summIndex].TimeString}</Text>
              <Text style={styles.summaryHeaderUsers}>{'Mentor: ' + summData[summIndex].MentorName}</Text>
              <Text style={styles.summaryHeaderUsers}>{'Mentee: ' + summData[summIndex].MenteeName}</Text>
            </View>
          </View>
          <View style={styles.summarBody}>
            <Text style={styles.summaryBodyTopicText}>{'Topic: ' + summData[summIndex].TopicDesc}</Text>
            <Text style={styles.summaryBodyText}>{summData[summIndex].SummaryText}</Text>
          </View>
          <View style={styles.summaryButton}>
          <Button
            title='Back'
            buttonStyle={styles.summariesHeaderButton}
            onPress={returnSummaries}
          />
          </View>
        </View>


      </View>
    </View>)}
    </ScrollView>)
  }

  if(updating){
    setUpdating(false)
    return <View></View>
  }

  return (<ScrollView>
    {refreshing && (<View style={styles.activityIndicatorContainer}>
      <ActivityIndicatorView />
    </View>) || (<View style={styles.container}>
    <View style={styles.summariesHeader}>
      <Text style={styles.summariesHeaderText}>Summaries</Text>
    </View>
    <View style={styles.summaries}>
      {summData.map((summ, index) => {
        // if(hiddenIds.includes(summ.Id)){
        //   return;
        //   console.log('Hid post')
        // }

        return (<View style={styles.summary} key={'summary_'+index}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryHeaderText}>{summ.Topic}</Text>
              <Text style={styles.summaryHeaderTime}>{summ.TimeString}</Text>
            </View>
          </View>
          <View style={styles.summarBody}>
            <Text style={styles.summaryBodyTopicText}>{'Topic: ' + summ.TopicDesc}</Text>
            <Text style={styles.summaryBodyText}>{summ.SummaryText}</Text>
          </View>
          <View style={styles.summaryButton}>
          <Button
            title='View Summary'
            buttonStyle={styles.summariesHeaderButton}
            onPress={() => changeDisplay(index)}
          />
          </View>
        </View>)

      })}
    </View>
  </View>)}
  </ScrollView>)
}


// <Dropdown
//   className='summDropdown'
//   floating
//   pointing='right'
//   direction='left'
//   options={options}
//   trigger={<Icon
//     name='ellipsis-horizontal-outline'
//     type='ionicon'
//     size={28}
//     color={colors.mainTextColor}
//     style={{}}
//   />}
//   onChange ={handleDropDownSelect(index)}
// />
