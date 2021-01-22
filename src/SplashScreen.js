import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, StatusBar } from 'react-native'

const logo = require('./assets/logo/Logo.png')
let { height, width } = Dimensions.get("window")

export default class SplashScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Camera');
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Camera' }],
            });
        }, 1500);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor="#98cee3" />
                <Image source={logo} style={styles.logoStyle} />
                <Text style={styles.logoTitle}> Sign Language recognition </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#98cee3"
    },
    logoStyle: {
        width: width / 2 - 40,
        height: width / 2 - 40
    },
    logoTitle: {
        color: "#154461",
        fontSize: 25,
        marginVertical: 8
    },
})
