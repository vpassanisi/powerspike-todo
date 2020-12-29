import { createStore } from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";

async function handleResponse(res: Response): Promise<void> {
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

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

type UpdateObj = {
  id: string;
  index: number;
  updatedTodo: NewTodo;
};

const state = () => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  isNewTodoOpen: false,
  todos: [] as Todo[],
  isLoading: false,
  error: null as null | string,
});

export type RootState = ReturnType<typeof state>;

const mutations: MutationTree<RootState> = {
  setOn: (state) => (state.isDarkMode = true),
  setOff: (state) => (state.isDarkMode = false),
  setTodos: (state, json: Todo[]) => (state.todos = json),
  addTodo: (state, todo: Todo) => state.todos.push(todo),
  openNewTodo: (state) => (state.isNewTodoOpen = true),
  closeNewTodo: (state) => (state.isNewTodoOpen = false),
  deleteTodo: (state, index) => state.todos.splice(index, 1),
  updateTodo: (state, updateObj: UpdateObj) => {
    state.todos[updateObj.index].title = updateObj.updatedTodo.title;
    state.todos[updateObj.index].content = updateObj.updatedTodo.content;
  },
  setError: (state, error: string) => (state.error = error),
  clearError: (state) => (state.error = null),
  startLoading: (state) => (state.isLoading = true),
  endLoading: (state) => (state.isLoading = false),
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
      commit("startLoading");

      const res: Response = await fetch("https://todo.powerspike.gg", {
        method: "GET",
        headers: { Authorization: "AC25A5AC" },
      });

      await handleResponse(res);

      const json: Todo[] = await res.json();

      commit("setTodos", json);
    } catch (error) {
      commit("setError", error.message);
      console.log(error.message);
    } finally {
      commit("endLoading");
    }
  },
  async addTodo({ commit }, todo: NewTodo) {
    try {
      commit("startLoading");

      if (todo.title === "" || todo.content === "") {
        throw new Error("A todo must have a title and content");
      }

      const res: Response = await fetch("https://todo.powerspike.gg", {
        method: "POST",
        headers: {
          Authorization: "AC25A5AC",
        },
        body: JSON.stringify(todo),
      });

      await handleResponse(res);

      /* eslint-disable @typescript-eslint/camelcase */
      commit("addTodo", {
        ...todo,
        id: Date.now().toString(),
        created: 0,
        last_edited: 0,
      });
    } catch (error) {
      commit("setError", error.message);
      console.log(error.message);
    } finally {
      commit("endLoading");
    }
  },
  async deleteTodo({ commit, state }, id: string) {
    try {
      commit("startLoading");

      let index: number | undefined;
      state.todos.forEach((t, i) => {
        if (t.id === id) index = i;
      });

      if (!index) throw new Error("could not find that todo :(");

      const res: Response = await fetch(`https://todo.powerspike.gg/${id}`, {
        method: "DELETE",
        headers: { Authorization: "AC25A5AC" },
      });

      await handleResponse(res);

      commit("deleteTodo", index);
    } catch (error) {
      commit("setError", error.message);
      console.log(error.message);
    } finally {
      commit("endLoading");
    }
  },
  async updateTodo({ commit }, updateObj: UpdateObj) {
    try {
      commit("startLoading");

      if (
        updateObj.updatedTodo.title === "" ||
        updateObj.updatedTodo.content === ""
      ) {
        throw new Error("A todo must have a title and content");
      }

      const res: Response = await fetch(
        `https://todo.powerspike.gg/${updateObj.id}`,
        {
          method: "PUT",
          headers: { Authorization: "AC25A5AC" },
          body: JSON.stringify(updateObj.updatedTodo),
        }
      );

      await handleResponse(res);

      commit("updateTodo", updateObj);
    } catch (error) {
      commit("setError", error.message);
      console.log(error.message);
    } finally {
      commit("endLoading");
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
