import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { styles } from '../assets/styles/styles';

class GTT_Camera_C extends Component {
    render() {
        let { classificationData } = this.props;
        return (
            <View style={styles.GTT_Main_View}>
                <View style={styles.GTT_Main_Inner_View}>
                    <ScrollView style={styles.GTT_Scroll_View} scrollsToEnd={true}>
                        <Text style={styles.GTT_Scroll_View_Text}>
                            {classificationData !== '' ?
                                classificationData : "No Data available"}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default GTT_Camera_C;


