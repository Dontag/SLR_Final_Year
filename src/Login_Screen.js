import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Login_S extends React.Component {
  render() {
    return (
      <View style={styles.regform}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.Content}> Username</Text>
        <TextInput style={styles.inputBox}
          placeholder={"Enter Username"}
          underlineColorAndroid='rgba(0,0,0,0)' />
        <Text style={styles.Content}> Password</Text>
        <TextInput style={styles.inputBox}
          placeholder={"Enter Password"}
          underlineColorAndroid='rgba(0,0,0,0)' />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btntext}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.Content1}>Forgot Your Password?</Text>


        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", height: 200 }}>
          <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={styles.Icon1} onPress={() => Linking.openURL('https://gmail.com')}>
              <Icon name="logo-google" size={30} color='#3264A1' />

            </TouchableOpacity>
          </View>
          <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={styles.Icon2} onPress={() => Linking.openURL('https://facebook.com')}>
              <Icon name="logo-facebook" size={30} color='#3264A1' />
            </TouchableOpacity>
          </View>
        </View>

      </View>



    );
  }
}

const styles = StyleSheet.create({
  regform: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4f8bb3"
  },
  header:
  {
    alignSelf: 'center',
    fontSize: 35,
    color: '#FFFFFF',
    paddingBottom: 30,
  },
  inputBox: {

    width: 250,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginVertical: 25,
    fontSize: 16,


  },
  button:
  {

    alignItems: 'center',
    padding: 15,
    width: 150,
    height: 46,
    borderRadius: 30,
    backgroundColor: '#3264A1',
  },
  btntext:
  {
    color: '#fff',
    fontWeight: 'bold',
  },
  Content:
  {
    marginTop: 10,
    fontSize: 20,
    color: '#FFFFFF',
    padding: 2,

  },
  Content1:
  {
    fontSize: 18,
    color: '#000000',
    padding: 10,

  },
  Icon1:
  {
    justifyContent: 'space-around',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    overflow: "hidden",
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },


  Icon2:
  {
    justifyContent: 'space-around',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    overflow: "hidden",
    alignItems: 'center',
  },
});

export default Login_S;
