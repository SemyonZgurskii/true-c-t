import Vue from 'vue';
import VueRouter from 'vue-router';
import TrafficLight from '../components/TrafficLight.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/red' },
    {
      path: '/:color',
      name: 'traffic-light',
      component: TrafficLight,
    },
  ],
});
