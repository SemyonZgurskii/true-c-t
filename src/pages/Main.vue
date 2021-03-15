<template>
  <div class="main">
    <router-view />
  </div>
</template>

<!--<script>-->
<!--import TrafficLight from '../components/TrafficLight.vue';-->
<!--import { RouteToSignal } from '../const';-->

<!--export default {-->
<!--  name: 'Main',-->
<!--  components: {-->
<!--    TrafficLight,-->
<!--  },-->
<!--  beforeRouteEnter(to, from, next) {-->
<!--    this.setActiveSignal(RouteToSignal[to.path]);-->
<!--    next();-->
<!--  },-->
<!--};-->
<!--</script>-->

<style>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
}
</style>
