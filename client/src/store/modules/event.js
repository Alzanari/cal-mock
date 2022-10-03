import axios from "axios";
import moment from "moment";
import router from "../../router";

const initialState = {
  events: [],
  weekendsVisible: true,
};

export const event = {
  namespaced: true,
  state: initialState,
  getters: {
    allEvents: (state) => state.events,
    eventsTable: (state) => {
      let items = [];
      state.events.forEach((event) => {
        let start = moment(event.start).format("YYYY-MM-DD HH:MM");
        let end = event.end ? moment(event.end).format("YYYY-MM-DD HH:MM") : "";
        let modified = {
          id: event.id,
          user: event.User.username,
          title: event.title,
          comment: event.comment,
          start: start,
          end: end,
          allDay: event.allDay,
          status: event.status,
        };
        items.push(modified);
      });
      return items;
    },
    weekendsVisible: (state) => state.weekendsVisible,
  },
  actions: {
    async fetchEvents({ commit }) {
      const response = await axios.get("/event/all");
      commit("setEvents", response.data.data);
      return await Promise.resolve(response);
    },
    async addEvent({ commit }, event) {
      try {
        let res = await axios.post("/event/create", {
          title: event.title,
          comment: event.comment,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
        });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateStatus({ commit }, event) {
      try {
        let res = await axios.put("/event/status", {
          id: event.id,
          status: event.status,
          color: event.color,
        });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateEvent({ commit }, event) {
      try {
        let res = await axios.put("/event/update", {
          id: event.id,
          title: event.title,
          comment: event.comment,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
          status: event.status,
        });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEvent({ commit }, event) {
      try {
        let res = await axios.delete("/event/delete", { data: { id: event.id } });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    setweekendsVisible({ commit }, enabled) {
      return commit("setweekendsEnabled", enabled);
    },
  },
  mutations: {
    setEvents(state, events) {
      state.events = events;
    },
    setweekendsEnabled(state, enabled) {
      state.weekendsVisible = enabled;
    },
  },
};
