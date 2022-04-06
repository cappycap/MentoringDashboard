import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { users, pairs, colors, btnColors } from './Styles.js';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-web';
import { createPair, getPairs, markPairForDeletion, unmarkPairForDeletion, getUsers, parseSimpleDateText, sqlToJsDate, } from './API.js';
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
  const [creationSuccess, setCreationSuccess] = useState(false)
  const [creationError, setCreationError] = useState(false)
  const [newPairTrigger, setNewPairTrigger] = useState(1)
  const [deletionSuccess, setDeletionSuccess] = useState(false)
  const [deletionError, setDeletionError] = useState(false)
  const [deletionActive, setDeletionActive] = useState(false)
  const [deleteConfirmDisabled, setDeleteConfirmDisabled] = useState(true)

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

  const searchPairs = (t) => {
    if (t.length > 0) {
      var data = JSON.parse(JSON.stringify(pairsData))
      for (var i = 0; i < data.length; i++) {
        var name = data[i].MentorName[0].FirstName + ' ' + data[i].MentorName[0].LastName
        if (name.includes(t)) {
          data[i].visible = true
        } else {
          data[i].visible = false
        }
      }
      setSearchContent(t)
      setPairsData(data)
    } else if (t.length == 0) {
      clearSearchPairs()
    }
  }

  const clearSearchPairs = () => {
    var data = JSON.parse(JSON.stringify(pairsData))
    for (var i = 0; i < data.length; i++) {
      data[i].visible = true
    }
    setSearchContent('')
    setPairsData(data)
  }

  const clearSearch = () => {
    var data = JSON.parse(JSON.stringify(usersData))
    for (var i = 0; i < data.length; i++) {
      data[i].visible = true
    }
    setSearchContent('')
    setUsersData(data)
  }

  const createNewPair = async (u, i) => {
    {
      var uniquePair = true
      pairsData.map((p, index) => {
        if (p.MentorId == u.Id && p.MenteeId == i.Id) {
          uniquePair = false;
          console.log("HERE")
        }
      }
      )
    }
    console.log("Pair?:", uniquePair)
    var create = false
    if (uniquePair == true && u.length != 0 && i.length != 0) {
      create = await createPair(u.Id, i.Id, admin.Token)
    }

    if (create == true) {
      getData()
      setCreationSuccess(true)
      setCreationError(false)
    } else {
      setCreationSuccess(false)
      setCreationError(true)
    }
  }

  // const removePair = async (p) => {
  //   var remove = await deletePair(p.Id, admin.Token)
  //   if (remove != false) {
  //     getData()
  //     setDeletionSuccess(true)
  //     setDeletionError(false)
  //   } else {
  //     setDeletionError(true)
  //     setDeletionSuccess(false)
  //   }
  // }
  
  const finalizeSingleDeletion = async (u) => {
    console.log(pass)
    var deletion = await markPairForDeletion(admin.Token, pass, [u.Id])
    if (deletion.success) {
      u.Type = 2
      // Reset vars.
      updatePass('')
      setDeletionActive(false)
    } else {
      setDeletionError(true)
    }
  }

  const undoSingleDeletion = async (u) => {

    var deletion = await unmarkPairForDeletion(admin.Token, pass, [u.Id])
    if (deletion.success) {
      u.Type = 0
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

  return (<ScrollView>
    <View style={styles.container}>
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
                  <Text style={styles.creationText}>Error: Failed to create pair!</Text>
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
              if (u.visible) {

                return (<View style={[styles.pairContainer]} key={'user_' + i}>
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
          <View style={styles.searchBarWrapperPairs}>
            <View style={styles.PairTopWrapper}>
              {/* <Text style={styles.searchBarText}>Search Pairs:</Text> */}
              {deletionSuccess && (<View>
                <Text style={styles.creationText}>Succesfully deleted pair!</Text>
              </View>)}
              {deletionError && (<View>
                <Text style={styles.creationText}>Error: Failed to delete pair!</Text>
              </View>)}
            </View>
            <View style={styles.searchBarInner}>
              {/* <TextInput value={searchContent} onChangeText={(t) => searchPairs(t)} style={styles.searchBar} /> */}
              <Text style={styles.pairsHeaderText}>Pairs</Text>
              <Button
                title={'Pair Creation'}
                buttonStyle={styles.createPairButton}
                containerStyle={styles.createPairButtonContainer}
                onPress={() => newPair(-1)}
              />
            </View>
          </View>
          <View style={styles.container}>
            {/* <View style={styles.pairsHeader}>
            <Text style={styles.pairsHeaderText}>Pairs</Text>
            <Button
              title='Add new Pair'
              buttonStyle={styles.pairsHeaderButton}
              onPress={() => newPair(-1)}
            />
          </View> */}

            <View style={styles.selectedUserDataSection}>

              {pairsData.map((p, index) => {
                console.log('p:', p)
                return (<View key={'pairs_' + index}>
                  <View style={styles.pairsHeader}>
                    <View>
                      <Text style={styles.pairsBodyText}>{'Mentor: ' + p.MentorName[0].FirstName + ' ' + p.MentorName[0].LastName}</Text>
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
                    <View style={styles.deletionRow}>
                      {(deletionActive != p.Id) && (p.Type == 2) && (<Button
                        title={'Unmark Pair For Deletion'}
                        buttonStyle={styles.deletePairButton}
                        containerStyle={styles.deletePairButtonContainer}
                        onPress={() => setDeletionActive(p.Id)}
                      />) ||
                        (deletionActive != p.Id) && (<Button
                          title={'Delete Pair'}
                          buttonStyle={styles.deletePairButton}
                          containerStyle={styles.deletePairButtonContainer}
                          onPress={() => setDeletionActive(p.Id)}
                        />) ||
                        (deletionActive == p.Id) && (<View style={styles.innerDeletionRow}>
                          <View>
                            <Text style={styles.deletionText}>Enter your password to confirm:</Text>
                            <TextInput placeholder={'Pass...'} secureTextEntry={true} value={pass} style={styles.deletionInputPass}
                              onChangeText={(t) => updatePass(t)}
                            />
                            {deletionError && (<Text style={styles.deletionError}>Incorrect password, please try again.</Text>)}
                          </View>
                          {(p.Type == 2) && (
                            <Button
                              title={'Confirm unmark'}
                              buttonStyle={{ backgroundColor: btnColors.success, marginLeft: 10, marginRight: 10 }}
                              onPress={() => undoSingleDeletion(p)}
                              disabled={deleteConfirmDisabled}
                            />) ||
                            (<Button
                              title={'Confirm'}
                              buttonStyle={{ backgroundColor: btnColors.success, marginLeft: 10, marginRight: 10 }}
                              onPress={() => finalizeSingleDeletion(p)}
                              disabled={deleteConfirmDisabled}
                            />)}
                          <Button
                            title={'Cancel'}
                            buttonStyle={{ backgroundColor: btnColors.primary }}
                            onPress={() => setDeletionActive(false)}
                          />
                        </View>)}
                    </View>

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
