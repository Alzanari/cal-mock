import EventService from "../../services/event.service";
import { router } from '../../main';

const events = [];

export const event = {
    namespaced: true,
    state: events,
    getters: {
        allEvents(state) {
            return state.events.toArray();
        }
    },
    actions: {
        fetchEvents({ commit }) {
            return EventService.getAllEvents().then(
                response => {
                    commit('setEvents', response.data);
                    return Promise.resolve(response);
                }
            )
        },
        async addEvent(event) {
            await EventService.createEvent(event);
            router.push('/');
        },
        async editEvent(event) {
            await EventService.updateEvent(event);
            router.push('/');
        },
        async deleteEvent(event) {
            await EventService.deleteEvent(event);
            router.push('/');
        }
    },
    mutations: {
        setEvents(state, events) {
            state.events = events;
        },

    }

}