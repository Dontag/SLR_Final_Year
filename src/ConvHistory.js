import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ToastAndroid, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';


let { height, width } = Dimensions.get("window")

//Component
import CommonHeader from './components/CommonHeader';
import HistoryCard from './components/HistoryCard';


export default class ConvHistory extends Component {
    state = {
        messages: [],
        setNew: false,
        NoDataBol: false,
        checkChildren: true
    }

    async componentDidMount() {
        StatusBar.setHidden(false);
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            StatusBar.setHidden(false);
        });
        try {
            await this.get(async (message) => {
                this.setState(prevState => ({
                    messages: prevState.messages.concat(message),
                    //  messages: message,
                }));
                //     console.log("Imessage---1", this.state.messages);
                if (Promise.all(this.state.messages)) {
                    setTimeout(() => {
                        this.setState({ setNew: true })
                    }, 300);
                }
            });
        } catch (err) {
            console.log("Error Getting MessageData===>", err);
        }
    }

    componentWillUnmount() {
        // StatusBar.setHidden(false);
        this._unsubscribe();
        this.off();
    }

    parse = message => {
        //   console.log("message Data-----", message.val().amount);
        try {
            const { place, text, timestamp, user_id } = message.val()
            const { key: _id } = message
            const createdAt = new Date(timestamp)

            return {
                _id,
                createdAt,
                text,
                place,
                user_id
            };
        }
        catch (err) {
            console.log("parse Error--", err);
        }

    };


    get = async (callback) => {
        if (this.state.checkChildren === true) {
            await this.db.on('value', snapshot => {
                console.log("No of children----", snapshot.numChildren());
                if (snapshot.numChildren() == 0) {
                    this.setState({ NoDataBol: true });
                }
            })
            this.setState({ checkChildren: false });
        }
        await this.db.orderByChild('timestamp').limitToLast(35).on('child_added', snapshot => {
            callback(this.parse(snapshot))
        });
    }


    off() {
        this.db.off()
    }

    get db() {
        const path = "1111";
        //const path = "messages/";
        return (database().ref(`history/${path}`))
    }


    keyExtractor = (item, index) => index.toString();
    renderItem = ({ item, index }) => (
        <HistoryCard
            key={index}
            data={item}
        />
    )

    ItemSeparatorComponent = () => (
        <View style={styles.__itemDivider} />
    )

    render() {
        let { messages } = this.state;
        // console.log("this is message", messages)
        return (
            <View style={styles.__container}>
                <StatusBar backgroundColor={"#43aeba"} hidden={false} barStyle={'dark-content'} />
                <CommonHeader
                    title={"History"}
                    onPress={() => { this.props.navigation.goBack() }}
                />
                {this.state.setNew === false && messages.length === 0 ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"#143147"} size="large" />
                        <Text style={{ padding: 10, fontSize: 16 }}>{"Please wait while the history gets loaded"}</Text>
                    </View> :
                    <View style={styles.__bottomlistView}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={messages}
                            renderItem={this.renderItem}
                        // ItemSeparatorComponent={this.ItemSeparatorComponent}
                        />
                    </View>}
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
