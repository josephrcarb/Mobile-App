import React, { useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { AppButton } from "../misc/Button";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import '../misc/popup.css';

export default function Sell (){
    const history = useHistory();
    const [showPopup, setPopup] = useState(false);
    const { userData } = useContext(UserContext);
    const [displayFile, setDisplay] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState(0);
    const [condition, setCondition] = useState();

    const bwidth = Dimensions.get('window').width/2;
    const submitForm = async () => {
        var userId = null;
        if(userData){
            if(userData.user)
                userId = userData.user.id;
        }
        const newPurchase = { price, userId, name, condition };
        try {  
            const response = await Axios.post("http://localhost:5000/items/list", newPurchase);
        
            setPopup(false);
            history.push('/profile')
        } catch (error){
           alert(error.response.data.msg);
        }       
    };
    const getPrice = () => {
        const tempPrice = Math.floor(Math.random() * 45) + 5;
        setPrice(tempPrice);
        setPopup(true)
    }
    const fileSetup = (f) => {
        var display = URL.createObjectURL(f);
        setDisplay(display);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View className="selling" style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.directions}>
                        Please, upload a photo of the item.
                    </Text>
                    <View style={styles.upload}>
                        <img src={displayFile} height={200} width={200} />
                        <input type = 'file' onChange={(e) => fileSetup(e.target.files[0])}/>
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter Name of the Product"
                        placeholderTextColor = "white"
                        selectionColor="white"
                        onChangeText={(e) => setName(e)}/>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter Condition of Product"
                        placeholderTextColor = "white"
                        selectionColor="white"
                        onChangeText={(e) => setCondition(e)}/>
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress={() => getPrice() }>
                        <Text style={{  color:'#5352ed', fontWeight: 'bold'}}>
                            {'Sell my Item'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    showPopup ?
                    (<div className='popup'>
                        <View style={styles.popup}>
                            <Text style={styles.pTitle}>
                                Are you sure you want to sell this item?
                            </Text>
                            <Text style={styles.pTitle}>
                                We can buy this item for ${price}.00
                            </Text>
                            <TouchableOpacity 
                                style = {styles.button}
                                onPress={() => submitForm() }>
                                <Text style={{  color:'#5352ed', fontWeight: 'bold'}}>
                                    {'Yes, sell my item for this price.'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style = {styles.button}
                                onPress={() => setPopup(false) }>
                                <Text style={{  color:'#5352ed', fontWeight: 'bold'}}>
                                    {'No, thanks.'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </div>)
                    : null
                }
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
        marginBottom: 250,
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
    directions: { 
        color: 'white',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        paddingBottom: 50,
    },
    button: { 
        backgroundColor: '#7bed9f', 
        borderRadius:10,
        borderWidth: 2,
        borderColor: 'white',
        height:40, 
        width: Dimensions.get('window').width/2,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        fontWeight: 'bold',
        backgroundColor: "transparent",
        textAlign: 'center',
        borderRadius:10,
        borderWidth: 2,
        borderColor: 'white',
        height:40, 
        color: 'white',
        width: Dimensions.get('window').width/2,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upload: {
        backgroundColor: 'white',
        borderWidth: 2,
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });
  