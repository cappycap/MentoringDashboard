import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { users, pairs, colors } from './Styles.js';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-web';
import { createPair, getPairs, deletePair, getUsers, parseSimpleDateText, sqlToJsDate, } from './API.js';
import { Dropdown } from 'semantic-ui-react'
import ActivityIndicatorView from './ActivityIndicatorView.js'
import './StyleSheets/topics.css'

import userContext from './Context.js'

export default function Pairs() {

  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [admin, setAdmin] = useState(user)

  const [usersData, setUsersData] = useState([])
  const [pairsData, setPairsData] = useState([])
  const [searchContent, setSearchContent] = useState('')
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(pairs)
  const [colors, setColors] = useState(colors)
  const [creationSuccess, setCreationSuccess] = useState(false)
  const [creationError, setCreationError] = useState(false)
  const [deletionSuccess, setDeletionSuccess] = useState(false)
  const [deletionError, setDeletionError] = useState(false)
  const [newPairTrigger, setNewPairTrigger] = useState(1)

  const [pass, setPass] = useState('')
  const [selectedMentor, setMentor] = useState('')
  const [selectedMentee, setMentee] = useState('')

  // const options = [
  //   { key: 'delete', icon: 'delete', text: 'Delete Pair', value: 'delete' },
  //   { key: 'hide', icon: 'hide', text: 'Hide Pair', value: 'hide' },
  // ]


  const getData = async () => {
    const data = await getUsers(admin.Token)
    for (var i = 0; i < data.length; i++) {
      data[i].visible = true
    }
    const datak = await getPairs(admin.Token)
    for (var i = 0; i < data.length; i++) {
      data[i].visible = true
    }
    setUsersData(data)
    setPairsData(datak)
    // fillMap()
    setRefreshing(false)
  }

  useEffect(() => {
    console.log('admin:', admin)
    if (admin == null) {
      linkTo('/welcome')
    } else {
      getData()
    }

  }, [])

  const newPair = (i) => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setNewPairTrigger(i)

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

  // const checkPairs = async (u) => {
  //   const data = await getPairs(u.Id, admin.Token)
  //   for (var i = 0; i < data.length; i++) {
  //     data[i].visible = true
  //   }
  //   if(pairsData.length == 0) {
  //     setPairsData(data)
  //   } else {
  //     for (var i = 0; i < data.length; i++) {
  //       pairsData.push(data[i])
  //     }
  //   }

  const checkPairs = async () => {
    for (var j = 0; j < usersData.length; j++) {
      const data = await getPairs(u.Id, admin.Token)
      for (var i = 0; i < data.length; i++) {
        data[i].visible = true
      }
      if (pairsData.length == 0) {
        setPairsData(data)
      } else {
        for (var i = 0; i < data.length; i++) {
          pairsData.push(data[i])
        }
      }
    }
    setRefreshing(false)
  }

  const createNewPair = async (u, i) => {

    var create = await createPair(u.Id, i.Id, admin.Token)
    if (create == true) {
      getData()
      setCreationSuccess(true)
    } else {
      setCreationError(true)
    }
  }

  const removePair = async (p) => {

    var remove = await deletePair(p.Id, admin.Token)
    if (remove == true) {
      getData()
      setDeletionSuccess(true)
    } else {
      setDeletionError(true)
    }
  }

  const getRelationshipData = (id) => {

    var profile = { Id: -1 }

    for (var item in usersData) {
      if (item.Id == id) {
        profile = item
        break
      }
    }

    return profile

  }

  // const pairsData = [
  //   {
  //     mentorId: '2',
  //     mentee: 'Ash',
  //   },

  //   {
  //     mentorId: '3',
  //     mentee: 'Josh',
  //   },

  //   {
  //     mentorId: '4',
  //     mentee: 'Rick',
  //   }
  // ]


  return ( <ScrollView> <View style={styles.container}>
    {refreshing && (<ActivityIndicatorView />) || (<View style={styles.pairsWrapper}>
      {newPairTrigger == -1 && (<View>
        <ScrollView>
        <View style={styles.searchBarWrapperPairs}>
          <View style={styles.PairTopWrapper}>
            <Text style={styles.searchBarText}>Search Users:</Text>
            {creationSuccess && (<View>
              <Text style={styles.creationText}>Succesfully created pair!</Text>
            </View>)}
            {creationError && (<View>
              <Text style={styles.creationText}>Failed to create pair!</Text>
            </View>)}

          </View>
          <View style={styles.searchBarInner}>
            <TextInput value={searchContent} onChangeText={(t) => searchUsers(t)} style={styles.searchBar} />
            <Text style={styles.selectMentText}>Mentor: {selectedMentor.FirstName} {selectedMentor.LastName}</Text>
            <Text style={styles.selectMentText}>Mentee: {selectedMentee.FirstName} {selectedMentee.LastName}</Text>

            <Button
              title={'Create New Pair'}
              buttonStyle={styles.createPairButton}
              containerStyle={styles.createPairButtonContainer}
              onPress={() => createNewPair(selectedMentor, selectedMentee)}
            />
          </View>
        </View>
        </ScrollView>
        <View style={styles.upperRow}>
          <TouchableOpacity style={styles.backRow} onPress={() => newPair(1)}>
            <Icon
              name='chevron-back'
              type='ionicon'
              size={32}
            />
            <Text style={styles.goBack}>Go Back</Text>
          </TouchableOpacity>
        </View>
        {pairsData.length > 0 && (<View style={styles.pairsList}>
        </View>)}
        {usersData.length > 0 && (<View style={styles.pairsList}>

          {usersData.map((u, i) => {
            console.log('u:', u)
            var paddingStyle = { paddingRight: 20 }
            if (i + 1 % 4 == 0) {
              paddingStyle = {}
            }
            //checkPairs(u)
            if (u.visible) {

              return (<View style={[styles.pairContainer, paddingStyle]} key={'user_' + i}>
                <View style={[styles.user]}>
                  <Text style={styles.text}>{u.FirstName + ' ' + u.LastName}</Text>
                  <View style={styles.userStats}>
                    <Text style={styles.text}>
                      {u.MentorPairs.length} Mentee{u.MentorPairs.length != 1 && 's'}
                      <Text style={styles.boldText}> - </Text>
                      {u.MenteePairs.length} Mentor{u.MenteePairs.length != 1 && 's'}
                    </Text>
                  </View>
                  <Button
                    title={'Mentor'}
                    buttonStyle={styles.pairsButtonMentor}
                    containerStyle={styles.parisButtonContainer}
                    onPress={() => setMentor(u)}
                  />
                  <Button
                    title={'Mentee'}
                    buttonStyle={styles.pairsButtonMentee}
                    containerStyle={styles.parisButtonContainer}
                    onPress={() => setMentee(u)}
                  />
                </View>
              </View>)

            }

          })}

        </View>) || (<View>
          <Text style={styles.text}>No users have signed up yet.</Text>
        </View>)}
      </View>) || (<View>
        
        <View style={styles.container}>
          <View style={styles.pairsHeader}>
            <Text style={styles.pairsHeaderText}>Pairs</Text>
            <Button
              title='Add new Pair'
              buttonStyle={styles.pairsHeaderButton}
              onPress={() => newPair(-1)}
            />
          </View>
          <View style={styles.selectedUserDataSection}>

            {pairsData.map((p, index) => {
              console.log('p:', p)
              return (<View key={'pairs_' + index}>
                <View style={styles.pairsHeader}>
                  <View>
                    <Text style={styles.pairsHeaderText}>{'Mentor: ' + p.MentorName[0].FirstName + ' ' + p.MentorName[0].LastName}</Text>
                    <Text style={styles.pairsBodyText}>{'Mentee: ' + p.MenteeName[0].FirstName + ' ' + p.MenteeName[0].LastName}</Text>
                  </View>
                  {/* <Dropdown
                    className='topicDropdown'
                    floating
                    pointing='right'
                    direction='left'
                    options={options}
                    trigger={<Icon
                      name='ellipsis-horizontal-outline'
                      type='ionicon'
                      size={28}
                      style={{}}
                    />}
                  /> */}
                  <Button
                    title={'Delete Pair'}
                    buttonStyle={styles.createPairButton}
                    containerStyle={styles.createPairButtonContainer}
                    onPress={() => removePair(p)}
                  />
                </View>
                {<View style={styles.topicBody}>
                </View>}
              </View>)
            })}
          </View>
        </View>
        
      </View>)}
    </View>)}
  </View>
  </ScrollView>)
}
