import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Alert, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { HISTORY } from './assets/components/history';
import { styles } from './history.styles';

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
        //now try ok no not working now?? no  kc check watsapp kk ok check the consol index is changing wait k hey hii hi now?? no didnt save nope kk now
        //nope :) now first card is not wokring. rest are working okay but expanding only one na. no, all are exanding kk now now
        //none are expanding oh will conitnue at 8 ok ok sure kkbye bye!

        //why viewstate change back to original dimensiond after expansion ok wait. all expanding when indexes are matched okay now. 
        //Single card Working when indexes are matched! send me video ok its state problem wait
        //
        console.log("Index:", index);
        console.log("Index to animaate:", this._Index);
        {
            // if(this.state.viewState == true && this.state.indexToAnimate == index){

            if (this.state.viewState == true) {
                Animated.timing(this.state.animationValue, {
                    toValue: 300,
                    timing: 1500
                }).start(() => {
                    this.setState({ viewState: false })
                });
            }
            else {
                Animated.timing(this.state.animationValue, {
                    toValue: 150,
                    timing: 1500
                }).start(this.setState({ viewState: true })
                );
            }
        }

    }

    nowAnimate = (index) => {
        // this.setState((prevState)=>({indexToAnimate: index, viewState: !prevState.viewState }));
        console.log("Index to animaate before:", this._Index);
        this._Index = index;
        console.log("Index to animaate after:", this._Index);
        this.setState((prevState) => ({ viewState: !prevState.viewState }))
        this.toggleAnimation(index);
    }

    render() {
        let {
            container,
            containerInner,
            cardTopContent,
            cardBottomContent,
            cardTextPlace,
            cardTextDate,
            cardTextConversation,
            card, cardDetails
        } = styles

        let animatedStyle = {
            height: this.state.animationValue
        }

        return (
            <View style={{ flex: 1 }}>
                <AnimatedFlatlist
                    data={this.state.HistoryList}
                    keyExtractor={item => item.ID}
                    renderItem={({ item, index }) =>
                        <View style={container}>
                            <View style={containerInner}>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => { this.nowAnimate(item.ID) }} >
                                    <Animated.View key={item.ID} style={[card, item.ID == this._Index ? animatedStyle : { height: 150 }]}>
                                        <View style={cardTopContent}>
                                            <Text style={cardTextPlace}>PLACE: {item.Place}</Text>
                                            <Text style={cardTextDate}>DATE: {item.Date}</Text>
                                        </View>
                                        <View style={cardBottomContent}>
                                            <Text numberOfLines={4} style={cardTextConversation}>CONVERSATION: {item.Conversation}</Text>
                                        </View>
                                    </Animated.View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    }
                // keyExtractor={item=>item.ID}
                />
            </View>
        )
    }
}

export default History;