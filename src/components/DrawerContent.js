import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome5"

const WIDTH = Dimensions.get('window').width;

function SLRDrawerContent(props) {
    return (

        /**Changes to be made in App.js file:-
        * 1st change:-
        * import {SLRDrawerContent} from .....
        * 
        * 2nd change:-
        * createDrawer = () =>
            <Drawer.Navigator>
                <Drawer.Screen name="Camera" component= {Camera_S}/>
            </Drawer.Navigator>
    
            Change above to :-
    
         createDrawer = () =>
            <Drawer.Navigator drawerContent={props=> <SLRDrawerContent {...props}/>}>
                <Drawer.Screen name="Camera" component= {Camera_S}/>
            </Drawer.Navigator>
    
        */
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.iconField}>
                    <Icon
                        name='user'
                        size={22}
                        color='#4826CC' />
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Login')}>
                    <Text style={{ marginTop:5,fontSize: 18, color: 'white' }}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView {...props}>
                <View style={styles.mainContent}>
                    <Drawer.Section>
                        <DrawerItem
                            label="Camera"
                            size={22}
                            labelStyle={{ fontFamily: 'roboto',color:'#13284d' }}
                            style={{ height: 50, borderBottomWidth: 0.4, borderBottomColor: '#AAAAAA' }}

                            /**Please change the screen name into the below line */

                            onPress={() => props.navigation.navigate('Camera')}>

                        </DrawerItem>
                        <DrawerItem
                            label='History'
                            labelStyle={{ fontFamily: 'roboto',color:'#13284d' }}
                            style={{ height: 50, borderBottomWidth: 0.2, borderBottomColor: '#AAAAAA' }}
                            onPress={() => props.navigation.navigate('History')}>
                        </DrawerItem>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default SLRDrawerContent;

const styles = StyleSheet.create({
    mainContent: {

    },
    header: {
        height: 120,
        padding: 10,
        backgroundColor: '#007CC3',
        alignItems: "center",
        justifyContent: 'center'
    },
    iconField: {
        height: 50,
        marginTop:5,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
});