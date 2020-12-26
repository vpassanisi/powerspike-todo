<template>
  <div
    @click="isDrawerOpen = !isDrawerOpen"
    class="relative border-gray-500 dark:border-gray-700 p-4 overflow-x-hidden"
    :class="[index !== 0 ? 'border-t' : '']"
  >
    <div class="ml-2 font-black text-xl">{{ todo.title }}</div>
    <div class="ml-6 font-sans text-gray-700 dark:text-gray-400">
      {{ todo.content }}
    </div>
    <div
      class="absolute right-0 top-0 flex flex-row items-center justify-center h-full transition-drawer duration-500 ease-in-expo"
      :class="[
        isDrawerOpen
          ? 'transform -translate-x-0 text-white dark:bg-electric-violet-600 bg-electric-violet-400 bg-opacity-90'
          : 'transform translate-x-48',
      ]"
    >
      <i
        class="flex material-icons transition-transform duration-500 ease-in-expo"
        :class="[isDrawerOpen ? 'transform rotate-180' : '']"
        >keyboard_arrow_left</i
      >
      <button class="focus:outline-none ml-8">
        <i class="flex material-icons text-4xl">edit</i>
      </button>
      <button class="focus:outline-none ml-8 mr-16">
        <i class="flex material-icons text-4xl">delete</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Todo } from "../store/index";

export default defineComponent({
  name: "TodoComp",
  props: {
    todo: Object as () => Todo,
    index: Number,
  },
  data() {
    return {
      isDrawerOpen: false,
    };
  },
});
</script>
