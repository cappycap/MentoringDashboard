import React from 'react'
import * as Crypto from 'expo-crypto'
const { DateTime } = require("luxon")
import { View, Text, StyleSheet } from 'react-native'

// API information.
export const url = 'https://mentorsapp.cs.wwu.edu'
export const key = '364ec08dac33889d5ee1e15c86c0194bf91916938c5b64ea5055ac2fe6f281b5'

// Helper functions
export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getTimezoneName() {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: 'short' });

  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    
    // by this time `trimmed` should be the timezone's name with some punctuation -
    // trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full;
  }
}

export function getTimezoneOffset() {
  return (new Date()).getTimezoneOffset()/60
}
export function currentDate() {
  var date = new Date()
  var pad = function(num) { return ('00'+num).slice(-2) }
  date = date.getUTCFullYear()         + '-' +
        pad(date.getUTCMonth() + 1)  + '-' +
        pad(date.getUTCDate())       + ' ' +
        pad(date.getUTCHours())      + ':' +
        pad(date.getUTCMinutes())    + ':' +
        pad(date.getUTCSeconds())
  return date
}

export function sqlToJsDate(sqlDate) {
  if (sqlDate.split('.').length == 1) {
    sqlDate = sqlDate.replace(' ', 'T') + '.000Z'
  }

  var t = sqlDate.split(/[-:T.Z]/)
  return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5], t[6]))
}

export function parseDateText(date) {

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    const dateText = months[date.getMonth()] +
                          " " + date.getDate() +
                          ", " + date.getFullYear() +
                          " " + hours + ":" + minutes +
                          " " + ampm
    return dateText

}

export function toFullDate(date) {

    date = date.toISOString()
    var d = DateTime.fromISO(date).toFormat('LLLL dd, y TT ZZ')
    return d
}

export function getTimeSince(milliseconds) {
  var seconds = parseInt(milliseconds/1000)
  var ret = 'now'
  var time = 0
  if (seconds > 5 && seconds <= 60) {
    ret = (seconds > 1) ? seconds + ' secs' : seconds + ' sec'
  } else if (seconds > 60 && seconds < 3600) {
    time = parseInt(seconds/60)
    ret = (time > 1) ? time + ' mins' : time + ' min'
  } else if (seconds >= 3600 && seconds < 86400) {
    time = parseInt(seconds/3600)
    ret = (time > 1) ? time + ' hours' : time + ' hour'
  } else if (seconds >= 86400 && seconds < 31536000) {
    time = parseInt(seconds/86400)
    ret = (time > 1) ? time + ' days' : time + ' day'
  } else if (seconds >= 31536000) {
    time = parseInt(seconds/31536000)
    ret = (time > 1) ? time + ' yrs' : time + ' yr'
  }
  return ret
}

export function parseSimpleDateText(date) {
  if (!Object.prototype.toString.call(date) === "[object Date]") {
    date = Date.parse(date)
  }

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dateText = months[date.getMonth()] +
                          " " + date.getDate() +
                          ", " + date.getFullYear()
  
  return dateText
}

export function parseTime(date) {

  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0'+minutes : minutes
  const dateText = hours + ":" + minutes + " " + ampm
  return dateText
}

export function containsSpecialCharacters(str){
    var regex = /[ !@#$%^&*()_+\-=[\]{}':"\\|,.<>/?]/g
	return regex.test(str)
}

export function hasUpperCase(str) {
    return (/[A-Z]/.test(str))
}

export function dateToSql(str) {
  var pad = function(num) { return ('00'+num).slice(-2) }
  str = str.getUTCFullYear()         + '-' +
        pad(str.getUTCMonth() + 1)  + '-' +
        pad(str.getUTCDate())       + ' ' +
        pad(str.getUTCHours())      + ':' +
        pad(str.getUTCMinutes())    + ':' +
        pad(str.getUTCSeconds())
  return str
}

/* Example API call.

    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

export async function check() {

  var ret = false

  console.log('')
  const res = await fetch(url + '', {
    method:'GET'
  })

  const payload = await res.json()

  if (payload) {
    console.log('')
    ret = true
  }

  return ret

}

*/

export async function getUsers(token) {

  var ret = false

  console.log('Getting all users...')
  const res = await fetch(url + '/all-users/'+token, {
    method:'GET'
  })

  const payload = await res.json()

  if (payload.length > 0) {
    console.log('User data found!')
    ret = payload
  }

  return ret

}

export async function getPairs(token) {

  var ret = false

  console.log('Getting all Pairs...')
  const res = await fetch(url + '/admin/all-pairs/'+token, {
    method:'GET'
  })

  const payload = await res.json()

  if (payload.length > 0) {
    console.log('Pair data found!')
    ret = payload
  }

  return ret

}

export async function createPair(mentorId, menteeId, token) {

  var ret = false

  console.log('Creating Pair..')
  var arr = {MentorId:mentorId, MenteeId:menteeId, Token:token}

  console.log('Creation arr:',arr)
  const res = await fetch(url + '/create-pair', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const payload = await res.json()
  console.log('Returning payload:',payload)
  // if (payload.success) {
    if (payload.affectedRows == 1) {
    console.log('Pair Created!')
    ret = true
  } else {
    console.log('Pair Creation Failed!')
  }

  return ret

}

// export async function getPairs(userId, token) {

//   var ret = []
  
//   console.log('Getting Pairs...')
//   console.log('ID used:',userId)

//   const res = await fetch(url + '/pair/'+userId+'/'+token, {
//     method:'GET'
//   })

//   const payload = await res.json()

//   if (payload.length > 0) {
//     console.log('Pairs found!')
//     ret = payload
//   } else {
//     console.log('Pairs NOT found!')
//   }
//   return ret
// }

export async function deletePair(Id, token) {

  var ret = false

  console.log('Deleting Pair..')
  var arr = {Id:Id, Token:token}

  console.log('Deletion arr:',arr)
  const res = await fetch(url + '/delete-pair', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const payload = await res.json()
  console.log('Returning payload:',payload)
  if (payload.success == true) {
    console.log('Pair Deleted!')
    ret = payload
  } else {
    console.log('Pair Deletion Failed!')
  }

  return ret

}


export async function getTopics(id, token) {

  var ret = []

  console.log('Getting topics...')
  const res = await fetch(url + '/all-topics/admin/'+id+'/'+token, {
    method:'GET'
  })

  const payload = await res.json()

  if (payload.length > 0) {
    console.log('Topics found!')
    ret = payload
  }

  return ret

}

export async function loginCheck(email, password) {

  var ret = {success:false}

  // Encrypt Password.
  var pw = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  )

  var arr = {Email:email, Password:pw, Token:key}

  console.log('Checking login credentials...')
  console.log('Login arr:',arr)
  const res = await fetch(url + '/admin/verify-login', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const payload = await res.json()
  console.log('Returning payload:',payload)
  if (payload.success == true) {
    console.log('Login successful!')
    ret = payload
  } else {
    console.log('Login failed!')
  }

  return ret

}

export async function markUsersForDeletion(token, password, ids) {

  var ret = {success:false}

  // Encrypt Password.
  var pw = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  )

  var arr = {Token:token, Password:pw, Ids:ids}

  console.log('Marking users for deletion...')
  console.log('Deletion arr:',arr)
  const res = await fetch(url + '/admin/mark-users-for-deletion', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const payload = await res.json()
  console.log('Returning payload:',payload)
  if (payload.success == true) {
    console.log('Update successful!')
    ret = payload
  } else {
    console.log('Update failed!')
  }

  return ret

}

export async function unmarkUsersForDeletion(token, password, ids) {

  var ret = {success:false}

  // Encrypt Password.
  var pw = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  )

  var arr = {Token:token, Password:pw, Ids:ids}

  console.log('Unmarking users for deletion...')
  console.log('Deletion arr:',arr)
  const res = await fetch(url + '/admin/unmark-users-for-deletion', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const payload = await res.json()
  console.log('Returning payload:',payload)
  if (payload.success == true) {
    console.log('Update successful!')
    ret = payload
  } else {
    console.log('Update failed!')
  }

  return ret

}