import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexGlows = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/glows/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// export const createGlows = (data, user) => {
//   return axios({
//     method: 'POST',
//     url: apiUrl + '/glows/',
//     headers: {
//       'Authorization': `Token ${user.token}`
//     },
//     data: data
//   })
// }
