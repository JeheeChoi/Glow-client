import apiUrl from '../apiConfig'
import axios from 'axios'

export const createBoards = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/boards/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: data
  })
}

export const indexBoards = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/boards/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
