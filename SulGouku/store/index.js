import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  gameBoard: [],
  initialBoard: [],
  loading: false,
  status: 'unsolved',
  name: '',
  difficulty: ''
}

function reducer(state=initialState, action) {
  const {type,payload} = action
  switch (type) {
    case 'BOARD/SETGAMEBOARD':
      return {...state, gameBoard: payload}      
    case 'BOARD/SETINITIALBOARD':
      return {...state, initialBoard: payload}
    case 'LOADING/SETLOADING':
      return {...state, loading: payload}
    case 'STATUS/SETSTATUS':
      return {...state, status: payload}
    case 'NAME/SETNAME':
      return {...state, name: payload}
    case 'DIFFICULTY/SETDIFFICULTY':
      return {...state, difficulty: payload}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))


export default store