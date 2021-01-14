import React, { Component } from 'react';
import { Animated, Alert, Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { HISTORY } from './components/history';

const { width, height } = Dimensions.get('window');
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HistoryList: HISTORY,
            animationValue: new Animated.Value(150),
            viewState: false,
            indexToAnimate: null
        };
    }

    _Index = null

    showAlert = (ID) => {
        Alert.alert(
            'Alerted on ', ID
        )
    }

    toggleAnimation = (index) => {
        console.log("Index:", index);
        console.log("Index to animaate:", this._Index);
        {
            if (this.state.viewState == true) {
                Animated.timing(this.state.animationValue, {
                    toValue: 300,
                    timing: 1500,
                    useNativeDriver: true
                }).start(() => {
                    this.setState({ viewState: false })
                });
            }
            else {
                Animated.timing(this.state.animationValue, {
                    toValue: 150,
                    timing: 1500,
                    useNativeDriver: true
                }).start(this.setState({ viewState: true })
                );
            }
        }

    }

    nowAnimate = (index) => {
        console.log("Index to animaate before:", this._Index);
        this._Index = index;
        console.log("Index to animaate after:", this._Index);
        this.setState((prevState) => ({ viewState: !prevState.viewState }))
        this.toggleAnimation(index);
    }

    render() {
        let animatedStyle = {
            height: this.state.animationValue
        }

        return (
            <View style={{ flex: 1 }}>
                <AnimatedFlatlist
                    data={this.state.HistoryList}
                    keyExtractor={item => item.ID}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <View style={styles.containerInner}>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => { this.nowAnimate(item.ID) }} >
                                    <Animated.View key={item.ID} style={[styles.card, item.ID === this._Index ? animatedStyle : { height: this.state.animationValue }]}>
                                        <View style={styles.cardTopContent}>
                                            <Text style={styles.cardTextPlace}>PLACE: {item.Place}</Text>
                                            <Text style={styles.cardTextDate}>DATE: {item.Date}</Text>
                                        </View>
                                        <View style={styles.cardBottomContent}>
                                            <Text numberOfLines={4} style={styles.cardTextConversation}>CONVERSATION: {item.Conversation}</Text>
                                        </View>
                                    </Animated.View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#2579B0'
    },
    containerInner: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: '5%',
        backgroundColor: '#2579B0'
    },
    card: {
        flexDirection: 'column',
        backgroundColor: '#95C4D8',
        height: height / 6,
        borderRadius: 30,
        marginLeft: '2%',
        marginRight: '2%',
        width: width - 20,
        shadowColor: '#0d3254',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 3
    },
    cardTextPlace: {
        fontSize: 15,
        alignItems: 'flex-start',
        marginTop: '5%',
        color: '#fff',
        textShadowColor: '#4d4d4d',
        textShadowOffset: {
            width: 1,
            height: 0
        },
        textShadowRadius: 10,

    },
    cardTextDate: {
        fontSize: 15,
        alignItems: 'flex-end',
        marginTop: '5%',
        color: '#fff',
        textShadowColor: '#4d4d4d',
        textShadowOffset: {
            width: 1,
            height: 0
        },
        textShadowRadius: 10
    },
    cardTextConversation: {
        fontSize: 15,
        alignItems: 'flex-end',
        marginTop: '10%',
        marginBottom: '10%',
        color: '#fff',
        shadowColor: '#0d3254',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3
        },
        textShadowColor: '#4d4d4d',
        textShadowOffset: {
            width: 1,
            height: 0
        },
        textShadowRadius: 10
    },

    cardTopContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
        height: '10%'
    },

    cardBottomContent: {
        flex: 3,
        marginLeft: '5%',
        marginRight: '5%',
    },


    cardDetails: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    }
})

export default History;