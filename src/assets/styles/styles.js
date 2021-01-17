import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  headText: {
    fontSize: 36,
    textAlign: 'center',
  },
  //Camera Screen
  Camera_S_Container_View: {
    flex: 1,
    backgroundColor: '#000',
  },
  Camera_S_flash_View: {
    margin: "4%",
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
  Camera_S_Header_View: {
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: "rgba(43, 101, 199, 0.50)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 75
  },
  Camera_S_Header_Center_Element_View: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },


  //Camera Footer Component
  Camera_S_Footer_Main_View: {
    width: width,
    height: 100,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(49, 128, 185,0.8)",
  },
  Camera_S_Footer_Eye_View: {
    width: width / 2.4,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0, 51, 64, 0.5)",
    borderRadius: 50,
  },
  Camera_S_Footer_Center_Element_View: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },


  // GTT_C_S
  GTT_Main_View: {
    width: width,
    height: height / 8,
    backgroundColor: "rgba(49, 128, 185,0.8)",
    justifyContent: "center",
    borderBottomColor: "#c1c5c9",
    borderBottomWidth: 0.20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  GTT_Main_Inner_View: {
    width: width - 15,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    borderBottomColor: "#c1c5c9",
    alignSelf: "center",
    borderBottomWidth: 0.20,
    borderRadius: 20,
    flexDirection: "row"
  },
  GTT_Scroll_View: {
    width: width - 15,
  },
  GTT_Scroll_View_Text: {
    fontSize: 18,
    fontWeight: "100",
    color: "rgb(65, 132, 176)",
    padding: "2%",

  },
  GTT_Trash: {
    backgroundColor: "rgba(0, 51, 64,0.9)",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  GTT_Main_InnerScroll: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1
  },

  ASL_ISL_Icon_View: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 50,
    width: 33,
  },
  ASL_ISL_Text: {
    fontSize: 18,
    color: "rgb(255, 255, 255)",
    alignItems: "center",
    justifyContent: "center",
  },
  ASL_Left_Icon_Press: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12
  }
});
