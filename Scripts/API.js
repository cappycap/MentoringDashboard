import React from 'react'
import * as Crypto from 'expo-crypto'
const { DateTime } = require("luxon")
import { View, Text, StyleSheet } from 'react-native'

// API information.
export const url = 'https://mentorship.cs.wwu.edu'
export const key = 'c75c8309094b9bcc21fbcabeb17e0f7a1a4c4f547f041376bfdb71826bcc84db'

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

export async function loginCheck(email, password) {

  var ret = false

  // Encrypt Password.
  var pw = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  )

  var arr = {Email:email, Password:pw, Token:key}

  console.log('Checking login credentials...')
  const res = await fetch(url + '', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const payload = await res.json()

  if (payload.success == true) {
    console.log('Login successful!')
    ret = true
  } else {
    console.log('Login failed!')
  }

  return ret

}