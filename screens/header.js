import React, { useContext } from 'react';
import { StyleSheet,Text, SafeAreaView } from 'react-native';
import UserContext from "../context/UserContext";

export default function Header(){

    const { userData, setUserData } = useContext(UserContext);
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>eBAmazon</Text>
            {userData.user ? (<button onClick={logout}>Log out</button>) : (<button> No User </button>)}
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        border: '2px solid',
        backgroundColor: '#575fcf',
        borderBottomColor: 'white',
    },
    title: {
        paddingTop: 15,paddingBottom: 15, paddingLeft: 15,
        color:'white',
        fontSize: 35,
        fontWeight: 'bold'
    }
  });