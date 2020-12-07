import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Test ( {navigation} ) {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>eBAmazon</Text>
            

        </SafeAreaView>
    );

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