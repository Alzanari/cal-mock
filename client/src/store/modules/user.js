import axios from "axios";
import router from "../../router";

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
    async updateUser({ commit }, user) {
      try {
        let res = await axios.put("/user/update", {
          username: user.username,
          email: user.email,
          password: user.password,
        });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async setAdmin({ commit }, user) {
      try {
        let res = await axios.put("/user/setAdmin", {
          id: user.id,
        });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async removeAdmin({ commit }, user) {
      try {
        let res = await axios.put("/user/removeAdmin", {
          id: user.id,
        });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser({ commit }, user) {
      try {
        let res = await axios.delete("/user/delete", { data: { id: user.id } });
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addUser({ commit }, user) {
      try {
        let res = await axios.post("/auth/signup", user);
        if (res.status == 200) {
          router.go(0);
        }
        return res.data;
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
