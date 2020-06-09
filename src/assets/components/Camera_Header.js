import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const C_Header = ({ LeftIconName ,LeftIconSize ,LeftIconColor ,LeftOnPress ,CenterIconName ,CenterIconSize, CenterIconColor, CenterTextName, CenterTextColor, CenterOnPress, RightIconName, RightIconSize, RightIconColor, RightOnPress }) => {
    return (
        <View style={styles.Camera_S_Header_View}>
            <View style={{margin:"3%"}}>
                <Icon name={LeftIconName} size={LeftIconSize} color={LeftIconColor} onPress={LeftOnPress} />
            </View>
            <View style={styles.Camera_S_Header_Center_Element_View}>
                <Text style={{textAlign:"center", fontSize:20, color:CenterTextColor,}}>{CenterTextName}</Text>
                <Icon name={CenterIconName} size={CenterIconSize} color={CenterIconColor} onPress={ CenterOnPress } />
            </View>
            <View style={{margin:"3%"}}>
                <Icon name={RightIconName} size={RightIconSize} color={RightIconColor} onPress={RightOnPress} />
            </View>
        </View>
    );
}

export default C_Header;


