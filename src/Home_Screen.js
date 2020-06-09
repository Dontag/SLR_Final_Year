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

class Home_S extends Component {
  
  render() {
    return(
      <SafeAreaView>
      <View><Text style={styles.headText}>This is nishad</Text></View>
      <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'red',height:300}}>
        <TouchableOpacity style={{width:160,justifyContent:'center',alignItems:'center',backgroundColor:'blue'}} onPress={() => this.props.navigation.navigate('Dashboard')}>
          <Text style={{fontSize:15}}>
            Try For Free!
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{fontSize:15,color:'blue'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}

export default Home_S;


