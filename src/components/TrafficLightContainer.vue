<template>
  <TrafficLight
    :is-transition-active="isTransitionActive"
    :active-signal="activeSignal"
    :remaining-time="remainingTime"
    :signals="signals"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TrafficLight from './TrafficLight.vue';
import { RouteToSignal, SignalToRoute } from '../const';

export default {
  name: 'TrafficLightContainer',
  components: {
    TrafficLight,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.handleSignalChoose(RouteToSignal[to.path]);
    });
  },
  computed: {
    ...mapGetters([
      'signals',
      'activeSignal',
      'nextSignal',
      'duration',
      'remainingTime',
      'isTransitionActive',
    ]),
  },
  watch: {
    remainingTime() {
      this.startCycle();
    },
  },
  methods: {
    ...mapActions(['handleSignalChoose', 'handlePhaseEnd', 'handleTick']),
    startCycle() {
      const timerId = setTimeout(() => {
        if (this.remainingTime > 1) {
          this.handleTick();
          clearTimeout(timerId);
        } else {
          const nextRoute = `/${SignalToRoute[this.nextSignal]}`;
          this.$router.push({ path: nextRoute });
          this.handlePhaseEnd();
          clearTimeout(timerId);
        }
      }, 1000);
    },
  },
};
</script>
