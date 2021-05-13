import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/actions-user';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({

});

const HederIconLogin = ({ currentUser, setCurrentUser }) => {

    const navigation = useRef(useNavigation());

    const logOut = () => {
        setCurrentUser(null)
    }

    return (
        <View>
            {!currentUser ?
                (<TouchableOpacity
                    style={{ marginRight: 25 }}
                    onPress={() => navigation.current.navigate('LogIn')}>
                    <Text>
                        <Icon name="user" size={30} color="white" />
                    </Text>
                </TouchableOpacity>) :
                (<TouchableOpacity style={{ marginRight: 20 }} onPress={() => logOut()}>
                    <Text style={{ color: "white", fontFamily: 'Architects Daughter Regular' }}>Log Out</Text>
                </TouchableOpacity>)}
        </View>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HederIconLogin);
