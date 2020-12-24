<template>
  <transition name="todolist" appear>
    <div class="flex flex-col items-center justify-center pt-24">
      <div class="w-11/12 max-w-screen-sm">
        <Header />
        <div
          class="rounded-b border-l border-r border-b border-gray-500 dark:border-gray-700"
        >
          <TodoComp
            v-for="(todo, i) in todos"
            :key="todo.id"
            :todo="todo"
            :index="i"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "./Header.vue";
import TodoComp from "./TodoComp.vue";

import { Todo } from "../store/index";

export default Vue.extend({
  components: {
    Header,
    TodoComp,
  },
  computed: {
    todos(): Todo[] {
      return this.$store.state.todos;
    },
  },
  created(): void {
    this.$store.dispatch("getTodos");
  },
});
</script>

<style scoped>
.todolist-enter,
.todolist-leave-active {
  opacity: 0;
  transform: translateY(10%);
}
.todolist-enter-active,
.todolist-leave-active {
  transition: opacity 1.5s cubic-bezier(0.075, 0.245, 0, 0.93),
    transform 1s cubic-bezier(0.075, 0.245, 0, 0.93);
}
</style>
