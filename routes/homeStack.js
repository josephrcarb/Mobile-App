import React from "react";
import {createAppContainer,
        createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/home';
import TestScreen from '../screens/test';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import Initializing from '../screens/initializing';
import {Linking} from "expo";

// Object of Screens Avaliable
const screens = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: "Home",
            headerShown: false
        },
        path: ''
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            headerTitle: "Login",
            headerShown: false
        },
        path: 'login'
    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: {
            headerTitle: "Register",
            headerShown: false
        },
        path: 'register'
    },
    TestScreen: {
        screen: TestScreen,
        navigationOptions: {
            headerTitle: "Test",
            headerShown: false
        },
        path: 'test'  
    },
});

const App = createSwitchNavigator({
    Initializing,
    screens: {
        screen: screens,
        path: ""
    }
});


const AppContainer = createAppContainer(App);

export default () => {
    const prefix = Linking.makeUrl("/");
    console.log(prefix);
    return <AppContainer uriPrefix={prefix} />;
}