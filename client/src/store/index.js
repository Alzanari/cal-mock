import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./modules/auth";
import { event } from "./modules/event";
import { user } from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    event,
    user,
  },
});
