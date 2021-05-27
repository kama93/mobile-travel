import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const screenWidth = Dimensions.get('window').width;

const Currency = () => {
    const [fromCurrency, setFromCurrency] = useState('')
    const [from, setFrom] = useState('')
    const [toCurrency, setToCurrency] = useState('')
    const [to, setTo] = useState('')


    const lookingForCurrencyFrom = () => {

    }

    const lookingForCurrencyTo = () => {

    }

    return (
        <View>
            <ImageBackground source={require('./image/money.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.1 }}>
                <View style={styles.inputBackground}>
                    <View>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.inputStyle}
                            style={styles.inputAutocomplete}
                            listStyle={styles.listStyle}
                            data={fromCurrency}
                            onChangeText={text => lookingForCurrencyFrom(text)}
                            placeholder="From (currency)"
                        // renderItem={({ item, i }) => (
                        //     <TouchableOpacity onPress={() => setFrom()}>
                        //         <Text style={styles.itemText}>

                        //         </Text>
                        //     </TouchableOpacity>
                        // )}
                        />
                    </View>
                    <View>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.inputStyle}
                            style={styles.inputAutocomplete}
                            listStyle={styles.listStyle}
                            data={toCurrency}
                            onChangeText={text => lookingForCurrencyTo(text)}
                            placeholder="To (currency)"
                        // renderItem={({ item, i }) => (
                        //     <TouchableOpacity onPress={() => setFrom()}>
                        //         <Text style={styles.itemText}>

                        //         </Text>
                        //     </TouchableOpacity>
                        // )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderRadius: 7, marginRight: 10 }} onPress={() => lookingForFlight()}>
                            <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderRadius: 7 }} onPress={() => clean()}>
                            <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                        </TouchableOpacity>
                    </View>
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
    inputStyle: {
        height: 50,
        borderColor: 'black',
        borderWidth: 0,
        width: 350,
        marginBottom: 15,
        borderRadius: 10,
    },
    inputAutocomplete: {
        fontFamily: 'Architects Daughter Regular',
        fontSize: 20,
        padding: 10,
    },
    itemText: {
        fontSize: 15,
        padding: 8,
        margin: 2,
        fontFamily: 'Architects Daughter Regular',
    },
    inputBackground: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        margin: 30,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'grey',
        shadowOpacity: 1.0,
        marginTop: 100
    },
});

export default Currency
