import { createStore } from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";

// reuseable check for successful fetch
async function handleResponse(res: Response): Promise<void> {
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

// types for the store
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
  updatedTodo: NewTodo;
};

type DeleteObj = {
  id: string;
  index: number;
};

const state = () => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  isNewTodoOpen: false,
  todos: [] as Todo[],
  isLoading: false,
  error: null as null | string,
});

// easy type definition for the state object.  This way I don't have to maintain a separate type definition
export type RootState = ReturnType<typeof state>;

const mutations: MutationTree<RootState> = {
  setOn: (state) => (state.isDarkMode = true),
  setOff: (state) => (state.isDarkMode = false),
  setTodos: (state, json: Todo[]) => (state.todos = json),
  openNewTodo: (state) => (state.isNewTodoOpen = true),
  closeNewTodo: (state) => (state.isNewTodoOpen = false),
  deleteTodo: (state, index: number) => state.todos.splice(index, 1),
  setError: (state, error: string) => {
    state.error = error;
    setTimeout(() => (state.error = null), 3000);
  },
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
    } finally {
      commit("endLoading");
    }
  },
  async addTodo({ commit, dispatch }, todo: NewTodo) {
    try {
      commit("startLoading");

      // no empty strings allowed
      if (!todo.title || !todo.content) {
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

      // I have to pull all the todos to get the id of the newly created todo
      dispatch("getTodos");
    } catch (error) {
      commit("setError", error.message);
    } finally {
      commit("endLoading");
    }
  },
  async deleteTodo({ commit }, deleteObj: DeleteObj) {
    try {
      commit("startLoading");

      const res: Response = await fetch(
        `https://todo.powerspike.gg/${deleteObj.id}`,
        {
          method: "DELETE",
          headers: { Authorization: "AC25A5AC" },
        }
      );

      await handleResponse(res);

      commit("deleteTodo", deleteObj.index);
    } catch (error) {
      commit("setError", error.message);
    } finally {
      commit("endLoading");
    }
  },
  async updateTodo({ commit }, updateObj: UpdateObj) {
    try {
      commit("startLoading");

      // no empty strings allowed
      if (!updateObj.updatedTodo.title || !updateObj.updatedTodo.content) {
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

      const json: Todo[] = await res.json();

      // this endpoint returns all of the todos, so I just set all of them
      commit("setTodos", json);
    } catch (error) {
      commit("setError", error.message);
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
