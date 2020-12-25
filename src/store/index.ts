import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";

Vue.use(Vuex);

export type Todo = {
  id: string;
  title: string;
  content: string;
  created: number;
  last_edited: number;
};

export type RootState = {
  isDarkMode: boolean;
  isNewTodoOpen: boolean;
  todos: Todo[];
};

const state = (): RootState => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  isNewTodoOpen: false,
  todos: [] as Todo[],
});

const mutations: MutationTree<RootState> = {
  setOn: (state) => (state.isDarkMode = true),
  setOff: (state) => (state.isDarkMode = false),
  setTodos: (state, json: Todo[]) => (state.todos = json),
  openNewTodo: (state) => (state.isNewTodoOpen = true),
  closeNewTodo: (state) => (state.isNewTodoOpen = false),
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
  async getTodos({ commit }) {
    try {
      const res: Response = await fetch("https://todo.powerspike.gg", {
        method: "GET",
        headers: { Authorization: process.env.VUE_APP_AUTHTOKEN },
      });

      const json: Todo[] = await res.json();

      commit("setTodos", json);
    } catch (error) {
      console.log(error);
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
