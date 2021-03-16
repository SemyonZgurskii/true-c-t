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
  </div>
</template>

<script>
import Light from './Light.vue';

export default {
  name: 'TrafficLight',
  components: {
    Light,
  },
  props: {
    signals: {
      type: Array,
      required: true,
    },
    activeSignal: {
      type: String,
      required: true,
    },
    remainingTime: {
      type: Number,
      required: true,
    },
    isTransitionActive: {
      type: Boolean,
      required: true,
    },
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
