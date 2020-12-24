import React from 'react';
import {Text, View, StyleSheet, Dimensions, Font} from 'react-native';

var cardWidth = Dimensions.get('window').width / 10;


export const ItemDisplay = ({Price,condition, name}) => (
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.text}>Name: {name}</Text>
            <Text style={styles.text}>Condition: {condition}</Text>
            <Text style={styles.text}>Price: ${Price.toFixed(2)}</Text>
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
    text: {
        color: '#2F5061',
        flexWrap: "wrap",
        fontFamily: 'Trebuchet MS, sans-serif',
        fontSize: 20,
    }
});