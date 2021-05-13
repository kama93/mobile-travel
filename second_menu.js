import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width;

const SecondMenu = () => {


    return (
        <View>
            <ImageBackground source={require('./image/menu.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
                <View style={styles.inputsContainer}>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Safety Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Currency exchange</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Saved Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Liked attractions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Calendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Thinks to pack</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Cost estimate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>Movit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
                        <Text style={styles.fullWidthButtonText}>QR code scanner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
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
    },
    fullWidthButton: {
        height: 79,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey'
    },
    fullWidthButtonText: {
        fontWeight: 'bold',
        color: '#383838',
        fontSize: 25,
        fontFamily: 'Architects Daughter Regular',
        bottom: 0,
        left: 0
    }

});

export default SecondMenu
