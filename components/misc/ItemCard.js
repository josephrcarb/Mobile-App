import React from 'react';
import {Text, View, StyleSheet, Dimensions, Font} from 'react-native';
import {CardButton} from './CardButton';
import Axios from 'axios';

var cardWidth = Dimensions.get('window').width / 8;

const buyItems = async ( productId, userData ) => {
    var userId = null;
    if(userData){
        userId = userData.user.id;
    }
    const newInfo = { productId, userId };
    try{
        const response = await Axios.post("http://localhost:5000/items/buy", newInfo);

    }catch(error){
        alert(error.response.data.msg);
    }
}

export const ItemCard = ({cardId, sellPrice, info, condition, name}) => (
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.text}>Name: {name}</Text>
            <Text style={styles.text}>Condition: {condition}</Text>
            <Text style={styles.text}>Price: ${sellPrice}</Text>

        </View>
        <View style={styles.buttonBody}>
            <CardButton 
                btnTitle='Buy'
                btnBgColor = '#4297A0'
                textColor = 'white'
                btnPress={(() => buyItems(cardId, info))}
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