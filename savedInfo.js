import React from 'react';
import { StyleSheet, ImageBackground, Text, Dimensions, TextInput, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SaveInfo = () => {

  return (
    <View style={styles.container}>
        <ImageBackground source={require('./image/sticky.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
            <TouchableOpacity style={styles.textArea}>
            <TextInput
                multiline={true}
                numberOfLines={50}
                // onChangeText={(text) => this.setState({text})}
                // value={this.state.text}
                />
                <TouchableOpacity style={styles.buttonTextArea}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Add</Text>
            </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Add new note</Text>
            </TouchableOpacity>
        </ImageBackground>
    
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#3DCC6D', 
        width: '50%', 
        borderRadius: 7,
        marginTop: 20
    },
    textArea:{
        backgroundColor: 'white', 
        width: '70%', 
        borderRadius: 7,
        marginTop: 20,
        height: 200,
        padding: 10,
        justifyContent: 'center'
    },
    buttonTextArea:{
        backgroundColor: '#3DCC6D', 
        width: '30%',
        borderRadius: 7,
        marginTop: 100 
    }
});

export default SaveInfo