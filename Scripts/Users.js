import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext} from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { users, colors, btnColors } from './Styles.js';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-web';
import { getUsers, parseSimpleDateText, sqlToJsDate, markUsersForDeletion, unmarkUsersForDeletion } from './API.js';
import ActivityIndicatorView from './ActivityIndicatorView.js'
import userContext from './Context.js';

export default function Users() {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [admin, setAdmin] = useState(user)
  
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(users)

  const [usersData, setUsersData] = useState([])
  const [selectedUser, setSelectedUser] = useState(-1)
  const [searchContent, setSearchContent] = useState('')
  const [deletionActive, setDeletionActive] = useState(false)
  const [deleteConfirmDisabled, setDeleteConfirmDisabled] = useState(true)
  const [deletionError, setDeletionError] = useState(false)
  const [pass, setPass] = useState('')

  const getData = async () => {
    const data = await getUsers(admin.Token)
    for (var i = 0; i < data.length; i++) {
      data[i].visible = true
    }
    setUsersData(data)
    setRefreshing(false)
  }

  useEffect(() => {
    console.log('admin:',admin)
    if (admin == null) {
      linkTo('/welcome')
    } else {
      getData()
    }

  }, [])

  const selectUser = (id) => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setSelectedUser(id)
    }, 300)
  }

  const searchUsers = (t) => {
    if (t.length > 0) {
      var data = JSON.parse(JSON.stringify(usersData))
      for (var i = 0; i < data.length; i++) {
        var name = data[i].FirstName + ' ' + data[i].LastName
        if (name.includes(t)) {
          data[i].visible = true
        } else {
          data[i].visible = false
        }
      }
      setSearchContent(t)
      setUsersData(data)
    } else if (t.length == 0) {
      clearSearch()
    }
  }

  const clearSearch = () => {
    var data = JSON.parse(JSON.stringify(usersData))
    for (var i = 0; i < data.length; i++) {
      data[i].visible = true
    }
    setSearchContent('')
    setUsersData(data)
  }

  const getRelationshipData = (id) => {

    var profile = {Id:-1}

    for (var item in usersData) {
      if (item.Id == id) {
        profile = item
        break
      }
    }

    return profile

  }

  const finalizeSingleDeletion = async (u) => {

    var deletion = await markUsersForDeletion(admin.Token, pass, [u.Id])
    if (deletion.success) {
      // Update user locally.
      u.Type = 2
      console.log('o:',usersData)
      var newUsers = JSON.parse(JSON.stringify(usersData))
      newUsers[selectedUser] = u
      setUsersData(newUsers)
      console.log('n:',newUsers)
      // Reset vars.
      updatePass('')
      setDeletionActive(false)
    } else {
      setDeletionError(true)
    }

  }

  const finalizeSingleUnmark = async (u) => {

    var deletion = await unmarkUsersForDeletion(admin.Token, pass, [u.Id])
    if (deletion.success) {
      // Update user locally.
      u.Type = 0
      console.log('o:',usersData)
      var newUsers = JSON.parse(JSON.stringify(usersData))
      newUsers[selectedUser] = u
      setUsersData(newUsers)
      console.log('n:',newUsers)
      // Reset vars.
      updatePass('')
      setDeletionActive(false)
    } else {
      setDeletionError(true)
    }

  }

  const updatePass = (t) => {
    setPass(t)
    if (t.length > 4) {
      setDeleteConfirmDisabled(false)
    } else {
      setDeleteConfirmDisabled(true)
    }
  }

  return (<View style={styles.container}>
    {refreshing && (<ActivityIndicatorView />) || (<View style={styles.usersWrapper}>
      {selectedUser == -1 && (<View>
        <View style={styles.searchBarWrapper}>
          <Text style={styles.searchBarText}>Search Users:</Text>
          <View style={styles.searchBarInner}>
            <TextInput value={searchContent} onChangeText={(t) => searchUsers(t)} style={styles.searchBar} />
            <Button 
              title={'Clear'}
              buttonStyle={styles.searchClearButton}
              containerStyle={styles.searchClearButtonContainer}
              onPress={() => clearSearch()}
            />
          </View>
        </View>
        {usersData.length > 0 && (<View style={styles.usersList}>

          {usersData.map((u, i) => {
            console.log('u:',u)
            var paddingStyle = {paddingRight:20}
            if (i+1 % 4 == 0) {
              paddingStyle = {}
            }

            var highlight = {backgroundColor:colors.mainBackground,borderColor:colors.mainBackground}
            if (u.Type == 2) {
              highlight = {backgroundColor:'#f5f6fa',borderColor:btnColors.danger}
            }

            if (u.visible) {

              return (<View style={[styles.userContainer,paddingStyle]} key={'user_'+i}>
                <View style={[styles.user,highlight]}>
                  <Image style={styles.userAvatar} source={u.Avatar} />
                  <Text style={styles.userName}>{u.FirstName + ' ' + u.LastName}</Text>
                  <View style={styles.userStats}>
                    <Text style={styles.text}>{u.Summaries.length} Summar{u.Summaries.length == 1 && 'y' || 'ies'} Written</Text>
                    <Text style={styles.text}>
                      {u.MentorPairs.length} Mentee{u.MentorPairs.length != 1 && 's'}
                      <Text style={styles.boldText}> - </Text>
                      {u.MenteePairs.length} Mentor{u.MenteePairs.length != 1 && 's'}
                    </Text>
                  </View>
                  <Button 
                    title={'View'} 
                    buttonStyle={styles.userButton} 
                    containerStyle={styles.userButtonContainer} 
                    onPress={() => selectUser(i)}
                  />
                </View>
              </View>)

            }

          })}

        </View>) || (<View>
          <Text style={styles.text}>No users have signed up yet.</Text>
        </View>)}
      </View>) || (<View style={styles.selectedUserContainer}>
        <View style={styles.upperRow}>
          <TouchableOpacity style={styles.backRow} onPress={() => selectUser(-1)}>
            <Icon 
              name='chevron-back'
              type='ionicon'
              size={32}
              color={colors.mainTextColor}
            />
            <Text style={styles.goBack}>Go Back</Text>
          </TouchableOpacity>
          {usersData[selectedUser].Type == 2 && (<View style={styles.deletionRow}>
            {deletionActive && (<View style={styles.innerDeletionRow}>
              <View>
                <Text style={styles.deletionText}>Enter your password to confirm:</Text>
                <TextInput placeholder={'Pass...'} secureTextEntry={true} value={pass} style={styles.deletionInputPass}
                  onChangeText={(t) => updatePass(t)} 
                />
                {deletionError && (<Text style={styles.deletionError}>Incorrect password, please try again.</Text>)}
              </View>
              <Button 
                title={'Confirm'}
                buttonStyle={{backgroundColor:btnColors.success,marginLeft:10,marginRight:10}}
                onPress={() => finalizeSingleUnmark(usersData[selectedUser])}
                disabled={deleteConfirmDisabled}
              />
              <Button 
                title={'Cancel'}
                buttonStyle={{backgroundColor:btnColors.primary}}
                onPress={() => etDeletionActive(false)}
              />
            </View>) || (<Button 
              title={'Unmark User for Deletion'}
              buttonStyle={{backgroundColor:btnColors.success}}
              onPress={() => setDeletionActive(true)}
            />)}
          </View>) || (<View style={styles.deletionRow}>
            {deletionActive && (<View style={styles.innerDeletionRow}>
              <View>
                <Text style={styles.deletionText}>Enter your password to confirm:</Text>
                <TextInput placeholder={'Pass...'} secureTextEntry={true} value={pass} style={styles.deletionInputPass}
                  onChangeText={(t) => updatePass(t)} 
                />
                {deletionError && (<Text style={styles.deletionError}>Incorrect password, please try again.</Text>)}
              </View>
              <Button 
                title={'Confirm'}
                buttonStyle={{backgroundColor:btnColors.danger,marginLeft:10,marginRight:10}}
                onPress={() => finalizeSingleDeletion(usersData[selectedUser])}
                disabled={deleteConfirmDisabled}
              />
              <Button 
                title={'Cancel'}
                buttonStyle={{backgroundColor:btnColors.primary}}
                onPress={() => etDeletionActive(false)}
              />
            </View>) || (<Button 
              title={'Mark User for Deletion'}
              buttonStyle={{backgroundColor:btnColors.danger}}
              onPress={() => setDeletionActive(true)}
            />)}
          </View>)}
        </View>
        <View style={styles.selectedUser}>
          <View style={styles.selectedUserHeaderRow}>
            <View style={styles.selectedUserHeaderRowLeft}>
              <Image source={usersData[selectedUser].Avatar} style={styles.selectedUserAvatar} />
              <View>
                <Text style={styles.selectedUserName}>{usersData[selectedUser].FirstName + ' ' + usersData[selectedUser].LastName}</Text>
                <Text style={styles.selectedUserCreated}>Joined {parseSimpleDateText(sqlToJsDate(usersData[selectedUser].Created))}</Text>
              </View>
            </View>
            <View style={styles.selectedUserHeaderRowRight}>
              <Text style={styles.selectedUserHeaderRowRightText}>{usersData[selectedUser].Summaries.length} Summar{usersData[selectedUser].Summaries.length == 1 && 'y' || 'ies'} Written</Text>
            </View>
          </View>
        </View>
        <View style={styles.selectedUserDataSection}>
          <View style={styles.selectedUserSummariesContainer}>
            <Text style={[styles.selectedUserTitle,{marginBottom:10}]}>Summaries</Text>
            {usersData[selectedUser].Summaries.length > 0 && (<View style={styles.selectedUserSummaries}>
              {usersData[selectedUser].Summaries.map((s, i) => {

                return(<View style={styles.selectedUserSummary} key={'summary_'+i}>
                  <Text style={styles.summaryHeader}>{parseSimpleDateText(sqlToJsDate(s.Created))}</Text>
                  <Text style={styles.summaryText}>{s.SummaryText}</Text>
                </View>)

              })}
            </View>) || (<View>
              <Text style={styles.noneText}>This user has not written a summary yet.</Text>
            </View>)}
          </View>
          <View style={styles.selectedUserRelationships}>
            <Text style={styles.selectedUserTitle}>Mentors</Text>
            {usersData[selectedUser].MentorPairs.length > 0 && (<View style={styles.selectedUserRelationships}>
              {usersData[selectedUser].MentorPairs.map((s, i) => {

                var relationshipData = getRelationshipData(s.MenteeId)

                return(<View style={styles.selectedUserMentorPair} key={'mentorpair_'+i}></View>)

              })}
            </View>) || (<View>
              <Text style={styles.noneText}>No mentors yet.</Text>
            </View>)}
            <Text style={styles.selectedUserTitle}>Mentees</Text>
            {usersData[selectedUser].MenteePairs.length > 0 && (<View style={styles.selectedUserRelationships}>
              {usersData[selectedUser].MenteePairs.map((s, i) => {

                var relationshipData = getRelationshipData(s.MentorId)

                return(<View style={styles.selectedUserMenteePair} key={'menteepair_'+i}></View>)

              })}
            </View>) || (<View>
              <Text style={styles.noneText}>No mentees yet.</Text>
            </View>)}
          </View>
        </View>
      </View>)}
    </View>)}
  </View>)
}
