import React, { useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { AppButton } from "../misc/Button";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function Register () {  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();
    
    const bwidth = Dimensions.get('window').width/2;


    const submitForm = async () => {
        const newUser = { email, password, passwordCheck, displayName };
        try {  
            const response = await Axios.post("http://localhost:5000/users/register", newUser);
        } catch (error){
           alert(error.response.data.msg);
        }
        const loginRes = await Axios.post("http://localhost:5000/users/login",{email,password,});
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push('/test');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>eBAmazon</Text>
            <Text style={styles.subtitle}>Enter details to register</Text>
            <Text style={styles.subtitle2}>Password must be at least 5 characters long.</Text>
            <View>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter Display Name"
                    placeholderTextColor = "white"
                    selectionColor="white"
                    textAlign = "center"
                    onChangeText={(e) => setDisplayName(e)}/>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter Email"
                    placeholderTextColor = "white"
                    selectionColor="white"
                    textAlign = "center"
                    onChangeText={(e) => setEmail(e)}/>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter Password"
                    placeholderTextColor = "white"
                    selectionColor="white"
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)}/>
                <TextInput
                    style={styles.inputText}
                    placeholder="Confirm Password"
                    placeholderTextColor = "white"
                    textAlign = "center"
                    selectionColor="white"
                    secureTextEntry={true}
                    onChangeText={(e) => setPasswordCheck(e)}/>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => submitForm() }>
                    <Text style={{  color:'#5352ed', fontWeight: 'bold'}}>
                        {'Register'}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.spacer}> </Text>
            <AppButton 
                btnTitle='back to Login Screen'
                btnBgColor='transparent'
                textColor='white'
                btnPress={() => history.push('/login')}
                btnWidth={bwidth}/>
            
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
    spacer:{
        marginTop: 40
    },
    title: {
        marginTop: Dimensions.get('window').height/5.5,
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        marginTop: 30,
        marginBottom: 10,
        color: 'white',
        fontSize: 25,
        //fontWeight: 'bold'
    },
    subtitle2:{
        marginTop: 20,
        marginBottom: 10,
        color: 'white',
        fontSize: 15,
    },
    sub2title: {
        color: 'white',
        fontWeight: '200',
        position: 'absolute',
        bottom: 100
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
    }
  });