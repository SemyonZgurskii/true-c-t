import Vue from 'vue';
import Vuex from 'vuex';
import trafficLight from './modules/traffic-light';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    trafficLight,
  },
});
