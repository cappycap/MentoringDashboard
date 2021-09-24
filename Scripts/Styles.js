import { Dimensions, Appearance, StyleSheet } from 'react-native';
import { set, get, getTTL, ttl } from '../Scripts/Storage.js'
// Unchanging stylesheets and elements.
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const navLogo = require('../assets/logo.png');

export const btnColors = {
  primary:'#3498db',
  caution:'#f1c40f',
  danger:'#e74c3c',
  success:'#2ecc71',
  info:'#41C3E0',
  lightBackground: '#FAFAFA',
}

var user = get('User')
if (user == null) {
  user = {}
  user.PrimaryHighlight = '#2ecc71'
  user.SecondaryHighlight = '#27ae60'
}

export const colors = {
  primaryHighlight: user.PrimaryHighlight,
  secondaryHighlight: user.SecondaryHighlight,
  secondaryBackground: '#ebeef6', // clouds
  mainTextColor: '#23272a', // darkGray
  secondaryTextColor: '#344150', // blueGray
  mainBackground: '#ffffff', // white
  header: '#FAFAFA',
  headerDarker: '#EDEDED',
  headerBorder: '#ebeef6',
}

export const boxColors = {
  primary:'#38A2E8',
  caution:'#FFCF0F',
  danger: '#fb7161',
  success:'#27ae60',
  info:'#48dbfb',
  default:'#FAFAFA'
}

export const messageBox = StyleSheet.create({
  errorBox: {
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:boxColors.danger,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
    borderRadius:10,
  },
  box: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
    borderRadius:10,
  },
  icon: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    flex:6,
    fontSize:16,
    fontFamily:'Poppins',
    color:colors.mainTextColor
  }
});

export const empty = StyleSheet.create({
  container: {
    flex:1
  }
})

export const app = StyleSheet.create({
  container: {
    flex:1,
  }
})