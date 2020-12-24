import apiUrl from '../apiConfig'
import axios from 'axios'

export const showBoardGlows = (user, boardId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/boards/' + boardId + '/glows/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const createGlows = (data, user, boardId) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/boards/' + boardId + '/glows/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: data
  })
}

export const showGlows = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/glows/' + id,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteGlows = (user, id) => {
  return axios({
    url: apiUrl + '/glows/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
