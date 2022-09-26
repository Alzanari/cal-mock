import api from './api';

// const API_URL = 'http://localhost:8080/api/users';

class UserService {
  getAllUsers() {
    return api.get('/users/all');
  }

  getUser(user) {
    return api.post('/users/find', {
        username: user.username
    });
  }

  updateUser(user) {
    return api.put('/users/update', {
        username: user.username,
        email: user.email,
        password: user.password
    });
  }

  deleteUser(user) {
    return api.delete('/users/delete', {
        id: user.id
    });
  }
}

export default new UserService();