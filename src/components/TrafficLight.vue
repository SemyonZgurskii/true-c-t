<template>
  <div class="traffic-light">
    <ul class="traffic-light__list">
      <li class="traffic-light__item" v-for="signal in signals" :key="signal">
        <Light
          :signal="signal"
          :is-active="signal === activeSignal"
          :time="remainingTime"
          :is-transition-active="isTransitionActive"
        />
      </li>
    </ul>
    <p>{{ activeSignal }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Light from './Light.vue';
import { RouteToSignal, SignalToRoute } from '../const';

export default {
  name: 'TrafficLight',
  components: {
    Light,
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
  methods: {
    ...mapActions(['handlePhaseStart', 'handlePhaseEnd', 'handleTick']),
    startCycle() {
      console.log(
        'currentSignal:',
        this.activeSignal,
        '\nnextSignal:',
        this.nextSignal,
        '\nremainingTime',
        this.remainingTime,
        '\nisTransitionActive',
        this.isTransitionActive,
      );
      // let remainingTime = this.duration;

      // const timerId = setInterval(() => {
      //   if (this.remainingTime > 0) {
      //     console.log(this.remainingTime);
      //     this.handleTick();
      //   } else {
      //     const nextRoute = `/${SignalToRoute[this.nextSignal]}`;
      //     this.$router.push({ path: nextRoute });
      //     this.handlePhaseEnd();
      //     clearInterval(timerId);
      //   }
      // }, 1000);
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
  watch: {
    remainingTime() {
      this.startCycle();
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.handlePhaseStart(RouteToSignal[to.path]);
      // vm.startCycle();
    });
  },
};
</script>

<style>
.traffic-light {
  padding: 1vh;

  border: 2px solid black;
  background-color: #cdcdcd;
}

.traffic-light__list {
  padding-left: 0;
  margin: 0;

  list-style: none;
}

.traffic-light__item:not(:last-child) {
  margin-bottom: 1vh;
}

@media (min-width: 1000px) {
  .traffic-light__list {
    display: flex;
  }

  .traffic-light__item:not(:last-child) {
    margin-bottom: 0;
    margin-right: 1vh;
  }
}
</style>
