<template>
  <transition name="todolist" appear>
    <div class="flex flex-col items-center justify-center pt-16">
      <!-- Todo List Card -->
      <div
        class="w-11/12 max-w-screen-sm rounded shadow-lg dark:shadow-none mb-32"
      >
        <Header />
        <div class="relative">
          <transition-group name="todos" tag="div">
            <TodoComp
              v-for="(todo, i) in todos"
              :key="todo.id"
              :todo="todo"
              :index="i"
            />
            <NewTodo key="NewTodo" />
            <button
              key="NewTodo-button"
              @click="isNewTodoOpen ? closeNewTodo() : openNewTodo()"
              class="absolute right-0 rounded-full bg-candlelight-400 dark:bg-candlelight-500 focus:outline-none transform -translate-y-7 text-black p-2"
            >
              <i
                class="flex material-icons transition-transform duration-500 ease-in-expo"
                style="font-size: 2.25rem"
                :class="[isNewTodoOpen ? 'transform rotate-45' : '']"
                >add</i
              >
            </button>
          </transition-group>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import TodoComp from "./TodoComp.vue";
import NewTodo from "./NewTodo.vue";

import { Todo } from "../store/index";

export default defineComponent({
  components: {
    Header,
    TodoComp,
    NewTodo,
  },
  computed: {
    todos(): Todo[] {
      return this.$store.state.todos;
    },
    isNewTodoOpen(): boolean {
      return this.$store.state.isNewTodoOpen;
    },
  },
  methods: {
    openNewTodo(): void {
      this.$store.commit("openNewTodo");
    },
    closeNewTodo(): void {
      this.$store.commit("closeNewTodo");
    },
  },
  created(): void {
    this.$store.dispatch("getTodos");
  },
});
</script>

<style scoped>
.todolist-enter-from,
.todolist-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
.todolist-enter-active,
.todolist-leave-active {
  transition: opacity 1.5s cubic-bezier(0.075, 0.245, 0, 0.93),
    transform 1s cubic-bezier(0.075, 0.245, 0, 0.93);
}

.todos-enter-active {
  animation: add-item 0.5s;
}

.todos-leave-active {
  position: absolute;
  width: 100%;
  animation: add-item 0.5s reverse;
}

.todos-move {
  transition: transform 0.5s;
}
@keyframes add-item {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
