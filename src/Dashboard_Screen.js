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

class Dashboard_S extends Component {
  render() {
    return(
      <SafeAreaView style={styles.D1_SAV}>
      <Text style={styles.headText}>This is nishad</Text>
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
          <Text style={{fontSize:15,color:'blue'}}>
            click here to go Barcode
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Text style={{fontSize:15,color:'blue'}}>
            openDrawer
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}

export default Dashboard_S;


