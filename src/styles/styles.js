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
  justifyContent: 'space-around' 
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
  backgroundColor: "rgba(0,0,0,0.36)",
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
  backgroundColor:"rgba(0,0,0,0.7)",
  justifyContent:"center",
  alignItems:"center",
  borderBottomColor:"#c1c5c9",
  borderBottomWidth:0.20
},
GTT_Scroll_View:{
  width:"93%",
  height:"100%"
},
GTT_Scroll_View_Text:{
  fontSize:22,
  fontWeight:"100",
  color:"white",
  width:"100%",
  height:"100%",
  padding:"2%",

}

});
