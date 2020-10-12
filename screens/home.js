import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Dimensions } from 'react-native';
import {AppButton} from "../components/Button";

export default class Home extends Component {
    static navigationOptions = { header: null }
    render(){
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>eBAmazon</Text>
                
                <View>
                    <AppButton
                        btnTitle='Login'
                        btnBgColor='transparent'
                        textColor='white'
                        btnPress={() => navigate('LoginScreen')}/>
                </View>
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
    }
  });
  