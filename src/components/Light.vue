<template>
  <div class="light" :class="[`light--${signal}`, activeClass, transitionClass]">
    <p class="light__text" v-if="isActive">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: 'Light',
  props: {
    signal: String,
    isActive: Boolean,
    isTransitionActive: Boolean,
    time: Number,
  },
  computed: {
    activeClass() {
      return this.isActive ? 'light--active' : '';
    },
    transitionClass() {
      return this.isTransitionActive && this.isActive ? 'light--transition' : '';
    },
  },
};
</script>

<style scoped>
@keyframes ping {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.light {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vh;
  height: 25vh;

  opacity: 0.5;
  border-radius: 50%;
}

.light--stop {
  background-color: #fc0000;
}

.light--attention {
  background-color: #ffc71f;
}

.light--go {
  background-color: #02c646;
}

.light--active {
  opacity: 1;
}

.light--transition {
  animation: ping 1s step-end infinite;
}

.light__text {
  margin: 0;

  font-size: 5vh;
  font-weight: 500;
}
</style>
