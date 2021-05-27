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
            <Text style={{ color: '#3D6DCC', marginTop: 5, fontFamily: 'Architects Daughter Regular' }} onPress={handlePress}>
                Read more...
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#3D6DCC', marginTop: 5, fontFamily: 'Architects Daughter Regular' }} onPress={handlePress}>
                ...Show less
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
                                        <Text style={styles.mainTextTop}>{info.advisoryText}</Text>
                                        <Text style={styles.mainText}>Food and water</Text>
                                        <View style={styles.description}>
                                            <ReadMore
                                                numberOfLines={2}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <Text style={styles.insideText}>{info.health.diseasesAndVaccinesInfo["Food/Water"][0].description}</Text>
                                            </ReadMore>
                                        </View>
                                        <Text style={styles.mainText}>Climate</Text>
                                        <View style={styles.description}>
                                            <ReadMore
                                                numberOfLines={2}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <Text style={styles.insideText}>{info.climate.description}</Text>
                                            </ReadMore>
                                        </View>
                                        <Text style={styles.mainText}>Insects</Text>
                                        <View style={styles.description}>
                                            <ReadMore
                                                numberOfLines={2}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <Text style={styles.insideText}>{info.health.diseasesAndVaccinesInfo.Insects[0].description}</Text>
                                            </ReadMore>
                                        </View>
                                        {info.lawAndCulture.lawAndCultureInfo[7] &&
                                            <View>
                                                <Text style={styles.mainText}>Currency Information</Text>
                                                <View style={styles.description}>
                                                    <ReadMore
                                                        numberOfLines={2}
                                                        renderTruncatedFooter={this._renderTruncatedFooter}
                                                        renderRevealedFooter={this._renderRevealedFooter}
                                                    >
                                                        <Text style={styles.insideText}>{info.lawAndCulture.lawAndCultureInfo[7].description}</Text>
                                                    </ReadMore>
                                                </View>
                                            </View>}
                                        {info.lawAndCulture.lawAndCultureInfo[6] &&
                                            <View>
                                                <Text style={styles.mainText}>Public transport</Text>
                                                <View style={styles.description}>
                                                    <ReadMore
                                                        numberOfLines={2}
                                                        renderTruncatedFooter={this._renderTruncatedFooter}
                                                        renderRevealedFooter={this._renderRevealedFooter}
                                                    >
                                                        <Text style={styles.insideText}>{info.lawAndCulture.lawAndCultureInfo[6].description}</Text>
                                                    </ReadMore>
                                                </View>
                                            </View>}
                                        {info.lawAndCulture.lawAndCultureInfo[3] &&
                                            <View>
                                                <Text style={styles.mainText}>Identification</Text>
                                                <View style={styles.description}>
                                                    <ReadMore
                                                        numberOfLines={2}
                                                        renderTruncatedFooter={this._renderTruncatedFooter}
                                                        renderRevealedFooter={this._renderRevealedFooter}
                                                    >
                                                        <Text style={styles.insideText}>{info.lawAndCulture.lawAndCultureInfo[3].description}</Text>
                                                    </ReadMore>
                                                </View>
                                            </View>}
                                        <Text style={styles.mainText}>Medical Care</Text>
                                        <View style={styles.description}>
                                            <ReadMore
                                                numberOfLines={2}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <Text style={styles.insideText}>{info.health.healthInfo[0].description}</Text>
                                            </ReadMore>
                                        </View>
                                        <Text style={styles.mainText}>Vaccination</Text>
                                        <View style={styles.description}>
                                            <ReadMore
                                                numberOfLines={2}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <Text style={styles.insideText}>Routine vaccination: {info.health.diseasesAndVaccinesInfo.Vaccines[0].description} {"\n"}</Text>
                                                <Text style={styles.insideText}>Vaccines to consider: {info.health.diseasesAndVaccinesInfo.Vaccines[1].description}</Text>
                                            </ReadMore>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 270, borderRadius: 7, marginRight: 10, alignItems: 'center' }} onPress={() => clean()}>
                                            <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                                        </TouchableOpacity>
                                    </View>
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
    mainTextTop: {
        fontSize: 30,
        padding: 8,
        margin: 2,
        fontFamily: 'Architects Daughter Regular',
        textAlign: 'center',
        color: '#3D6DCC'
    },
    itemText: {
        fontSize: 15,
        padding: 8,
        margin: 2,
        fontFamily: 'Architects Daughter Regular',
        textAlign: 'center',
    },
    mainText: {
        fontFamily: 'Architects Daughter Regular',
        textAlign: 'center',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    insideText: {
        fontFamily: 'Architects Daughter Regular',
        textAlign: 'center',
        fontSize: 15,
    },
    description: {
        backgroundColor: 'rgba(270,270,270,0.7)',
        margin: 20,
        borderRadius: 10,
        padding: 10
    }
});

export default SavedInfo
