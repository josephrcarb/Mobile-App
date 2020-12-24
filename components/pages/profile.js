import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AppButton } from "../misc/Button";
import { ItemDisplay } from "../misc/ItemDisplay";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Profile (){
    const history = useHistory();
    const bwidth = Dimensions.get('window').width/2;
    const { userData } = useContext(UserContext);
    const [boughtItems, setBoughtItems] = useState(null);
    const [soldItems, setSoldItems] = useState(null);
    const [name, setName] = useState();
    const [spent, setSpent] = useState(0);
    const [earned, setEarned] = useState(0);


    const isLog = () => {
        if(!userData.user){
            history.push('/login')
            return false;
        }
        else{
            if(userData.user)
                if(userData.user.amountBought == undefined)setSpent(0);
                else setSpent(userData.user.amountBought);
                if(userData.user.amountSold == undefined)setEarned(0);
                else setEarned(userData.user.amountSold);
                setName(userData.user.displayName);
        }
        return true;
    }
    const getSold = async () => {
        setSoldItems(null);
        var userId = null;
        if(userData){
            if(userData.user)
                userId = userData.user.id;
        }
        try{
            const solditems = await Axios.get("http://localhost:5000/items/sold", 
                {
                    params: {
                        id: userId
                    }
                });
            if(JSON.stringify(solditems.data.items) != '{}'){
                setSoldItems(solditems.data.items);
            }
        }catch(error){
            console.log(error.response.data.error);
        }
    }
    const getBought = async () => {
        setBoughtItems(null);
        var userId = null;
        if(userData){
            if(userData.user)
                userId = userData.user.id;
        }
        try{
            const boughtitems = await Axios.get("http://localhost:5000/items/bought", 
            {
                params: {
                    id: userId
                }
            });
            if( JSON.stringify(boughtitems.data.items) != '{}'){
                setBoughtItems(boughtitems.data.items);
            }
        }catch(error){
            console.log(error.response.data.error);
        }
    }

    useEffect(() => {
        if(isLog()){
            getSold();
            getBought();
        }
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome "{name}"!</Text>
            <View style={styles.money}>
                <Text style={styles.moneyText}>Total Spent: ${spent.toFixed(2)}</Text>
                <Text style={styles.moneyText}>Total Sellings: ${earned.toFixed(2)}</Text>
            </View>
            <View style={styles.soldContainer}>
                <Text style={styles.title}>Sold Items</Text>
                <View className="soldItems" style={styles.soldItems}>
                    {soldItems &&
                    Object.values(soldItems).map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <View style={styles.itemContainer}>
                                    <View style={styles.attributeContainer}>
                                        <Text style={styles.attributeTitle}>Name:</Text>
                                        <Text style={styles.attribute}>   {item.name}</Text>
                                    </View>
                                    <View style={styles.attributeContainer}>
                                        <Text style={styles.attributeTitle}>Condition:</Text>
                                        <Text style={styles.attribute}>   {item.condition}</Text>
                                    </View>
                                    <View style={styles.attributeContainer}>
                                        <Text style={styles.attributeTitle}>Sell Price:</Text>
                                        <Text style={styles.attribute}>   ${item.boughtPrice.toFixed(2)}</Text>
                                    </View>
                                </View>
                            </div>
                    );
                })}
                </View>
            </View>
        
            <View style={styles.soldContainer}>
                <Text style={styles.title}>Bought Items</Text>
                <View className="boughtItems" style={styles.boughtItems}>
                    {boughtItems &&
                    Object.values(boughtItems).map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <View style={styles.itemContainer}>
                                    <View style={styles.attributeContainer}>
                                        <Text style={styles.attributeTitle}>Name:</Text>
                                        <Text style={styles.attribute}>   {item.name}</Text>
                                    </View>
                                    <View style={styles.attributeContainer}>
                                        <Text style={styles.attributeTitle}>Condition:</Text>
                                        <Text style={styles.attribute}>   {item.condition}</Text>
                                    </View>
                                    <View style={styles.attributeContainer}>
                                        <Text style={styles.attributeTitle}>Bought Price:</Text>
                                        <Text style={styles.attribute}>   ${item.sellPrice.toFixed(2)}</Text>
                                    </View>
                                </View>
                            </div>
                    );
                })}
                </View>
            </View>
            
            <View style={styles.ender}>
                <AppButton
                    btnTitle='Back to Home'
                    btnBgColor='transparent'
                    textColor='white'
                    btnPress={() => history.push('/')}
                    btnWidth={bwidth}/>
                <Text style={styles.sub2title}>Carbone App 2020</Text>
            </View>
            
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4297A0',
        alignItems: 'center',

    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    sub2title: {
        color: 'white',
        fontWeight: '200',
    },
    ender: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 15
    },
    money: {
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    moneyText: {
        color: 'gold',
        fontWeight: '100',
        padding:20,
        fontSize:50,
        fontWeight: 'bold'
    },
    soldContainer: {
        width: Dimensions.get('window').width/1.5
    },
    itemContainer: {
        backgroundColor: '#F4EAE6',
        padding: 10,
        width: Dimensions.get('window').width/1.5,
        height: 50,
        flexDirection: 'row'
    },
    attributeContainer: {
        width: '33%',
        flexDirection: 'row'
    },
    attributeTitle:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    attribute: {
        fontSize: 25,
    }
  });
  