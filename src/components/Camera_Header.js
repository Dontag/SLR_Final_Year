import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const C_Header = ({
    LeftIconName,
    LeftIconSize,
    LeftIconColor,
    LeftOnPress,
    CenterIconName,
    CenterIconSize,
    CenterIconColor,
    CenterTextName,
    CenterTextColor,
    CenterOnPress,
    RightIconName,
    RightIconSize,
    RightIconColor,
    RightOnPress }) => {
    return (
        <View style={styles.Camera_S_Header_View}>
            <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 20 }}>
                <Icon name={LeftIconName} size={LeftIconSize} color={LeftIconColor} onPress={LeftOnPress} style={{ padding: 10 }} />
            </View>
            <View style={styles.Camera_S_Header_Center_Element_View}>
                <Text style={{ textAlign: "center", fontSize: 20, color: CenterTextColor, }}>{CenterTextName}</Text>
                <Icon name={CenterIconName} size={CenterIconSize} color={CenterIconColor} onPress={CenterOnPress} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                <Icon name={RightIconName} size={RightIconSize} color={RightIconColor} onPress={RightOnPress} style={{ padding: 10 }} />
            </View>
        </View>
    );
}

export default C_Header;


