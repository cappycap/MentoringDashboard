import { Dimensions, Appearance, StyleSheet } from 'react-native';
import { set, get, getTTL, ttl } from '../Scripts/Storage.js'
// Unchanging stylesheets and elements.
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const logo = require('../assets/logo.png');

export const empty = StyleSheet.create({
  container: {
    flex:1
  }
})

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


export const summaries = StyleSheet.create({
  container: {
    flex:1,
    margin:20
  },
  activityIndicatorContainer: {
    padding:20
  },
  summaries: {
    flex:1,
    zIndex:1,
  },
  addSummaryContainer: {
    borderRadius:10,
    padding:20,
    borderWidth:2,
    borderStyle:'dashed',
    borderColor:btnColors.primary,
    marginBottom:20
  },
  addSummaryContainerText: {
    fontSize:24,
    color:btnColors.primary,
    fontFamily:'Poppins',
    textAlign: 'center',
  },
  summary: {
    borderRadius:10,
    padding:20,
    marginBottom:20,
    backgroundColor:colors.mainBackground,
  },
  summariesHeader: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    padding:20,
    borderRadius:10,
    marginBottom:20,
    backgroundColor:colors.mainBackground,
    zIndex:5,
  },
  summariesHeaderText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:24,
    color:colors.mainTextColor,
  },
  summariesHeaderButton: {
    borderRadius:5,
    width:'200px',
    backgroundColor:btnColors.primary,
  },
  summaryHeader: {
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent: 'space-between',
    marginBottom:10
  },
  summaryHeaderText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:22,
    color:colors.mainTextColor,
  },
  summaryHeaderTime: {
    fontFamily:'Poppins',
    fontSize:16,
    color:colors.secondaryTextColor,
  },
  summaryHeaderUsers: {
    fontFamily:'Poppins',
    fontSize:14,
    color:colors.mainTextColor,
  },
  summaryBody: {

  },
  summaryBodyTopicText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:16,
    color:colors.mainTextColor,
  },
  summaryBodyText: {
    fontFamily:'Poppins',
    fontSize:16,
    color:colors.mainTextColor,
  },
  summaryButton: {
    alignItems:'end',
    justifyContent: 'center'
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
  noneText: {
    fontSize:24,
    color:colors.mainTextColor,
    fontFamily:'Poppins',
    textAlign: 'center',
  },
  successBox: {
    backgroundColor:btnColors.success,
    padding:10,
    borderRadius:10,
    marginBottom:20
  },
  successBoxText: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'Poppins',
    textAlign: 'center',
  },
  activSig: {
    fontSize:16,
    color:btnColors.success,
    fontFamily:'PoppinsSemiBold',
    marginTop:10
  },
  errorText: {
    fontSize:16,
    color:btnColors.danger,
    fontFamily:'Poppins',
    marginRight:10
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
  },
  entryTitle: {
    fontFamily:'PoppinsSemiBold',
    fontSize:16,
    color:colors.mainTextColor,
  },
  input: {
    padding:10,
    backgroundColor:colors.secondaryBackground,
    borderRadius:10,
    marginBottom:10
  },
  submitButton: {
    borderRadius:10,
    backgroundColor:btnColors.primary,
  },
  submitButtonRow: {
    flexDirection:'row',
    marginTop:20
  },
  otherRow: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherOption: {
    flex:1,
  },
})


export const pairs = StyleSheet.create({
  container: {
    flex:1,
    padding:20
  },
  text: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'Poppins',
    textAlign: 'center'
  },
  pairs: {
    backgroundColor:colors.mainBackground,
    borderRadius:20,
    padding:20,
    alignItems:'center',
    borderWidth:2,
  },
  pairsMap: {
    flex:1
  },
  pairContainer: {
    backgroundColor:colors.mainBackground,
    borderRadius:20,
    padding:20,
    alignItems:'center',
    marginLeft: 10,marginTop:10
  },
  pairsHeader: {
    width: '100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    padding:20,
    borderRadius:10,
    marginBottom:20,
    backgroundColor:colors.mainBackground,
  },
  pairsHeaderText: {
    fontFamily:'PoppinsSemiBold',
    fontSize:24,
    color:colors.mainTextColor,
  },
  pairsHeaderButton: {
    borderRadius:10,
    backgroundColor:btnColors.primary,
  },
  pairsButtonMentor: {
    width:'100%',
    flex:1,
    borderRadius:20,
    marginBottom:10,
    backgroundColor:colors.secondaryHighlight
  },
  pairsButtonMentee: {
    width:'100%',
    flex:1,
    borderRadius:20,
    backgroundColor:colors.secondaryHighlight
  },
  pairsContainer: {
    width:'25%',
    paddingBottom:20
  },
  pairsButtonContainer: {
    width:'100%',
    flex:1
  },
  pairsList: {
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  pairsBodyText: {
    fontFamily:'Poppins',
    fontSize:18,
    color:colors.mainTextColor,
  },
  searchBarWrapperPairs: {
    backgroundColor:colors.mainBackground,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:1,
    borderRadius:20,
    marginBottom:20,
  },
  PairTopWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    padding:10,
    backgroundColor:colors.secondaryBackground,
    borderRadius:20,
    width:'50%',
    marginRight:10,
  },
  createPairButton: {
    backgroundColor:btnColors.primary,
    borderRadius:20,
    width:200,
  },
  createPairButtonContainer: {
    marginRight: 20,
    marginTop:10,
    marginBottom:10
  },
  deletePairButton: {
    backgroundColor:btnColors.danger,
    borderRadius:20,
    width:250,
  },
  deletePairButtonContainer: {
  },
  searchBarText: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
    marginRight:5,
  },
  selectMentText: {
    fontSize:14,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
    marginRight:5,
  },
  creationText: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
    color:'green',
    textAlign: 'right',
    marginRight:5,
  },
  selectedUserContainer: {
    alignItems:'flex-start',
  },
  goBack: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
  },
  backRow: {
    flexDirection:'row',
    alignItems:'center',
  },
  upperRow: {
    flexDirection: 'row',
    alignItems:'center',
    paddingBottom:20,
    width:'100%',
  },
  innerDeletionRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'flex-end'
  },
})
export const users = StyleSheet.create({
  container: {
    flex:1,
    padding:20
  },
  text: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'Poppins',
    textAlign: 'center'
  },
  searchBarWrapper: {
    backgroundColor:colors.mainBackground,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:1,
    borderRadius:20,
    marginBottom:20,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems:'center'
  },
  searchBar: {
    padding:10,
    backgroundColor:colors.secondaryBackground,
    borderRadius:20,
    width:'50%',
    marginRight:10,
  },
  searchClearButton: {
    color:btnColors.primary,
    borderRadius:20,
  },
  searchClearButtonContainer: {
  },
  searchBarText: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
    marginRight:5,
  },
  usersList: {
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  userContainer: {
    width:'25%',
    paddingBottom:20
  },
  user: {
    backgroundColor:colors.mainBackground,
    borderRadius:20,
    padding:20,
    alignItems:'center',
    borderWidth:2,
  },
  userAvatar: {
    width:120,
    height:120,
    borderRadius:100,
    borderWidth:4,
    borderColor:colors.secondaryHighlight
  },
  userName: {
    fontSize:22,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
    textAlign: 'center'
  },
  userStats: {
    marginBottom:9
  },
  userButton: {
    width:'100%',
    flex:1,
    borderRadius:20,
    backgroundColor:colors.secondaryHighlight
  },
  userButtonContainer: {
    width:'100%',
    flex:1
  },
  upperRow: {
    flexDirection: 'row',
    alignItems:'center',
    paddingBottom:20,
    width:'100%',
  },
  deletionRow: {
    flex:1,
    flexDirection: 'column',
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  innerDeletionRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'flex-end'
  },
  deletionText: {
    fontSize:16,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
  },
  deletionInputPass: {
    backgroundColor:colors.header,
    padding:5,
    borderRadius:5,
    color:colors.mainTextColor,
  },
  selectedUserContainer: {
    alignItems:'flex-start',
  },
  backRow: {
    flexDirection:'row',
    alignItems:'center',
  },
  goBack: {
    fontSize:18,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
  },
  selectedUser: {
    backgroundColor:colors.mainBackground,
    borderRadius:20,
    padding:20,
    flex:1,
    width:'100%'
  },
  selectedUserHeaderRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
  },
  selectedUserHeaderRowLeft: {
    flexDirection:'row',
    alignItems:'center',
  },
  selectedUserHeaderRowRight: {
    alignItems:'flex-end'
  },
  selectedUserHeaderRowRightText: {
    fontSize:16,
    color:colors.mainTextColor,
    fontFamily:'Poppins'
  },
  selectedUserAvatar: {
    width:75,
    height:75,
    borderRadius:150,
    borderWidth:4,
    borderColor:colors.secondaryHighlight,
    marginRight:20
  },
  selectedUserName: {
    fontSize:28,
    fontFamily:'PoppinsSemiBold',
    color:colors.mainTextColor,
  },
  selectedUserCreated: {
    fontSize:16,
    fontFamily:'Poppins',
    color:colors.mainTextColor,
  },
  selectedUserDataSection: {
    flexDirection:'row',
    width:'100%',
    marginTop:20,
  },
  selectedUserSummariesContainer: {
    flex:3,
    marginRight:20,
  },
  selectedUserSummary: {
    backgroundColor:colors.mainBackground,
    borderRadius:20,
    padding:20,
  },
  selectedUserRelationships: {
    backgroundColor:colors.mainBackground,
    borderRadius:20,
    padding:20,
    flex:1,
  },
  noneText: {
    fontSize:16,
    color:colors.mainTextColor,
    fontFamily:'Poppins',
  },
  selectedUserTitle: {
    fontSize:22,
    color:colors.mainTextColor,
    fontFamily:'PoppinsSemiBold',
  },
  boldText: {
    fontFamily:'PoppinsSemiBold',
  },
  summaryHeader: {
    fontSize:22,
    color:colors.mainTextColor,
    fontFamily:'Poppins'
  },
  summaryText: {
    fontSize:16,
    color:colors.mainTextColor,
    fontFamily:'Poppins'
  },
  
})

export const settings = StyleSheet.create({
  body: {
    flex:1,
    borderWidth:0,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.secondaryBackground,
    borderLeftWidth:10,
    borderLeftColor:colors.secondaryHighlight,
    borderRightWidth:10,
    borderRightColor:colors.secondaryHighlight,
  },
  logo: {
    width:240,
    height:120,
    marginTop:40,
    marginBottom:20
  },
  infoBox: {
    width:'100%',
    padding:20,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:'center',
    marginTop:20,
  },
  infoBoxText: {
    color:'#fff',
    fontSize:16,
    fontFamily:'Poppins',
    textAlign:'center',
  },
  bodyContainer: {
    backgroundColor:colors.mainBackground,
    borderRadius:10,
    padding:20,
    width:'50%',
    marginTop:20,
    marginBottom:100,
    marginLeft:'25%'
  },
  bodyHeader: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20,
    borderRadius:10,
    backgroundColor:colors.mainBackground,
    marginBottom:20,
  },
  bodyTitleGroup: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  bodyTitle: {
    color:colors.darkGray,
    fontSize:26,
    marginRight:10,
    fontFamily:'PoppinsSemiBold',
    textAlign:'center',
  },
  bodyDesc: {
    color:colors.darkGray,
    fontSize:16,
    lineHeight:14,
    fontFamily:'Poppins',
    textAlign:'center',
  },
  form: {
    marginLeft:20,
    marginRight:20,
    marginTop:0,
    marginBottom:20
  },
  inputLabel: {
    fontFamily:'PoppinsSemiBold',
    fontSize:20,
    marginTop:20,
    color:colors.secondaryTextColor
  },
  inputStyle: {
    color:colors.mainTextColor,
    backgroundColor:colors.secondaryBackground,
    borderRadius:10,
    padding:10,
    height:38,
    width:'100%',
    fontFamily:'Poppins',
    fontSize:18,
    marginTop:5,
    marginBottom:30
  },
  forgotPasswordButton: {
    backgroundColor:btnColors.primary,
    borderRadius:10,
  },
  link: {
    color:btnColors.primary,
    fontSize:18,
    textDecorationLine: 'underline',
  },
  subtitle: {
    color:colors.mainTextColor,
    fontSize:18,
    width:'100%',
    marginBottom:15,
    marginTop:35,
    textAlign:'right'
  },
  confirmBox: {
    backgroundColor: colors.secondaryHighlight,
    padding:20,
    borderRadius:10,
    width:'40%',
  },
  confirmBoxText: {
    color:'#fff',
    fontFamily:'Poppins',
    fontSize:18,
    textAlign:'center'
  }
})

