import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function RowData(props) {
  const {num, col, changeData,row ,initialCol}  = props
  const status = useSelector(state => state.status)
  function handleOnChange(num) {
    changeData(row,col,num)
  }
  return (
    <View style={[style.col, {borderRightWidth: col % 3 === 2 && col !== 8 ? 3 : 0,borderRightColor:'#9E2B25', borderWidth:0.5}]}>
      {
        initialCol === num && num !== 0 ?
        <Text style={{color: '#0B032D', fontWeight: 'bold', fontSize: 15}}>{num}</Text> : 
          <TextInput
          underlineColorAndroid='#23395B'
          maxLength={1}
          onChange={(e)=> handleOnChange(e.nativeEvent.text)}
          keyboardType='numeric'
          editable={true}
          value={num !== 0?String(num):null}
          style={{textAlign: 'center', color: status === 'unsolved'?'#59C9A5': 'red', fontWeight: 'bold', fontSize:25}}
          />
      }
    </View>
  )
}

const style = StyleSheet.create({
  col:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    height:50,
  }
})