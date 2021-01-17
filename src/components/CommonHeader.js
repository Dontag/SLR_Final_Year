import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

let { height, width } = Dimensions.get('window');

export default class CommonHeader extends Component {
    render() {
        let { title, onPress } = this.props;
        return (
            <View style={styles.__container}>
                <TouchableOpacity onPress={onPress} style={styles.__headerLeftContentButton}>
                    <Icon name={"arrow-left"} color={"white"} size={25} />
                </TouchableOpacity>
                <View style={styles.__headerRightContent}>
                    <Text style={styles.__headerRightContentText}>
                        {title}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    __container: {
        width: width,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#1f608f",
        paddingVertical: 5
    },
    __headerLeftContentButton: {
        padding: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    __headerRightContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    __headerRightContentText: {
        color: "#ffffff",
        fontSize: 18,
        paddingRight: 10
    },
})
