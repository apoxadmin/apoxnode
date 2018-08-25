import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    event: {}
  },
  getters: {},
  mutations: {
    getEvent(state, eventResponse) {
      state.event = eventResponse;
    }
  },
  actions: {
    getEvent(context, payload) {
      axios
        .get(`/event/${payload.eventID}`)
        .then(response => {
          console.log(response);
          context.commit("getEvent", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
