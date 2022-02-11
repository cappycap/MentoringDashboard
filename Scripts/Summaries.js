import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useCallback, useContext, useRef } from 'react'
import { CSVLink } from 'react-csv'
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useLinkTo, Link } from '@react-navigation/native'
import { summaries, colors } from './Styles.js'
import { Button, Icon } from 'react-native-elements'
import { TextInput } from 'react-native-web'
import ActivityIndicatorView from './ActivityIndicatorView.js'
import { getSummaries, getAppointments, getTopics, getUsers, getPairs, getTimeSince, sqlToJsDate, parseSimpleDateText, parseTime } from './API.js'
import { Dropdown, Input } from 'semantic-ui-react'
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
  const csvLink = useRef()
  const [direc, setDirec] = useState(false)
  const [search, setSearch] = useState('')

  const filterOptions = [
    { key: 'new', text: 'Newest', value: 'new' },
    { key: 'old', text: 'Oldest', value: 'old' },
  ]

  const getData = async () => {

    const summaryData = await getSummaries(user.Token)
    console.log(summaryData)
    const apptData = await getAppointments(user.Token)
    console.log(apptData)
    const pairData = await getPairs(user.Token)
    console.log(pairData)
    const topicData = await getTopics(user.Token)
    console.log(topicData)
    const userData = await getUsers(user.Token)
    console.log(userData)

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

      for (var k = 0; k < pairData.length; k++) {
        if (summ.PairId == pairData[k].Id) {
          summ.MentorId = pairData[k].MentorId
          summ.MenteeId = pairData[k].MenteeId
          console.log(summ)
        }
      }
      for (var l = 0; l < userData.length; l++){
        if(summ.MentorId == userData[l].Id){
          summ.MentorName = userData[l].FirstName + " " + userData[l].LastName
        } else if(summ.MenteeId == userData[l].Id){
          summ.MenteeName = userData[l].FirstName + " " + userData[l].LastName
        }
      }

      var uploaderFirstName = ''
      var uploaderLastName = ''
      for(var k = 0; k < userData.length; k++){
        if(summ.UserId == userData[k].Id){
          uploaderFirstName = userData[k].FirstName
          uploaderLastName = userData[k].LastName
        }
      }
      console.log(uploaderFirstName + ' ' + uploaderLastName)
      summ.Uploader = uploaderFirstName + ' ' + uploaderLastName

      console.log(summ)

      var summTimeStr = ''

      var curTime = new Date()
      var summTime = sqlToJsDate(summ.Created)
       var diff = curTime - summTime
      //
       console.log('diff:',diff,'d1:',curTime,'d2:',summTime)

      // Is this post over 3 days old? seconds*ms
      if (diff >= 259200*1000) {
        summTimeStr = " on " + parseSimpleDateText(summTime) + " at " + parseTime(summTime)
      } else {
        summTimeStr = " " + getTimeSince(diff) + ' ago'
      }



      summaryData[i].TimeString = summTimeStr

    }

    if (summaryData.length > 0) {
      setSummData(summaryData)
      setRefreshing(false)
    }

  }

  const makeLink = () => {
    return <CSVLink data={summData} filename={'my-file.csv'} className='btn btn-primary' target='blank'>Download</CSVLink>
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

  const download = (event) => {
    csvLink.current.link.click()
  }

  const displaySummaries = () => {
    var summaryData = summData.map((x) => x)
    if(direc){
      return mapSummaries(summaryData.reverse())
    } else{
      return mapSummaries(summaryData)
    }
  }

  const includesSearch = (summ) => {
    if(summ.Uploader.includes(search) || summ.MentorName.includes(search) || summ.MenteeName.includes(search) || summ.TopicDesc.includes(search) || summ.SummaryText.includes(search)
  || summ.Topic.includes(search) || summ.TopicDesc.includes(search)){
      return true;
    }
    return false;
  }

  const mapSummaries = (data) => {
    return data.filter(includesSearch).map((summ, index) => {

      return (<View style={styles.summary} key={'summary_'+index}>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.summaryHeaderText}>{summ.Topic}</Text>
            <Text style={styles.summaryHeaderTime}>{'Uploaded by ' + summ.Uploader + summ.TimeString}</Text>
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

    })
  }

  const handleDropDownSelect = (event, data) => {
   if(data.value == 'old'){
     setDirec(true)
   } else{
     setDirec(false)
   }
  }

  const handleSearch = (event, data) => {
    setSearch(data.value)
  }

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
              <Text style={styles.summaryHeaderTime}>{"Uploaded by " + summData[summIndex].Uploader + summData[summIndex].TimeString}</Text>
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

  return (<ScrollView>
    {refreshing && (<View style={styles.activityIndicatorContainer}>
      <ActivityIndicatorView />
    </View>) || (<View style={styles.container}>
    <View style={styles.summariesHeader}>
      <Text style={styles.summariesHeaderText}>Summaries</Text>
      <Input
        placeholder = 'Search...'
        onChange={handleSearch}
        action={
          <Dropdown
            className='summDropdown'
            selection
            floating
            clearable
            placeholder = 'Filter by...'
            options={filterOptions}
            onChange ={handleDropDownSelect}
          />
        }
      />
      <div>
        <Button
          title='Download All'
          buttonStyle={styles.summariesHeaderButton}
          onPress={download}
        />
        <CSVLink data={summData} filename={'summary-data.csv'} className='btn btn-primary' ref={csvLink} target='blank'/>
      </div>
    </View>
    <View style={styles.summaries}>
      {displaySummaries()}
    </View>
  </View>)}
  </ScrollView>)
}
