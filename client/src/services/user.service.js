import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http:localhost:3001/api/v1/'

const UserService = {
  getUserDash() {
    return axios.get(API_URL + 'user/dash', { header: authHeader() })
  }
}

export default UserService