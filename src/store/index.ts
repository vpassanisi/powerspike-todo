import { createStore } from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";

export type Todo = {
  id: string;
  title: string;
  content: string;
  created: number;
  last_edited: number;
};

type NewTodo = {
  title: string;
  content: string;
};

const state = () => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  isNewTodoOpen: false,
  todos: [] as Todo[],
});

export type RootState = ReturnType<typeof state>;

const mutations: MutationTree<RootState> = {
  setOn: (state) => (state.isDarkMode = true),
  setOff: (state) => (state.isDarkMode = false),
  setTodos: (state, json: Todo[]) => (state.todos = json),
  addTodo: (state, todo: Todo) => state.todos.push(todo),
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
        headers: { Authorization: "AC25A5AC" },
      });

      const json: Todo[] = await res.json();

      console.log(json);

      commit("setTodos", json);
    } catch (error) {
      console.log(error);
    }
  },
  async addTodo({ commit }, todo: NewTodo) {
    try {
      const res: Response = await fetch("https://todo.powerspike.gg", {
        method: "POST",
        headers: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      /* eslint-disable @typescript-eslint/camelcase */
      if (res.ok) {
        commit("addTodo", {
          ...todo,
          id: Date.now().toString(),
          created: 0,
          last_edited: 0,
        });
      } else {
        console.log("fire");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async deleteTodo({ commit, state }, id: string) {
    const todo: Todo | undefined = state.todos.find((t) => t.id === id);
    try {
      const res: Response = await fetch(`https://todo.powerspike.gg/${id}`, {
        method: "DELETE",
        headers: { Authorization: "AC25A5AC" },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

const getters: GetterTree<RootState, RootState> = {};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
