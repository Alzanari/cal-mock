import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { status: "success", user } : { status: { status: "" }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user.roles.includes("ROLE_ADMIN"),
    authStatus: (state) => state.status,
    getUser: (state) => state.user,
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post("/auth/signin", user)
          .then((resp) => {
            const user = resp.data;
            // Add the following line:
            localStorage.setItem("user", JSON.stringify(user));
            commit("auth_success", user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("user");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get("/auth/signout").then(() => {
          localStorage.removeItem("user");
          commit("logout");
        });
        resolve();
      });
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
    },
  },
};
