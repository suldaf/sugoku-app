import {Alert} from 'react-native'

export function setGameBoard(payload) {
  return {type: 'BOARD/SETGAMEBOARD', payload}
}

export function setInitialBoard(payload) {
  return {type: 'BOARD/SETINITIALBOARD', payload}
}

export function setLoading(payload) {
  return {type: 'LOADING/SETLOADING', payload}
}

export function setStatus(payload) {
  return {type: 'STATUS/SETSTATUS', payload}
}

export function setName(payload) {
  return {type: 'NAME/SETNAME', payload}
}

export function setDifficulty(payload) {
  return {type: 'DIFFICULTY/SETDIFFICULTY', payload}
}

export function fetchGrade(input) {
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const dataInput = {board: input.map(row=>[...row])}
  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
  return async (dispatch) =>{
    const res = await fetch('https://sugoku.herokuapp.com/grade', {
      method: 'POST',
      body: encodeParams(dataInput),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    const diff = await res.json()
    dispatch(setDifficulty(diff.difficulty))
  }

  }


export function fetchBoard(difficulty) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      const data = await res.json()
      const input = data.board
      await dispatch(fetchGrade(input))
      dispatch(setInitialBoard(input.map(row=> [...row])))
      dispatch(setGameBoard(input.map(row=> [...row])))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function fetchSolver(input) {
  return async (dispatch) =>{
    try {
      const res = await fetch('https://sugoku.herokuapp.com/solve', {
        method: 'POST',
        body: input,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const data = await res.json()
      dispatch(setGameBoard(data.solution.map(row=> [...row])))
      dispatch(setStatus('unsolved'))
    } catch (err) {
      console.log(err);
    }
  }
}

export function fetchValidate(input,navigation,name) {
  return async (dispatch) => {
    try {
      const res = await fetch('https://sugoku.herokuapp.com/validate', {
        method: 'POST',
        body: input,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const data = await res.json()
      if (data.status === 'unsolved') {
        Alert.alert('Info', "Your sudoku isn't finished yet")
        dispatch(setStatus(data.status))
      } else if (data.status === 'solved') {
        navigation.navigate('Finish',{name})
      } else if(data.status === 'broken'){
        Alert.alert('Warning', "Your input wrong")
        dispatch(setStatus(data.status))
      }
    } catch (err) {
      console.log(err);
    }
  }
  
}

export function fetchNewBoard(input) {
  return async (dispatch) =>{
    try {
      dispatch(setLoading(true))
      const res = await fetch('https://sugoku.herokuapp.com/grade', {
        method: 'POST',
        body: input,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const diff = await res.json()

      const res2 = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${diff.difficulty}`)
      const data = await res2.json()

      const output = data.board
      dispatch(setGameBoard(output.map(row=> [...row])))
      dispatch(setInitialBoard(output.map(row=> [...row])))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function changeStatus(input) {
  return async (dispatch) => {
    try {
      const res = await fetch('https://sugoku.herokuapp.com/validate', {
        method: 'POST',
        body: input,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const data = await res.json()
      if (data.status === 'unsolved') {
        dispatch(setStatus(data.status))
      } else if(data.status === 'broken'){
        dispatch(setStatus(data.status))
      }
    } catch (err) {
      console.log(err);
    }
  }
}