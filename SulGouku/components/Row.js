import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RowData from './RowData'

export default function Row(props) {
  const {data, row, changeData, initialRow} = props
  return(
    <View style={[style.row,{borderBottomWidth: row%3===2 && row !==0?3:0, borderColor:'#9E2B25', borderTopWidth: row===0?3:0, borderLeftWidth:3, borderRightWidth:3}]}>
        {
          data ?
          data.map((el,j)=> <RowData num={el} col={j} row={row} key={j} changeData={changeData} initialCol={initialRow[j]} />) :
          <Text>Loading</Text>
        }
    </View>
  )
}

const style = StyleSheet.create({
  row:{
    flex:1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#FBB13C'
  }
})