import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width;

const SecondMenu = ({ navigation }) => {


    return (
        <View>
            <ImageBackground source={require('./image/menu.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
                <View style={styles.inputsContainer}>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button1]} onPress={() => navigation.navigate('SavedInfo')}>
                        <Text style={styles.fullWidthButtonText}>Safety Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button2]} onPress={() => navigation.navigate('Currency')}>
                        <Text style={styles.fullWidthButtonText}>Currency exchange</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button1]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Saved Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button2]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Liked attractions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button1]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Calendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button2]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Thinks to pack</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button1]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Cost estimate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button2]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Movit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button1]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>QR code scanner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsMenu, styles.button2]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Weather Information</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0
    },
    inputsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsMenu: {
        height: 60,
        width:250,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius:10,
        borderColor: 'black',
        margin: 10
    },
    fullWidthButtonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        fontFamily: 'Architects Daughter Regular',
        bottom: 0,
        left: 0
    },
    button1: {
        marginLeft: 150,
    },
    button2: {
        marginRight: 150,
    }

});

export default SecondMenu
