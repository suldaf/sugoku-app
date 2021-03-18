import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'

import Game from './views/Game'
import Home from './views/Home'
import Finish from './views/Finish'
import store from './store/index'


const Stack = createStackNavigator()

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{title: 'Main menu',headerStyle:{backgroundColor:'#DAD2D8'}, headerTitleAlign: 'center'}} />
          <Stack.Screen name="Game" component={Game} options={{title: 'Sudoku',headerStyle:{backgroundColor:'#DAD2D8'}, headerTitleAlign: 'center'}}/>
          <Stack.Screen name='Finish' component={Finish} options={{title: 'Winner',headerStyle:{backgroundColor:'#DAD2D8'}, headerTitleAlign: 'center'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'grey',
  },
});
