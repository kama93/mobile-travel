import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({

});

const MenuButton = () => {

    const navigation = useRef(useNavigation());

    return (
        <View>
            <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => navigation.current.navigate('SecondMenu')}>
                <Text>
                    <Icon name="bars" size={30} color="white" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};


export default MenuButton;
