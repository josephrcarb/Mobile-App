import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, Dimensions } from 'react-native';
import {AppButton} from "../components/Button";

export default class Register extends Component {
    static navigationOptions = { header: null }
    render(){
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>eBAmazon</Text>
                <Text style={styles.subtitle}>Enter details to register</Text>
                <View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter Email"
                        placeholderTextColor = "white"
                        selectionColor="white"
                        textAlign = "center"/>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter Password"
                        placeholderTextColor = "white"
                        selectionColor="white"
                        secureTextEntry={true}/>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Confirm Password"
                        placeholderTextColor = "white"
                        textAlign = "center"
                        selectionColor="white"
                        secureTextEntry={true}/>
                    <AppButton
                        btnTitle='Register'
                        btnBgColor='#7bed9f'
                        textColor='#5352ed'
                        btnPress={() => navigate('RegisterScreen')}/>
                </View>
                <Text style={styles.spacer}> </Text>
                <AppButton 
                    btnTitle='back to Login Screen'
                    btnBgColor='transparent'
                    textColor='white'
                    btnPress={() => navigate('LoginScreen')}/>
                
                <Text style={styles.sub2title}>Carbone App 2020</Text>
           </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#575fcf',
      alignItems: 'center',
    },
    spacer:{
        marginTop: 75
    },
    title: {
        marginTop: Dimensions.get('window').height/5.5,
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        marginTop: 30,
        marginBottom: Dimensions.get('window').height/5.5,
        color: 'white',
        fontSize: 25,
        //fontWeight: 'bold'
    },
    sub2title: {
        color: 'white',
        fontWeight: '200',
        position: 'absolute',
        bottom: 100
    },
    goLogin:{
        marginTop: 100
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
    }
  });