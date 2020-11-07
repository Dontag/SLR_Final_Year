import React, { Component } from 'react';
import {
    View,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native';

import { styles } from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';



class C_Footer extends Component {
    state = {
        Icon_ASL_ISL: "ASL"
    }

    onChange = () => {
        let Data = "";
        if (this.state.Icon_ASL_ISL == "ASL") {
            Data = "ISL"
        }
        else {
            Data = "ASL"
        }
        this.setState({ Icon_ASL_ISL: Data })
    }

    render() {
        const { ASL_ISL_Icon, MicIcon, LeftIconName, LeftIconSize, LeftIconColor, LeftOnPress, CenterIconName, CenterIconSize, CenterIconColor, CenterOnPress, RightIconName, RightIconSize, RightIconColor, RightOnPress } = this.props
        return (
            <View style={styles.Camera_S_Footer_Main_View}>
                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 25, padding: 10 }} >
                    <Icon name={LeftIconName} size={LeftIconSize} color={LeftIconColor} onPress={LeftOnPress} />
                </View>
                <View style={styles.Camera_S_Footer_Eye_View} >
                    <View style={styles.ASL_Left_Icon_Press}>
                        <Icon name={MicIcon} size={RightIconSize} color={RightIconColor} onPress={RightOnPress} />
                    </View>
                    <View style={styles.Camera_S_Footer_Center_Element_View}>
                        <Icon name={CenterIconName} size={CenterIconSize} color={CenterIconColor} onPress={CenterOnPress} />
                    </View>
                    <View style={styles.ASL_ISL_Icon_View}>
                        <TouchableOpacity onPress={() => this.onChange()}>
                            <Text style={styles.ASL_ISL_Text}>
                                {this.state.Icon_ASL_ISL}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", marginRight: 25, padding: 10 }}>
                    <Icon name={RightIconName} size={RightIconSize} color={RightIconColor} onPress={RightOnPress} />
                </View>
            </View>
        );
    }
}

export default C_Footer;


