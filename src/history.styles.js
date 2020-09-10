import { StyleSheet,Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window');


export const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'flex-start',
      justifyContent:'flex-start',
      //marginTop:'10%',
      backgroundColor: '#2579B0'
    },
    containerInner: {
      flex:1,
      alignItems:'flex-start',
      justifyContent:'flex-start',
      marginTop:'5%',
      backgroundColor: '#2579B0'
    },
    card: {
      flexDirection:'column',
      backgroundColor: '#95C4D8',
      height: height/6,
      borderRadius: 30,
      marginLeft: '2%',
      marginRight:'2%',
      width: width-20,
      shadowColor: '#0d3254',
      shadowOpacity: 1,
      shadowOffset: {
        width: 3,
        height: 3
      },
      elevation:3
    },
    cardTextPlace: {
      fontSize: 15,
      alignItems: 'flex-start',
      marginTop:'5%',
      color:'#fff',
      //backgroundColor:"blue"
      textShadowColor: '#4d4d4d',
      textShadowOffset: {
        width: 1,
        height: 0
      },
      textShadowRadius:10,
      
    },
    cardTextDate: {
      fontSize: 15,
      alignItems: 'flex-end',
      marginTop:'5%',
      color:'#fff',
      textShadowColor: '#4d4d4d',
      textShadowOffset: {
        width: 1,
        height: 0
      },
      textShadowRadius:10
  
      //backgroundColor:"pink"
    },
    cardTextConversation: {
      fontSize: 15,
      alignItems: 'flex-end',
      marginTop:'10%',
      marginBottom:'10%',
      color:'#fff',
      shadowColor: '#0d3254',
      shadowOpacity: 1,
      shadowOffset: {
        width: 3,
        height: 3
      },
      textShadowColor: '#4d4d4d',
      textShadowOffset: {
        width: 1,
        height: 0
      },
      textShadowRadius:10
    },
  
    cardTopContent: {
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
     // backgroundColor:'red',
      marginLeft: '5%',
      marginRight:'5%',
      height:'10%'
    },
  
    cardBottomContent: {
      flex:3,
      //backgroundColor:'green',
      marginLeft: '5%',
      marginRight:'5%',
    },
  
    
    cardDetails: {
      width: '100%',
      height: 200,
      resizeMode: 'cover'
    }
  })
  