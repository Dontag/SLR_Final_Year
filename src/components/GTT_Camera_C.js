import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { styles } from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

class GTT_Camera_C extends Component {
    render() {
        let { classificationData, onPress, automation } = this.props;
        if (automation && classificationData != '') {
            ToastAndroid.show(classificationData, ToastAndroid.SHORT);
        }
        return (
            <View style={styles.GTT_Main_View}>
                <View style={styles.GTT_Main_Inner_View}>
                    <ScrollView style={styles.GTT_Scroll_View} scrollsToEnd={true}>
                        <View style={styles.GTT_Main_InnerScroll}>
                            <Text style={styles.GTT_Scroll_View_Text}>
                                {classificationData !== '' ?
                                    classificationData : "No Data available"}
                            </Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={onPress} style={styles.GTT_Trash}>
                        <Icon name={"ios-trash"} size={24} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default GTT_Camera_C;


