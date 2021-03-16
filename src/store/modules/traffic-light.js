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
    handleSignalChoose({ commit, state, getters, dispatch }, signal) {
      if (getters.activeSignal === signal) {
        dispatch('handleTick');
      } else {
        commit('setActiveSignal', signal);

        const { pattern, phase } = state;
        const signalNextIndex = pattern.indexOf(signal, phase);
        const newPhase = signalNextIndex >= 0 ? signalNextIndex : pattern.indexOf(signal);

        commit('setPhase', newPhase);
        dispatch('shiftPassedPhase', [newPhase, 'setNextPhase']);
        commit('setRemainingTime', getters.duration);
      }
    },
    handlePhaseEnd({ commit, state, getters, dispatch }) {
      const { pattern, phase, nextPhase } = state;

      dispatch('shiftPassedPhase', [phase, 'setPhase']);
      dispatch('shiftPassedPhase', [nextPhase, 'setNextPhase']);

      commit('setActiveSignal', pattern[state.phase]);
      commit('setRemainingTime', getters.duration);
    },
    shiftPassedPhase({ state, commit }, phaseWithSetter) {
      const { pattern } = state;
      const [phase, phaseSetter] = phaseWithSetter;

      const fullCycleLength = pattern.length - 1;

      if (phase < fullCycleLength) {
        commit(phaseSetter, phase + 1);
      } else {
        commit(phaseSetter, 0);
      }
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
