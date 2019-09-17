import axios from 'axios'
import router from '../router'

import { apiURL, DEBUG } from '../config'

const apiCall = axios.create({
  baseURL: apiURL,
})

apiCall.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

apiCall.interceptors.response.use(
  response => response,
  error => {
    if(DEBUG){
      console.log(error.response)
    }
    router.replace({
        name: 'error',
        params: {
          status: error.response.status,
          statusText: error.response.statusText,
        }
    })
    return error
    //return Promise.reject(error)
  }
)

export default apiCall