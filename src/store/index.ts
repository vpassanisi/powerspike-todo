import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";

Vue.use(Vuex);

const state = () => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
});

type RootState = ReturnType<typeof state>;

const mutations: MutationTree<RootState> = {
  setOn: (state) => (state.isDarkMode = true),
  setOff: (state) => (state.isDarkMode = false),
};

const actions: ActionTree<RootState, RootState> = {
  turnOn({ commit }) {
    document.documentElement.classList.add("dark");

    commit("setOn");
  },
  turnOff({ commit }) {
    document.documentElement.classList.remove("dark");

    commit("setOff");
  },
  init({ dispatch, state }) {
    if (state.isDarkMode) dispatch("turnOn");
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
