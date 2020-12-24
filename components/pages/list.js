import React, { useState, useContext, useEffect} from 'react';
import {  StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { AppButton } from "../misc/Button";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { ItemCard } from "../misc/ItemCard";



export default function List (){
    const history = useHistory();
    const bwidth = Dimensions.get('window').width/2;
    const { userData } = useContext(UserContext);
    const [items, setItems] = useState(null);
    const getItems = async () => {
        const items = await Axios.get("http://localhost:5000/items/");
        setItems(items.data.items);
    }
    getItems();
    return (
        <SafeAreaView style={styles.container}>
            <View className="items" style={styles.items}>
                {items &&
                    Object.values(items).map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <ItemCard
                                    cardId={item.id}
                                    sellPrice={item.sellPrice}
                                    info={userData}
                                    condition={item.condition}
                                    name={item.name}
                                    />
                            </div>
                    );
                })}
            </View>
            <View>
                <AppButton
                    btnTitle='Back to Home'
                    btnBgColor='transparent'
                    textColor='white'
                    btnPress={() => history.push('/')}
                    btnWidth={bwidth}/>
            </View>
            <Text style={styles.sub2title}>Carbone App 2020</Text>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4297A0',
        alignItems: 'center',
    },
    title: {
        marginTop: Dimensions.get('window').height/4.5,
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white',
        fontWeight: '200' 
    },
    sub2title: {
        color: 'white',
        fontWeight: '200',
        position: 'absolute',
        bottom: 100
    },
    items: {
        justifyContent: 'center',
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width/1.5
    },
  });
  