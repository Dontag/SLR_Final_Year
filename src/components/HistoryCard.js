import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';

let { height, width } = Dimensions.get('window');

export default class HistoryCard extends Component {
    render() {
        let { onPress } = this.props;
        return (
            <View style={styles.__container}>
                <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.__containerContent}>
                    <View style={styles.__cardTopView}>
                        <View style={styles.__cardTopInnerView}>
                            <Text style={styles.__cardTopLabelText}>Place: </Text>
                            <Text style={styles.__cardTopTitleText}>Bhusawal</Text>
                        </View>
                        <View style={styles.__cardTopInnerView}>
                            <Text style={styles.__cardTopLabelText}>Date: </Text>
                            <Text style={styles.__cardTopTitleText}>1 Jan 2021 | 10:00 AM</Text>
                        </View>
                    </View>
                    <View style={styles.__cardBottonView}>
                        <Text style={styles.__cardBottomTextView}>
                            dfakldjfklajdfklajsdfklajdslkfjakldjfalk;dfakldjfklajdfklajsdfklajdslkfjakldjfalkasdfldf
                            asdfasdfasdfasdffasfsd
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    __container: {
        width: width,
        paddingVertical: 4
    },
    __containerContent: {
        width: width - 15,
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#d1e7f0"
    },
    __cardTopView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    __cardTopInnerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 7
    },
    __cardTopLabelText: {
        color: "#3f585c",
        fontSize: 16
    },
    __cardTopTitleText: {
        color: "#233538",
        fontSize: 16
    },
    __cardBottonView: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3
    },
    __cardBottomTextView: {
        textAlign: "center",
        fontSize: 16,
        color: "#147f91"
    },
})
