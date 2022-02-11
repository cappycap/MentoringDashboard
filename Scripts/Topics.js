import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useLinkTo, Link } from '@react-navigation/native'
import { topics, colors, btnColors } from './Styles.js'
import { Button, Icon, CheckBox } from 'react-native-elements'
import { TextInput } from 'react-native-web'
import ActivityIndicatorView from './ActivityIndicatorView.js'
import { getTopics, createTopic, updateTopic, deleteTopic, getTimeSince, sqlToJsDate, jsToSqlDate, parseSimpleDateText } from './API.js'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './StyleSheets/topics.css'
import DateTimePicker from 'react-datetime-picker';

import userContext from './Context.js'
const now = jsToSqlDate(new Date())

export default function Topics(props) {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  // Topics and user data.
  const defaultTopic = {
    PostedBy:user.Id,
    DueDate:now,
    Title:'',
    Description:'',
    Archived:0,
    ActiveTopic:0,
    NotifyUsers:0
  }
  const [userData, setUserData] = useState(user)
  const [topicsData, setTopicsData] = useState([])
  const [newTopic, setNewTopic] = useState(defaultTopic)
  const [jsDueDate, setJsDueDate] = useState(new Date())

  // UI control.
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(topics)
  const [showAddTopic, setShowAddTopic] = useState(false)
  const [showUpdateTopic, setShowUpdateTopic] = useState(false)
  const [addTopicHeight, setAddTopicHeight] = useState(10)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
  const [successBox, setSuccessBox] = useState(false)
  const [showAddError, setShowAddError] = useState(false)

  

  /* Consider implementing:
    
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'archive', icon: 'hide', text: 'Archive Post', value: 'archive' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  ]

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
                    onChange={(event, data) => updateTopicTrigger(data.value, index)}
                  />
  */

  const getData = async () => {

    const newData = await getTopics(user.Token)

    if (newData.length > 0) {

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

      setTopicsData(newData)
      
    }

    setRefreshing(false)

  }

  useEffect(() => {
    console.log('props:',props)
    if (userData == null) {
      linkTo('/welcome')
    } else {
      getData()
    }
    if (props.route.params != undefined) {
      setSuccessBox(true)
      setTimeout(() => {
        setSuccessBox(false)
      }, 3000)
    }
  }, [props.route.params])

  const addNewTopicTrigger = () => {
    setShowAddTopic(true)
  }

  const createTopicTrigger = async () => {
    var created = await createTopic(newTopic.PostedBy, newTopic.DueDate, newTopic.Title, newTopic.Description, newTopic.Archived, newTopic.ActiveTopic, newTopic.NotifyUsers, user.Token)

    if (created) {
      setShowAddError(false)
      linkTo('/topics?success=true')
      setShowAddTopic(false)
      setNewTopic(defaultTopic)
    } else {
      setShowAddError(true)
    }

  }

  const submitUpdateTopicTrigger = async () => {
    var upd = await updateTopic(newTopic.Id, newTopic.PostedBy, newTopic.DueDate, newTopic.Title, newTopic.Description, newTopic.Archived, newTopic.ActiveTopic, newTopic.NotifyUsers, user.Token)

    if (upd) {
      setShowAddError(false)
      linkTo('/topics?success=true')
      setShowUpdateTopic(false)
      setNewTopic(defaultTopic)
    } else {
      setShowAddError(true)
    }
  }

  const updateTopicTrigger = async (value, index) => {
    switch (value) {
      case "edit":
        var n = JSON.parse(JSON.stringify(topicsData[index]))
        n.NotifyUsers = 0
        console.log(n)
        n.DueDate = jsToSqlDate(new Date(n.DueDate))
        setJsDueDate(sqlToJsDate(n.DueDate))
        console.log(n)
        setNewTopic(n)
        setShowUpdateTopic(true)
        break;
      default:
        break;
    }
  }

  const updateTopicData = async (data, type) => {
    setShowAddError(false)
    var updated = JSON.parse(JSON.stringify(newTopic))
    switch (type) {
      case 0:
        // Title
        updated.Title = data
        break
      case 1:
        // Description.
        updated.Description = data
        break
      case 2:
        // DueDate
        setJsDueDate(data)
        updated.DueDate = jsToSqlDate(data)
        break
      case 3:
        // ActiveTopic
        updated.ActiveTopic = (updated.ActiveTopic == 0) ? 1 : 0
        break
      case 4:
        // Archived
        updated.Archived = (updated.Archived == 0) ? 1 : 0
        break
      case 5:
        // NotifyUsers
        updated.NotifyUsers = (updated.NotifyUsers == 0) ? 1 : 0
        break
      default:
        break
    }

    if (updated.Title.length > 0 && updated.Description.length > 0) {
      setSubmitButtonDisabled(false)
    } else {
      setSubmitButtonDisabled(true)
    }

    setNewTopic(updated)
  }

  const editTopicTrigger = (i) => {
    console.log('t:',i)
    setActiveIndex(i)
  }

  return (<View>
    {refreshing && (<View style={styles.activityIndicatorContainer}>
      <ActivityIndicatorView />
    </View>) || (<View style={styles.container}>
      {showAddTopic && (<View style={styles.addTopic}>
        <View style={[styles.topicsHeader,{justifyContent:'flex-start'}]}>
          <Icon
             name='chevron-back'
             type='ionicon'
             size={28}
             color={colors.mainTextColor}
             style={{marginRight:5,marginTop:1}}
             onPress={() => setShowAddTopic(false)}
           />
          <Text style={styles.topicsHeaderText}>Add Topic</Text>
        </View>
        <View style={styles.topic}>
          <Text style={styles.entryTitle}>Title</Text>
          <TextInput 
            placeholder={'Enter title here...'} 
            style={styles.input}
            value={newTopic.Title}
            onChangeText={(t) => updateTopicData(t, 0)}
          />
          <Text style={styles.entryTitle}>Description</Text>
          <TextInput
            placeholder={'Enter description here...'} 
            style={[styles.input,{height:addTopicHeight}]} 
            value={newTopic.Description}
            onChangeText={(t) => updateTopicData(t, 1)}
            multiline={true}
            onContentSizeChange={e => setAddTopicHeight(e.nativeEvent.contentSize.height)}
          />
          <Text style={styles.entryTitle}>Due Date</Text>
          <DateTimePicker onChange={(d) => updateTopicData(d, 2)} value={jsDueDate} />
          <Text style={[styles.entryTitle,{marginTop:10}]}>Other Options</Text>
          <View style={styles.otherRow}>
            <View style={styles.otherOption}>
              {newTopic.Archived == 0 && (<CheckBox
                center
                title="Active Topic"
                checked={newTopic.ActiveTopic}
                onPress={() => updateTopicData(newTopic.ActiveTopic, 3)}
              />)}
            </View>
            <View style={[styles.otherOption,{marginLeft:10,marginRight:10}]}>
              {newTopic.ActiveTopic == 0 && (<CheckBox
                center
                title="Archived Topic"
                checked={newTopic.Archived}
                onPress={() => updateTopicData(newTopic.Archived, 4)}
              />)}
            </View>
            <View style={styles.otherOption}>
              <CheckBox
                center
                title="Notify Users"
                checked={newTopic.NotifyUsers}
                onPress={() => updateTopicData(newTopic.NotifyUsers, 5)}
              />
            </View>
          </View>
          <View style={styles.submitButtonRow}>
            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
              {showAddError && (<Text style={styles.errorText}>Error submitting, please try again.</Text>)}
            </View>
            <Button 
              title={'Submit'}
              buttonStyle={styles.submitButton}
              onPress={() => createTopicTrigger()}
              disabled={submitButtonDisabled}
            />
          </View>
        </View>
      </View>) || (<View>
        {showUpdateTopic && (<View style={styles.updateTopic}>
          <View style={[styles.topicsHeader,{justifyContent:'flex-start'}]}>
            <Icon
              name='chevron-back'
              type='ionicon'
              size={28}
              color={colors.mainTextColor}
              style={{marginRight:5,marginTop:1}}
              onPress={() => setShowUpdateTopic(false)}
            />
            <Text style={styles.topicsHeaderText}>Update Topic</Text>
          </View>
          <View style={styles.topic}>
            <Text style={styles.entryTitle}>Title</Text>
            <TextInput 
              placeholder={'Enter title here...'} 
              style={styles.input}
              value={newTopic.Title}
              onChangeText={(t) => updateTopicData(t, 0)}
            />
            <Text style={styles.entryTitle}>Description</Text>
            <TextInput
              placeholder={'Enter description here...'} 
              style={[styles.input,{height:addTopicHeight}]} 
              value={newTopic.Description}
              onChangeText={(t) => updateTopicData(t, 1)}
              multiline={true}
              onContentSizeChange={e => setAddTopicHeight(e.nativeEvent.contentSize.height)}
            />
            <Text style={styles.entryTitle}>Due Date</Text>
            <DateTimePicker onChange={(d) => updateTopicData(d, 2)} value={jsDueDate} />
            <Text style={[styles.entryTitle,{marginTop:10}]}>Other Options</Text>
            <View style={styles.otherRow}>
              <View style={styles.otherOption}>
                {newTopic.Archived == 0 && (<CheckBox
                  center
                  title="Active Topic"
                  checked={newTopic.ActiveTopic}
                  onPress={() => updateTopicData(newTopic.ActiveTopic, 3)}
                />)}
              </View>
              <View style={[styles.otherOption,{marginLeft:10,marginRight:10}]}>
                {newTopic.ActiveTopic == 0 && (<CheckBox
                  center
                  title="Archived Topic"
                  checked={newTopic.Archived}
                  onPress={() => updateTopicData(newTopic.Archived, 4)}
                />)}
              </View>
              <View style={styles.otherOption}>
                <CheckBox
                  center
                  title="Notify Users of Update"
                  checked={newTopic.NotifyUsers}
                  onPress={() => updateTopicData(newTopic.NotifyUsers, 5)}
                />
              </View>
            </View>
            <View style={styles.submitButtonRow}>
              <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                {showAddError && (<Text style={styles.errorText}>Error submitting, please try again.</Text>)}
              </View>
              <Button 
                title={'Update'}
                buttonStyle={styles.submitButton}
                onPress={() => submitUpdateTopicTrigger()}
                disabled={submitButtonDisabled}
              />
            </View>
          </View>
        </View>) || (<View>
          <View style={styles.topicsHeader}>
            <Text style={styles.topicsHeaderText}>Topics</Text>
            <Button 
              title='Add New Topic'
              buttonStyle={styles.topicsHeaderButton}
              onPress={addNewTopicTrigger}
            />
          </View>
          {(props.route.params != undefined && successBox) && (<View style={styles.successBox}>
            <Text style={styles.successBoxText}>Topic action was successful!</Text>
          </View>)}
          {topicsData.length > 0 && (<View style={styles.topics}>
            {topicsData.map((topic, index) => {

              var activeHighlight = {borderWidth:3,borderColor:colors.mainBackground,true:false}

              if (topic.ActiveTopic == 1) {
                activeHighlight = {borderWidth:3,borderColor:btnColors.success,true:true}
              }

              return (<View style={[styles.topic,activeHighlight]} key={'topic_'+index}>
                <View style={styles.topicHeader}>
                  <View>
                    <Text style={styles.topicHeaderText}>{topic.Title}</Text>
                    <Text style={styles.topicHeaderTime}>{topic.TimeString}</Text>
                  </View>
                  <Button 
                    title={'Edit'}
                    onPress={() => updateTopicTrigger("edit", index)}
                    style={styles.topicsHeaderButton} 
                    />
                </View>
                <View style={styles.topicBody}>
                  <Text style={styles.topicBodyText}>{topic.Description}</Text>
                </View>
                {activeHighlight.true && (<Text style={styles.activSig}>Active Topic</Text>)}
              </View>)
            })}
          </View>) || (<View style={styles.topics}>
            <Text style={styles.noneText}>No topics yet.</Text>
          </View>)}
        </View>)}
      </View>)}
    </View>)}
  </View>)
}