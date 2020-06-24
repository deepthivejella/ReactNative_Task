import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../components/menuScreen';

import Cart from '../components/cart';
const AppStack = createStackNavigator();


const AppStackMyCartScreenOptions = {
    headerStyle:{
        backgroundColor:'#001a33',
        

    },
    headerTintColor:'#ffffff',
    headerTitleStyle:{
        fontSize:20
    
    }

}
const AppNavigation = ()=>{
    return (
    <NavigationContainer>

        <AppStack.Navigator>
           
            <AppStack.Screen options={{headerShown: false}} name = "Menu" component = {MenuScreen}/>
            <AppStack.Screen options = {AppStackMyCartScreenOptions} name = "Cart" component = {Cart}/>
            {/* <AppStack.Screen options = {AppStackMyCartScreenOptions} name = "My Cart" component = {MyCart}/> */}
        
        </AppStack.Navigator>
     
    </NavigationContainer>
 )
}

export default AppNavigation;