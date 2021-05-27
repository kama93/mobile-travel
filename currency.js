import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Currency = () => {

    return (
        <View>
            <ImageBackground source={require('./image/money.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
                
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
});

export default Currency
