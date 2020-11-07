import { StyleSheet , Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  headText: {
      fontSize: 36,
      textAlign: 'center',
  },

//  Drawer Screen 1

  D1_SAV: {
    justifyContent:'center',
    alignItems:'center',
  },
  D1_HText: {
    fontSize:15,
    textAlign: 'center',
  },


// Drawer Screen 2  


//Camera Screen
Camera_S_Container_View: {
  height: "100%",
  backgroundColor: '#000',
},
Camera_S_flash_View: {
  margin:"4%",
  backgroundColor: 'blue',
},
Camera_S_faces_Barcode_Container: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  top: 0,
},

//Camera Header Component
Camera_S_Header_View:{
  flexDirection: 'row', 
  justifyContent: 'space-around',
  backgroundColor: "rgba(43, 101, 199, 0.50)",
  borderBottomLeftRadius:10,
  borderBottomRightRadius: 10 
},
Camera_S_Header_Center_Element_View:{
  margin:"2%",
  flexDirection:"column",
  justifyContent:"space-around",
  alignItems:"center"
},


//Camera Footer Component
Camera_S_Footer_Main_View:{
  width: "100%",
  height:"100%",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  flexDirection:"row",
  backgroundColor: "rgba(49, 128, 185,0.8)",
},
Camera_S_Footer_Eye_View:{
  width: width/2.5,
  height:"80%",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  flexDirection:"row",
  backgroundColor: "rgba(0, 51, 64, 0.5)",
  borderRadius: 50,
},
Camera_S_Footer_Center_Element_View:{
  margin:"2%",
  flexDirection:"column",
  justifyContent:"space-around",
  alignItems:"center"
},


// GTT_C_S
GTT_Main_View:{
  width: width,
  height: height/8,
  backgroundColor:"rgba(49, 128, 185,0.8)",
  justifyContent:"center",
  alignItems:"center",
  borderBottomColor:"#c1c5c9",
  borderBottomWidth:0.20,
  borderTopLeftRadius:10,
  borderTopRightRadius:10,

},
GTT_Main_Inner_View:{
  width: "90%",
  height: "80%",
  backgroundColor:"rgba(255, 255, 255, 0.8)",
  justifyContent:"center",
  alignItems:"center",
  borderBottomColor:"#c1c5c9",
  borderBottomWidth:0.20,
  borderRadius: 25
},
GTT_Scroll_View:{
  width:"93%",
  height:"100%"
},
GTT_Scroll_View_Text:{
  fontSize:18,
  fontWeight:"100",
  color:"rgb(65, 132, 176)",
  width:"100%",
  height:"100%",
  padding:"2%",

},

ASL_ISL_Icon_View:{
  width: "20%",
  height:"80%",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  flexDirection:"row",
  borderRadius: 50,
},
ASL_ISL_Text:{
  fontSize:18,
  fontWeight:"100",
  color:"rgb(255, 255, 255)",
  width:"100%",
  height:"50%",
  alignItems:"center",
  justifyContent:"center",
}



});
