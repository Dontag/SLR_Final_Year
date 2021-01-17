import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ToastAndroid, StatusBar, Dimensions } from 'react-native';
import { HISTORY } from './components/history';

let { height, width } = Dimensions.get("window")

//Component
import CommonHeader from './components/CommonHeader';
import HistoryCard from './components/HistoryCard';

export default class ConvHistory extends Component {
    state = {

    }

    componentDidMount() {
        StatusBar.setHidden(false);
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setHidden(false);
        });
    }

    componentWillUnmount() {
        // StatusBar.setHidden(false);
        this._unsubscribe();
    }

    keyExtractor = (item, index) => item.ID.toString();
    renderItem = ({ item, index }) => (
        <HistoryCard
            key={item.ID}
            data={item}
        />
    )

    ItemSeparatorComponent = () => (
        <View style={styles.__itemDivider} />
    )

    render() {
        return (
            <View style={styles.__container}>
                <StatusBar backgroundColor={"#43aeba"} hidden={false} barStyle={'dark-content'} />
                <CommonHeader
                    title={"History"}
                    onPress={() => { this.props.navigation.goBack() }}
                />
                <View style={styles.__bottomlistView}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={HISTORY}
                        renderItem={this.renderItem}
                    // ItemSeparatorComponent={this.ItemSeparatorComponent}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    __container: {
        flex: 1
    },
    __bottomlistView: {
        flex: 1
    },
    __itemDivider: {
        width: width,
        height: 1,
        backgroundColor: "#73e5f5"
    }
})
