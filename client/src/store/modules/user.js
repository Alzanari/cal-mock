import axios from "axios";

const initialState = {
  users: [],
};

export const user = {
  namespaced: true,
  state: initialState,
  getters: {
    allUsers: (state) => {
      let items = [];
      state.users.forEach((user) => {
        let adm = "No";
        user.Roles.forEach((role) => {
          if (role.name == "admin") {
            adm = "Yes";
          }
        });
        let modified = {
          id: user.id,
          username: user.username,
          email: user.email,
          admin: adm,
        };
        items.push(modified);
      });
      return items;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await axios.get("/user/all");
      commit("setUsers", response.data.data);
      return await Promise.resolve(response);
    },
    async updateUser({ dispatch }, user) {
      try {
        await axios.put("/user/update", {
          username: user.username,
          email: user.email,
          password: user.password,
        });
        dispatch("fetchUsers");
      } catch (error) {
        console.error(error);
      }
    },
    async setAdmin({ dispatch }, user) {
      try {
        await axios.put("/user/setAdmin", {
          id: user.id,
        });
        dispatch("fetchUsers");
      } catch (error) {
        console.error(error);
      }
    },
    async removeAdmin({ dispatch }, user) {
      try {
        await axios.put("/user/removeAdmin", {
          id: user.id,
        });
        dispatch("fetchUsers");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser({ dispatch }, user) {
      try {
        await axios.delete("/user/delete", { data: { id: user.id } });
        dispatch("fetchUsers");
      } catch (error) {
        console.error(error);
      }
    },
    async addUser({ dispatch }, user) {
      try {
        await axios.post("/auth/signup", user);
        dispatch("fetchUsers");
      } catch (error) {
        console.error(error);
      }
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
};
