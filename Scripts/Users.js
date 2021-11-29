import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext} from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { users, colors } from './Styles.js';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-web';
import { getUsers, parseSimpleDateText, sqlToJsDate } from './API.js';
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

  const getData = async () => {
    const data = await getUsers(admin.Token)
    setUsersData(data)
    setRefreshing(false)
  }

  useEffect(() => {

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

  return (<View style={styles.container}>
    {refreshing && (<ActivityIndicatorView />) || (<View style={styles.usersWrapper}>
      {selectedUser == -1 && (<View>
        {usersData.length > 0 && (<View style={styles.usersList}>

          {usersData.map((u, i) => {
            var paddingStyle = {paddingRight:20}
            if (i+1 % 4 == 0) {
              paddingStyle = {}
            }

            return (<View style={[styles.userContainer,paddingStyle]} key={'user_'+i}>
              <View style={styles.user}>
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

          })}

        </View>) || (<View>
          <Text style={styles.text}>No users have signed up yet.</Text>
        </View>)}
      </View>) || (<View style={styles.selectedUserContainer}>
        <TouchableOpacity style={styles.backRow} onPress={() => selectUser(-1)}>
          <Icon 
            name='chevron-back'
            type='ionicon'
            size={32}
            color={colors.mainTextColor}
          />
          <Text style={styles.goBack}>Go Back</Text>
        </TouchableOpacity>
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
            <Text style={styles.selectedUserTitle}>Summaries</Text>
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
