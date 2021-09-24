import { Dimensions, Appearance, StyleSheet } from 'react-native';
import { set, get, getTTL, ttl } from '../Scripts/Storage.js'
// Unchanging stylesheets and elements.
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const logo = require('../assets/logo.png');

export const btnColors = {
  primary:'#007ac8',
  caution:'#f1c40f',
  danger:'#e74c3c',
  success:'#2ecc71',
  info:'#41C3E0',
  lightBackground: '#FAFAFA',
}

var user = get('User')
if (user == null) {
  user = {}
  user.PrimaryHighlight = '#003f87'
  user.SecondaryHighlight = '#007ac8'
}

export const colors = {
  primaryHighlight: user.PrimaryHighlight,
  secondaryHighlight: user.SecondaryHighlight,
  secondaryBackground: '#ebeef6',
  mainTextColor: '#1c2023',
  secondaryTextColor: '#667986',
  mainBackground: '#ffffff', 
  header: '#FAFAFA',
  headerDarker: '#EDEDED',
  headerBorder: '#ebeef6',
}

export const boxColors = {
  primary:'#007ac8',
  caution:'#FFCF0F',
  danger: '#fb7161',
  success:'#27ae60',
  info:'#003f87',
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
    marginTop:10,
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
    marginTop:10,
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
    color:colors.mainTextColor,
    textAlign:'center'
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

export const main = StyleSheet.create({
  container: {
    flex:1
  }
})

export const welcome = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:colors.secondaryBackground
  },
  logInContainer: {
    width:500,
    borderRadius:10,
    backgroundColor:colors.mainBackground
  },
  logInStripeTop: {
    height:10,
    backgroundColor:colors.primaryHighlight,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    marginBottom:10
  },
  logInStripeBottom: {
    height:10,
    backgroundColor:colors.primaryHighlight,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    marginTop:10
  },
  logIn: {
    padding:20,
  },
  logo: {
    width:200,
    height:200,
    margin:20,
  },
  logInTitle: {
    fontSize:26,
    fontFamily:'PoppinsSemiBold',
    textAlign:'center',
    color:colors.mainTextColor
  },
  inputGroup: {
    marginTop:20,
    marginBottom:10
  },
  logInTextInput: {
    backgroundColor:colors.secondaryBackground,
    borderRadius:10,
    padding:10,
    marginBottom:10,
  },
  logInSubmitButton: {
    borderRadius:10,
    backgroundColor:btnColors.primary,
  },
  forgotPasswordText: {
    fontSize:18,
    fontFamily:'Poppins',
    color:colors.mainTextColor,
    textAlign:'center',
    marginTop:20
  },
  forgotPasswordLink: {
    fontSize:18,
    fontFamily:'Poppins',
    color:btnColors.primary,
    marginLeft:5,
  }
})