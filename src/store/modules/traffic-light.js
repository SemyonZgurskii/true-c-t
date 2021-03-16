export default {
  state: {
    signals: ['stop', 'attention', 'go'],
    pattern: ['stop', 'attention', 'go', 'attention'],
    durations: { stop: 10, attention: 3, go: 15 },
    transitionBeginning: 3,
    remainingTime: 0,
    activeSignal: '',
    phase: 0,
    nextPhase: 1,
  },
  actions: {
    handlePhaseStart({ commit, state, getters, dispatch }, signal) {
      if (getters.activeSignal === signal) {
        dispatch('handleTick');
      } else {
        commit('setActiveSignal', signal);

        const { pattern } = state;
        const phase = pattern.indexOf(signal);
        commit('setPhase', phase);
        commit('setRemainingTime', getters.duration);
      }
    },
    handlePhaseEnd({ commit, state, getters }) {
      const { phase, pattern, nextPhase } = state;
      const fullCycleLength = pattern.length - 1;

      if (phase + 1 < fullCycleLength) {
        commit('setPhase', phase + 1);
        commit('setNextPhase', nextPhase + 1);
      } else if (phase + 1 === fullCycleLength) {
        commit('setPhase', phase + 1);
        commit('setNextPhase', 0);
      } else {
        commit('setPhase', 0);
        commit('setNextPhase', 1);
      }

      commit('setActiveSignal', pattern[state.phase]);
      commit('setRemainingTime', getters.duration);
    },
    handleTick({ commit, getters }) {
      commit('setRemainingTime', getters.remainingTime - 1);
    },
  },
  mutations: {
    setActiveSignal(state, signal) {
      state.activeSignal = signal;
    },
    setPhase(state, phase) {
      state.phase = phase;
    },
    setNextPhase(state, phase) {
      state.nextPhase = phase;
    },
    setRemainingTime(state, time) {
      state.remainingTime = time;
    },
  },
  getters: {
    signals({ signals }) {
      return signals;
    },
    activeSignal({ pattern, phase }) {
      return pattern[phase];
    },
    nextSignal({ pattern, nextPhase }) {
      return pattern[nextPhase];
    },
    duration({ durations, activeSignal }) {
      return durations[activeSignal];
    },
    remainingTime({ remainingTime }) {
      return remainingTime;
    },
    isTransitionActive({ remainingTime, transitionBeginning }) {
      return remainingTime <= transitionBeginning;
    },
  },
};
