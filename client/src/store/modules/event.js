import Vue from "vue";
import axios from "axios";
import moment from "moment";

const instance = new Vue({});
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
        let status = "";
        switch (event.status) {
          case "pending":
            status = "En attente";
            break;

          case "validated":
            status = "Valide";
            break;

          case "rejected":
            status = "Rejeté";
            break;
          default:
            break;
        }
        let modified = {
          id: event.id,
          user: event.User.username,
          title: event.title,
          comment: event.comment,
          start: start,
          end: end,
          allDay: event.allDay,
          status: status,
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
    async addEvent({ dispatch }, event) {
      try {
        await axios
          .post("/event/create", {
            title: event.title,
            comment: event.comment,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
          })
          .then((res) => {
            if (res.status == 200) {
              instance.$notify({
                title: "Important message",
                text: res.data.message,
                type: "success",
              });
              dispatch("fetchEvents");
            }
          })
          .catch((err) => {
            if (err.status !== 401) {
              instance.$notify({
                title: "Important message",
                text: err,
                type: "error",
              });
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    async updateStatus({ dispatch }, event) {
      try {
        await axios
          .put("/event/status", {
            id: event.id,
            status: event.status,
          })
          .then((res) => {
            if (res.status == 200) {
              instance.$notify({
                title: "Important message",
                text: res.data.message,
                type: "success",
              });
            }
            dispatch("fetchEvents");
          })
          .catch((err) => {
            if (err.status !== 401) {
              instance.$notify({
                title: "Important message",
                text: err,
                type: "error",
              });
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    async updateEvent({ dispatch }, event) {
      try {
        await axios
          .put("/event/update", {
            id: event.id,
            title: event.title,
            comment: event.comment,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            status: event.status,
          })
          .then((res) => {
            if (res.status == 200) {
              instance.$notify({
                title: "Important message",
                text: res.data.message,
                type: "success",
              });
            }
            dispatch("fetchEvents");
          })
          .catch((err) => {
            if (err.status !== 401) {
              instance.$notify({
                title: "Important message",
                text: err,
                type: "error",
              });
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEvent({ dispatch }, event) {
      try {
        await axios
          .delete("/event/delete", { data: { id: event.id } })
          .then((res) => {
            if (res.status == 200) {
              instance.$notify({
                title: "Important message",
                text: res.data.message,
                type: "success",
              });
            }
            dispatch("fetchEvents");
          })
          .catch((err) => {
            if (err.status !== 401) {
              instance.$notify({
                title: "Important message",
                text: err,
                type: "error",
              });
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    setWeekendsVisible({ commit }, enabled) {
      return commit("setWeekends", enabled);
    },
  },
  mutations: {
    setEvents: (state, events) => (state.events = events),
    setWeekends: (state, enabled) => (state.weekendsVisible = enabled),
  },
};
