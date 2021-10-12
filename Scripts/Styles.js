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

export const colors = {
  primaryHighlight: '#003f87',
  secondaryHighlight: '#007ac8',
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

export const app = StyleSheet.create({
  container: {
    flex:1,
  }
})

export const main = StyleSheet.create({
  drawer: {
    backgroundColor:colors.secondaryHighlight,
    padding:0,
    margin:0,
    width:80,
    borderWidth:0,
  },
  drawerItem: {
    padding:0,
    margin:0,
    backgroundColor:'',
    borderWidth:0,
  },
  headerContainer: {
    flex:1,
  },
  header: {
    flexDirection:'row',
    backgroundColor:colors.mainBackground
  },
  headerLogoContainer: {
    width:80,
    borderRightColor:colors.mainBackground,
    borderRightWidth:1,
    backgroundColor:colors.secondaryHighlight,
  },
  headerLogo: {
    width:80,
    height:80,
    tintColor:colors.mainBackground,
  },
  headerTextContainer: {
    borderBottomWidth:1,
    borderBottomColor:colors.headerBorder,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    width:200
  },
  headerText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:19,
    textAlign:'center',
    lineHeight:25,
    marginRight:3,
  },
  headerMain: {
    flex:1,
    backgroundColor:colors.header,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingRight:20,
  },
  headerUser: {
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    height:80
  },
  headerIcon: {
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    padding:5,
    width:40,
    height:40,
    borderRadius:10,
    backgroundColor:colors.secondaryBackground
  },
  headerUserBox: {
    height:40,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end',
    paddingRight:10,
    width:200,
  },
  headerUserBoxText: {
    justifyContent:'center',
    alignItems:'flex-end',
    height:40
  },
  headerUserNameTitle: {
    fontSize:14,
    lineHeight:14,
    fontFamily:'Poppins',
    color:colors.mainTextColor,
  },
  headerUserName: {
    fontSize:14,
    lineHeight:14,
    fontFamily:'PoppinsSemiBold',
    color:colors.mainTextColor,
  },
  headerLogout: {
    fontSize:14,
    lineHeight:14,
    fontFamily:'PoppinsSemiBold',
    color:btnColors.danger,
    marginLeft:20,
  },
  headerPlan: {
    fontSize:12,
    lineHeight:14,
    fontFamily:'Poppins'
  },
  headerAvatar: {
    width:40,
    height:40,
    borderRadius:10,
    backgroundColor:colors.secondaryBackground,
    marginRight:10,
  },
  messagesContainer: {
    width:80,
    height:80,
    backgroundColor:colors.header,
    borderLeftColor:colors.headerBorder,
    borderLeftWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
})

export const home = StyleSheet.create({
  container: {
    flex:1
  }
})

export const innerDrawer = StyleSheet.create({
  drawer: {
    backgroundColor:colors.mainBackground,
    height:'100%',
    width:200,
  },
  drawerTop: {
    backgroundColor:colors.mainBackground,
    width:200,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:23,
    height:60,
    paddingBottom:0,
  },
  drawerTopTitle: {
    fontSize:22,
    fontFamily:'PoppinsSemiBold',
    borderBottomWidth:2,
    color:colors.mainTextColor,
    borderBottomColor:colors.mainTextColor
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

export const topics = StyleSheet.create({
  container: {
    flex:1,
    margin:20
  },
  activityIndicatorContainer: {
    padding:20
  },
  topics: {
    flex:1,
  },
  addTopicContainer: {
    borderRadius:10,
    padding:20,
    borderWidth:2,
    borderStyle:'dashed',
    borderColor:btnColors.primary,
    marginBottom:20
  },
  addTopicContainerText: {
    fontSize:24,
    color:btnColors.primary,
    fontFamily:'Poppins',
    textAlign: 'center',
  },
  topic: {
    borderRadius:10,
    padding:20,
    marginBottom:20,
    backgroundColor:colors.mainBackground,
  },
  topicsHeader: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    padding:20,
    borderRadius:10,
    marginBottom:20,
    backgroundColor:colors.mainBackground,
  },
  topicsHeaderText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:24,
    color:colors.mainTextColor,
  },
  topicsHeaderButton: {
    borderRadius:10,
    backgroundColor:btnColors.primary,
  },
  topicHeader: {
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent: 'space-between',
    marginBottom:10
  },
  topicHeaderText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:22,
    color:colors.mainTextColor,
  },
  topicHeaderTime: {
    fontFamily:'Poppins',
    fontSize:16,
    color:colors.secondaryTextColor,
  },
  topicBody: {

  },
  topicBodyText: {
    fontFamily:'Poppins',
    fontSize:16,
    color:colors.mainTextColor,
  }
})

export const empty = StyleSheet.create({
  container: {
    flex:1
  }
})