import React, {useEffect} from 'react'
import { View, StyleSheet, Dimensions,Text, Button, ActivityIndicator } from 'react-native'
import Row from '../components/Row'
import {fetchBoard, fetchSolver, fetchNewBoard, fetchValidate, changeStatus, setGameBoard} from '../store/action'
import {useDispatch,useSelector} from 'react-redux'

export default function Board(props) {
  const {navigation,route} = props
  const {name,diff} = route.params
  const dispatch = useDispatch()
  const gameBoard = useSelector(state => state.gameBoard)
  const initialBoard = useSelector(state => state.initialBoard)
  const loading = useSelector(state => state.loading)
  const difficulty = useSelector(state => state.difficulty)

  
  useEffect(()=>{
    dispatch(fetchBoard(diff))
  },[dispatch, diff])

    function solver() {
      const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
      const dataInput = {board:initialBoard.map(row=> [...row])}
      const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

      dispatch(fetchSolver(encodeParams(dataInput)))
    }
      
    function validate() {
      const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
      const dataInput = {board:gameBoard.map(row=> [...row])}
      const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

      dispatch(fetchValidate(encodeParams(dataInput),navigation,name))
    }

    function newBoard() {
      dispatch(setGameBoard([]))
      const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
      const dataInput = {board:initialBoard.map(row=> [...row])}
      const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

      dispatch(fetchNewBoard(encodeParams(dataInput)))
    }

    function changeData(i,j,num) {
      const temp = gameBoard.map(row=> [...row])
      temp[i][j] = +num
      dispatch(setGameBoard(temp))

      const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
      const dataInput = {board:temp.map(row=> [...row])}
      const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');
      
      dispatch(changeStatus(encodeParams(dataInput)))
    
    }


    if (loading) {
      return(
        <View style={[{justifyContent: 'center', alignItems: 'center', flex:1}]}>
          <ActivityIndicator size="large" color='#00A8E8' />
        </View>
      )
    }
  return(
    <View style={{backgroundColor: '#60594D', flex:1}}>
      
      <View style={style.board}>
        {
          gameBoard ? 
          gameBoard.map((el,i) => <Row data={el} row={i} key={i} changeData={changeData} initialRow={initialBoard[i]} />):
          <Text>loading</Text>
        }
      </View>
      <View style={{backgroundColor: 'grey', padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize:15}}>
          Name: {name}
        </Text>
        <Text style={{fontSize:15}}>
          Your difficulty: {difficulty}
        </Text>
      </View>
      <View style={[style.btn]}>
        <View style={{marginRight: 10}}>
          <Button
            title="Submit"
            onPress={()=> validate()}
            />
        </View>
        <View>
          <Button
            title="Solve"
            onPress={()=> solver()}
            />
        </View>
      </View>
      <View style={style.btn}>
        <Button
          title="New Board"
          onPress={()=> newBoard()}
          />
      </View>
     
    </View>
  )
}
const style = StyleSheet.create({
  board:{
    borderWidth: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 60/100,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#23395B',
    borderColor: '#161925'
  },

  btn:{
    paddingTop: 20,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})