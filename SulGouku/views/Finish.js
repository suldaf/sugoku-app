import { StyleSheet, Text, View, Dimensions, TextInput, Image, Button } from "react-native";
import React from 'react'
import { useDispatch } from "react-redux";

import {setName,setDifficulty} from '../store/action'


export default function Finish(props) {
  const {navigation,route} = props
  const {name} = route.params
  const dispatch = useDispatch()
  function goHome() {
    dispatch(setName(''))
    dispatch(setDifficulty(''))
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 32}}>You're the Winner!! 🤩</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.txt}>
          <Text style={{fontSize: 50}}>{name}</Text>
          <View style={{ flex:1, justifyContent:'flex-end'}}>
            <Text style={{marginBottom: 20, fontSize:20}}>Do you want to play again?</Text>
            <Button
              title= 'New Game'
              onPress={()=> goHome()}
            />
          </View>
        </View>
        <View style={styles.img}>
          <Image
            source={{uri: 'https://cdn0.iconfinder.com/data/icons/game-elements-3/64/trophy-reward-winner-conquer-achieve-beat-512.png'}}
            style={{height: 250, width:250}}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center'
  },

  header:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 20/100,
    alignItems: 'center',
    paddingTop: 20
  },
  
  body:{
    flex:1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // borderWidth: 3
  },

  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height *50/100,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  txt:{
    flex:1,
    alignItems: 'center',
  }
})