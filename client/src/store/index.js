import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import events from './modules/events';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        auth,
        events,
        users
    }
});
