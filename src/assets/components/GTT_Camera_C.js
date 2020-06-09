import React, { Component, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { styles } from '../../styles/styles';
import ImageClassifier from '../TFlow_model/ImageClassifier';

const GTT_C_S = (props) => {
    return (
        <View style={styles.GTT_Main_View}>
            <ScrollView style={styles.GTT_Scroll_View} scrollsToEnd={true}>
                <Text style={styles.GTT_Scroll_View_Text}>
                    <ImageClassifier />
                    {/* {CameraContextData.EnableClassifier  ? <ImageClassifier/> : "This is New Data"} */}
                </Text>
            </ScrollView>
        </View>
    );
}

// class GTT_C_S extends Component {
//     render() {
//         return (
//             <View style={styles.GTT_Main_View}>
//                 <ScrollView style={styles.GTT_Scroll_View} scrollsToEnd={true}>
//                     <Text style={styles.GTT_Scroll_View_Text}>
//                         {/* { this.props.EnableFlag ?  <ImageClassifier/> : "This is new Data" } */}
//                         <ImageClassifier/>
//                     </Text>
//                 </ScrollView>
//             </View>
//         );

//     }
// }

export default GTT_C_S;


