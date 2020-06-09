import React ,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {styles} from './styles/styles';

class Login_S extends Component {
  render() {
    return(
      <SafeAreaView style={styles.D1_SAV}>
      <Text style={styles.headText}>This is Login</Text>
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text style={{fontSize:15,color:'blue'}}>
            click here to go back
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}

export default Login_S;


