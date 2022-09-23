import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

class UserService {
  getAllUsers() {
    return axios.get(API_URL + '/all');
  }

  getUser(user) {
    return axios.post(API_URL + '/find', {
        username: user.username
    } ,{ headers: authHeader() });
  }

  updateUser(user) {
    return axios.put(API_URL + '/update', {
        username: user.username,
        email: user.email,
        password: user.password
    }, { headers: authHeader() });
  }

  deleteUser(user) {
    return axios.delete(API_URL + '/delete', {
        id: user.id
    }, { headers: authHeader() });
  }
}

export default new UserService();