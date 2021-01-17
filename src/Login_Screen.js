import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
  StatusBar,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//Component

import CommonHeader from './components/CommonHeader';

let { height, width } = Dimensions.get('window');
class Login_S extends React.Component {

  componentDidMount() {
    StatusBar.setHidden(false);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setHidden(false);
    });
  }

  componentWillUnmount() {
    // StatusBar.setHidden(false);
    this._unsubscribe();
  }
  render() {
    return (
      <View style={styles.__container}>
        <StatusBar backgroundColor={"#43aeba"} hidden={false} barStyle={'dark-content'} />
        <CommonHeader
          title={"Login"}
          onPress={() => { this.props.navigation.goBack() }}
        />
        <View style={styles.__containerContent}>
          <Text style={styles.__contentTitle}>
            recog-sign
          </Text>
          <View style={styles.__loginContent}>
            <View style={styles.__inputContainer}>
              <Text style={styles.__inputTitle}> Username</Text>
              <TextInput style={styles.__inputBox}
                placeholder={"Enter Username"}
                underlineColorAndroid='rgba(0,0,0,0)' />
            </View>
            <View style={[styles.__inputContainer, { marginTop: 20 }]}>
              <Text style={styles.__inputTitle}> Password</Text>
              <TextInput style={styles.__inputBox}
                placeholder={"Enter Password"}
                underlineColorAndroid='rgba(0,0,0,0)' />
            </View>
            <TouchableOpacity style={styles.__inputSubmitButton}>
              <Text style={styles.__inputSubmitButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.__inputForgotButton}>
              <Text style={styles.__inputForgotButtonText}>Forgot Your Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.__loginBottomContents}>
            <TouchableOpacity style={styles.__loginBottomButtonView} onPress={() => Linking.openURL('https://gmail.com')}>
              <Icon name="logo-google" size={30} color='#3264A1' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.__loginBottomButtonView} onPress={() => Linking.openURL('https://facebook.com')}>
              <Icon name="logo-facebook" size={30} color='#3264A1' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  __container: {
    flex: 1,
    backgroundColor: "#4f8bb3"
  },
  __contentTitle: {
    textTransform: "uppercase",
    alignSelf: "center",
    fontSize: 22,
    color: "#143147"
  },
  __containerContent: {
    marginVertical: 20,
    width: width,
    justifyContent: "center"
  },
  __loginContent: {
    marginVertical: 30,
    width: width - 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    justifyContent: "center",
    alignSelf: "center"
  },
  __inputContainer: {
    paddingHorizontal: 10
  },
  __inputTitle: {
    fontSize: 16,
    color: "#2c6d9c",
    paddingVertical: 4
  },
  __inputBox: {
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#e1edf5",
    paddingHorizontal: 20
  },
  __inputSubmitButton: {
    marginTop: 40,
    marginBottom: 10,
    alignSelf: "center",
    borderRadius: 30,
    width: width / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4f8bb3",
    padding: 10,
    elevation: 10
  },
  __inputSubmitButtonText: {
    color: "#ffffff",
    fontSize: 16
  },
  __inputForgotButton: {
    alignSelf: "center"
  },
  __inputForgotButtonText: {
    color: "#728b9e"
  },
  __loginBottomContents: {
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 30,
    flexDirection: "row"
  },
  __loginBottomButtonView: {
    borderRadius: 50,
    width: width * 2 / 15,
    height: width * 2 / 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    elevation: 5
  },
});

export default Login_S;
