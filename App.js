import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import AppNavigation from './src/navigation/index'
import { Provider } from 'react-redux';
import store from './src/store/configStore';

const App = ()=>{ 
  return (
    <Provider store = {store}>
      <View style = {{flex:1}}>
        <AppNavigation/>
      </View>
    </Provider>
  )
}
export default App;