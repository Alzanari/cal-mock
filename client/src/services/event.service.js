import api from './api';

class EventService {
  getAllEvents() {
    return api.get('/event/all');
  }

  getEvent(event) {
    return api.get('/event/event', {
        id: event.id
    });
  }

  createEvent(event) {
    return api.post('/event/create', {
        title: event.title,
        comment: event.comment,
        date: event.date
    });
  }

  updateUser(event) {
    return api.put('/event/update', {
        title: event.title,
        comment: event.comment,
        date: event.date,
        status: event.status
    });
  }

  deleteUser(event) {
    return api.delete('/event/delete', {
        id: event.id
    });
  }
}

export default new EventService();