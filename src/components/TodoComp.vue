<template>
  <div
    class="border-gray-500 dark:border-gray-700 p-4"
    :class="[index !== 0 ? 'border-t' : '']"
  >
    <div class="ml-2 font-black text-xl">{{ todo.title }}</div>
    <div class="ml-6 font-sans">{{ todo.content }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Todo } from "../store/index";

export default Vue.extend({
  name: "TodoComp",
  props: {
    todo: Object as () => Todo,
    index: Number,
  },
});
</script>
