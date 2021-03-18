import { StyleSheet, Text, View, Dimensions, TextInput, Button, Alert } from "react-native";
import React, { useEffect } from 'react'
import RadioForm from 'react-native-simple-radio-button';
import { useDispatch, useSelector } from "react-redux";

import {setName, setDifficulty} from '../store/action'



export default function Home(props) {
  const {navigation} = props
  const name = useSelector(state => state.name)
  const difficulty = useSelector(state => state.difficulty)
  const dispatch = useDispatch()

  const radio =[
    {label:'easy',value:'easy'},
    {label:'medium',value:'medium'},
    {label:'hard',value:'hard'},
    {label:'random',value:'random'},
  ]

  function changeDifficulty(value) {
    dispatch(setDifficulty(value))
  }

  function changeName(text) {
    dispatch(setName(text))
  }

  function moveToGame() {
    if (!name || !difficulty) {
      Alert.alert('Validation','Please input your name and select difficulty')
    } else if ( name ) {
      navigation.navigate('Game',{name,diff:difficulty})
    }
  }


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50, paddingTop: 50}}>Homepage</Text>
      <View style={{ width: Dimensions.get('window').width, flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#78CDD7'}}>Enter your Name</Text>
        <View style={{ width: 200, marginTop: 20}}>
          <TextInput
            keyboardType='default'
            onChangeText={(text)=>changeName(text)}
            style={{marginBottom:20, fontSize: 22, color: '#78CDD7'}}
            placeholder="Input your name"
            underlineColorAndroid= 'grey'
            value={name}
          />
          <Button
            title="Enter the game"
            onPress={()=> moveToGame()}
          />
        </View>
        <View style={{marginTop: 40}}>
          <RadioForm
            radio_props={radio}
            initial={0}
            onPress={(value) => changeDifficulty(value)}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor='white'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: 'grey',
  }
})