import React, { useContext } from 'react';
import { StyleSheet,Text, SafeAreaView, View, Dimensions } from 'react-native';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import {AppButton} from "../misc/Button";

export default function Header(){

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push('/login');
    }
    const bwidth = Dimensions.get('window').width/7;
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>eBAmazon</Text>
            </View>
            <View style={styles.page}>
                <AppButton
                    btnTitle='Buy'
                    btnBgColor='#7bed9f'
                    textColor='#5352ed'
                    btnPress={() => history.push('/buy')}
                    btnWidth={bwidth}/>
                
                <AppButton
                    btnTitle='Sell'
                    btnBgColor='#7bed9f'
                    textColor='#5352ed'
                    btnPress={() => history.push('/sell')}
                    btnWidth={bwidth}/>
            </View>
            <View style={styles.logout}>
                {userData.user ? 
                (<View style={styles.page}>
                    <AppButton
                        btnTitle='Logout'
                        btnBgColor='#7bed9f'
                        textColor='#5352ed'
                        btnPress={() => logout()}
                        btnWidth={100}/>
                    <AppButton
                        btnTitle='Profile'
                        btnBgColor='#7bed9f'
                        textColor='#5352ed'
                        btnPress={() => history.push('/profile')}
                        btnWidth={100}/>
                </View>) : 
                (<AppButton
                    btnTitle='Login'
                    btnBgColor='#7bed9f'
                    textColor='#5352ed'
                    btnPress={() => history.push('/login')}
                    btnWidth={100}/>)}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        flexDirection: 'row',
        border: '2px solid',
        backgroundColor: '#4297A0',
        borderBottomColor: 'white',
        justifyContent: 'space-between',
        width:'100%'
    },
    title: {
        paddingLeft: 15,
        color:'white',
        fontSize: 35,
        fontWeight: 'bold',
        justifyContent: 'left',

    },
    page: {
        flexDirection: 'row',
        paddingRight: 15,

    },
    logout: {
        paddingRight: 15,
    },
  });