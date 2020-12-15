import React from 'react';
import {Text, View, StyleSheet, Dimensions, Font} from 'react-native';
import {CardButton} from './CardButton';
var cardWidth = Dimensions.get('window').width / 8;
export const ItemCard = ({cardId, sellPrice}) => (
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.text}>ID:{cardId}</Text>
            <Text style={styles.text}>${sellPrice}.00</Text>
        </View>
        <View style={styles.buttonBody}>
            <CardButton 
                btnTitle='Buy'
                btnBgColor = '#4297A0'
                textColor = 'white'
                btnPress={(() => null)}
                btnWidth={cardWidth - 10}/>
        </View>
    </View>
)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4EAE6',
        borderWidth: 2,
        width: cardWidth,
        height: cardWidth,
        margin: 1,
    },
    body: {
        alignItems: 'center',
        width: cardWidth - 2,
        height: cardWidth - 52,
        justifyContent: 'space-between',
        padding: 10,
    },
    buttonBody: {
        alignItems: 'center',
        width: cardWidth - 2,
        height: 52,
        justifyContent: 'center',
    }, 
    text: {
        color: '#2F5061',
        fontFamily: 'Trebuchet MS, sans-serif',
        fontSize: 20,
    }
});