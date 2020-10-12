import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';

// Object of Screens Avaliable
const screens = {
    HomeScreen: {
        screen: HomeScreen
    },
    LoginScreen: {
        screen: LoginScreen
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);