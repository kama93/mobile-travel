import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width;

const SavedInfo = () => {


    return (
        <View>
            <ImageBackground source={require('./image/menu.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
                
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    

});

export default SavedInfo
