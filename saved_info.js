import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import ReadMore from 'react-native-read-more-text';

const screenWidth = Dimensions.get('window').width;

const SavedInfo = () => {
    const [country, setCountry] = useState('');
    const [info, setInfo] = useState(null);

    const lookingForInfo = () => {
        fetch(`http://127.0.0.1:5000/safe_info/${country}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                setInfo(data)
            })
    }

    const clean = () => {
        setInfo(null)
        setCountry('')
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: 'grey', marginTop: 5 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: 'grey', marginTop: 5 }} onPress={handlePress}>
                Show less
            </Text>
        );
    }

    return (
        <View>
            <ImageBackground source={require('./image/passport.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
                {!info ?
                    (<View>
                        <View>
                            <TouchableOpacity style={styles.inputStyle}>
                                <TextInput style={styles.itemText} placeholder='Country' placeholderTextColor='#505050' onChangeText={setCountry}>
                                </TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: 270, borderRadius: 7, marginRight: 10 }} onPress={() => lookingForInfo()}>
                                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
                            </TouchableOpacity>
                        </View>
                    </View>) : (
                        <View>
                            <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <ScrollView style={{ width: screenWidth }}>
                                    <View>
                                        <Text style={styles.mainText}>{info.advisoryText}</Text>
                                        <Text>Food and water</Text>
                                        <ReadMore
                                            numberOfLines={1}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                        >
                                            <Text style={{ width: 400 }}>{info.health.diseasesAndVaccinesInfo["Food/Water"][0].description}</Text>
                                        </ReadMore>
                                        <Text>Climate</Text>
                                        <ReadMore
                                            numberOfLines={1}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                        >
                                            <Text>{info.climate.description}</Text>
                                        </ReadMore>
                                        <Text>Insects</Text>
                                        <ReadMore
                                            numberOfLines={1}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                        >
                                            <Text>{info.health.diseasesAndVaccinesInfo.Insects[0].description}</Text>
                                        </ReadMore>
                                        {info.lawAndCulture.lawAndCultureInfo[7] &&
                                            <View>
                                                <Text>Climate</Text>
                                                <ReadMore
                                                    numberOfLines={1}
                                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                                    renderRevealedFooter={this._renderRevealedFooter}
                                                >
                                                    <Text>{info.lawAndCulture.lawAndCultureInfo[7].description}</Text>
                                                </ReadMore>
                                            </View>}
                                        {info.lawAndCulture.lawAndCultureInfo[6] &&
                                            <View>
                                                <Text>Public transport</Text>
                                                <ReadMore
                                                    numberOfLines={1}
                                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                                    renderRevealedFooter={this._renderRevealedFooter}
                                                >
                                                    <Text>{info.lawAndCulture.lawAndCultureInfo[6].description}</Text>
                                                </ReadMore>
                                            </View>}
                                        {info.lawAndCulture.lawAndCultureInfo[3] &&
                                            <View>
                                                <Text>Identification</Text>
                                                <ReadMore
                                                    numberOfLines={1}
                                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                                    renderRevealedFooter={this._renderRevealedFooter}
                                                >
                                                    <Text>{info.lawAndCulture.lawAndCultureInfo[3].description}</Text>
                                                </ReadMore>
                                            </View>}
                                        <Text>Medical Care</Text>
                                        <ReadMore
                                            numberOfLines={1}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                        >
                                            <Text>{info.health.healthInfo[0].description}</Text>
                                        </ReadMore>
                                        <Text>Vaccination</Text>
                                        <ReadMore
                                            numberOfLines={1}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                        >
                                            <Text>Routine vaccination: {info.health.diseasesAndVaccinesInfo.Vaccines[0].description}</Text>
                                            <Text>Vaccines to consider: {info.health.diseasesAndVaccinesInfo.Vaccines[1].description}</Text>
                                        </ReadMore>
                                    </View>
                                    <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 270, borderRadius: 7, marginRight: 10 }} onPress={() => clean()}>
                                    <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                                </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    )}
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
        borderColor: '#B7BDC6',
        borderWidth: 2,
        width: 350,
        marginBottom: 15,
        borderRadius: 10,
        marginTop: 80,
        margin: 20,
        borderColor: "#505050"
    },
    itemText: {
        fontSize: 15,
        padding: 8,
        margin: 2,
        fontFamily: 'Architects Daughter Regular',
        textAlign: 'center'
    },

});

export default SavedInfo
