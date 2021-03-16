import Vue from 'vue';
import VueRouter from 'vue-router';
import TrafficLightContainer from '../components/TrafficLightContainer.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/red' },
    {
      path: '/:color',
      name: 'traffic-light',
      component: TrafficLightContainer,
    },
  ],
});
