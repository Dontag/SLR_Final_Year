import React from 'react';
import {
    View,
    Alert,
} from 'react-native';

import { styles } from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';



const C_Footer = ({LeftIconName ,LeftIconSize ,LeftIconColor ,LeftOnPress ,CenterIconName ,CenterIconSize, CenterIconColor, CenterOnPress, RightIconName, RightIconSize, RightIconColor, RightOnPress}) => {
    return (
        <View style={styles.Camera_S_Footer_Main_View}>
            <View style={{margin:"3%"}} >
                <Icon name={LeftIconName} size={LeftIconSize} color={LeftIconColor} onPress={LeftOnPress}/>
            </View>
            <View style={styles.Camera_S_Footer_Center_Element_View}>
                <Icon name={CenterIconName} size={CenterIconSize} color={CenterIconColor} onPress={CenterOnPress}/>
            </View>
            <View style={{margin:"3%"}}>
                <Icon name={RightIconName} size={RightIconSize} color={RightIconColor} onPress={RightOnPress}/>
            </View>
        </View>
    );
}

export default C_Footer;


