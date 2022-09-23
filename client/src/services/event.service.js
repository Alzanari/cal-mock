import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/events';

class EventService {
  getAllEvents() {
    return axios.get(API_URL + '/all', { headers: authHeader() });
  }

  getEvent(event) {
    return axios.get(API_URL + '/event', {
        id: event.id
    }, { headers: authHeader() });
  }

  createEvent(event) {
    return axios.post(API_URL + '/create', {
        title: event.title,
        comment: event.comment,
        date: event.date
    } ,{ headers: authHeader() });
  }

  updateUser(event) {
    return axios.put(API_URL + '/update', {
        title: event.title,
        comment: event.comment,
        date: event.date,
        status: event.status
    }, { headers: authHeader() });
  }

  deleteUser(event) {
    return axios.delete(API_URL + '/delete', {
        id: event.id
    }, { headers: authHeader() });
  }
}

export default new EventService();