import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext} from 'react';
import { Linking, Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useLinkTo, Link } from '@react-navigation/native';
import { users, colors } from './Styles.js';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-web';
import { getUsers } from './API.js';
import ActivityIndicatorView from './ActivityIndicatorView.js'
import userContext from './Context.js';

export default function Users() {
    
  const user = useContext(userContext)
  const linkTo = useLinkTo()

  const [admin, setAdmin] = useState(user)
  
  const [refreshing, setRefreshing] = useState(true)
  const [styles, setStyles] = useState(users)
  const [colors, setColors] = useState(colors)

  const [usersData, setUsersData] = useState([])

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

  return (<View style={styles.container}>
    {refreshing && (<ActivityIndicatorView />) || (<View style={styles.usersWrapper}>
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
                <Text style={styles.text}>{u.MentorPairs.length} Mentor Pair{u.MentorPairs.length != 1 && 's'}</Text>
                <Text style={styles.text}>{u.MenteePairs.length} Mentee Pair{u.MenteePairs.length != 1 && 's'}</Text>
              </View>
              <Button title={'View'} buttonStyle={styles.userButton} containerStyle={styles.userButtonContainer} />
            </View>
          </View>)

        })}

      </View>) || (<View>
        <Text style={styles.text}>No users have signed up yet.</Text>
      </View>)}
    </View>)}
  </View>)
}
