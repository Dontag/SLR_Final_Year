import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
let { height, width } = Dimensions.get('window');

export default class HistoryCard extends Component {
    render() {
        let { data } = this.props;
        return (
            <View style={styles.__container}>
                <TouchableOpacity activeOpacity={0.7} style={styles.__containerContent}>
                    <View style={styles.__cardTopView}>
                        <View style={styles.__cardTopInnerView}>
                            <Text style={styles.__cardTopLabelText}>Place: </Text>
                            <Text style={styles.__cardTopTitleText}>{data.place}</Text>
                        </View>
                        <View style={styles.__cardTopInnerView}>
                            <Text style={styles.__cardTopLabelText}>Date: </Text>
                            <Text style={styles.__cardTopTitleText}>{moment(data.createdAt).format('DD MMM YY | h:mm a')}</Text>
                        </View>
                    </View>
                    <View style={styles.__cardBottonView}>
                        <Text style={styles.__cardBottomTextView}>
                            Message:-
                        </Text>
                        <Text style={styles.__cardBottomTextView}>
                            {data.text}
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
        paddingVertical: 3,
        flexDirection: "row",
        marginHorizontal: 10
    },
    __cardBottomTextView: {
        fontSize: 16,
        color: "#147f91"
    },
})
