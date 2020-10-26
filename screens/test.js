import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default class Test extends Component {
    static navigationOptions = { header: null }
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>At the test Screen</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#575fcf',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
  });