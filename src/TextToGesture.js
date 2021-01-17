import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ImageBackground, StatusBar, ScrollView } from 'react-native'
import { images } from './components/image_utility';
import CommonHeader from './components/CommonHeader';

const { height, width } = Dimensions.get("window");

class TextToGesture extends Component {
   state = {
      inputData: '',
      imagePath: null,
      default: require('./assets/Images/default.jpeg'),
      loading: false
   }

   componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
         StatusBar.setHidden(false);
      });
   }

   componentWillUnmount() {
      // StatusBar.setHidden(false);
      this._unsubscribe();
   }
   onChangeLabel = (text) => {
      this.setState({ inputData: text.toLowerCase(), imagePath: null })
      this.setSwitch(text.toLowerCase())
   }

   setSwitch(alphabet) {
      console.log(alphabet);
      if (alphabet != '') {
         images.map((item, index) => {
            if (item.label === alphabet) {
               this.setState({ imagePath: item.images })
            }
         })
      }

   }
   render() {
      return (
         <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
            <StatusBar backgroundColor={"#43aeba"} hidden={false} barStyle={'dark-content'} />
            <CommonHeader
               title={"Text To Gesture"}
               onPress={() => { this.props.navigation.goBack() }}
            />
            <ImageBackground source={this.state.default} style={{ width: width, height: 400, resizeMode: "contain" }}>
               <Image source={this.state.imagePath} style={{ width: width, height: 400, resizeMode: "cover" }} />
            </ImageBackground>
            <TextInput style={styles.input}
               underlineColorAndroid="transparent"
               placeholder="Enter Text"
               placeholderTextColor="#74a3b8"
               value={this.state.inputData}
               autoCapitalize="none"
               onChangeText={(text) => this.onChangeLabel(text)} />
         </ScrollView>
      )
   }
}
export default TextToGesture;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   input: {
      borderRadius: 30,
      elevation: 5,
      alignSelf: "center",
      marginVertical: 10,
      width: width - 30,
      backgroundColor: "#fff",
      paddingHorizontal: 20
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText: {
      color: 'white'
   }
})


