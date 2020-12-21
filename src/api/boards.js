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

export const showBoards = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/boards/' + id,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteBoards = (user, id) => {
  return axios({
    url: apiUrl + '/boards/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
