<template>
  <div
    @click="isDrawerOpen = !isDrawerOpen"
    class="relative border-gray-500 dark:border-gray-700 p-4 overflow-x-hidden cursor-pointer"
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
      <button
        @click="isUpdateOpen = !isUpdateOpen"
        class="focus:outline-none ml-8"
      >
        <i class="flex material-icons text-4xl">edit</i>
      </button>
      <button @click="handleDelete" class="focus:outline-none ml-8 mr-16">
        <i class="flex material-icons text-4xl">delete</i>
      </button>
    </div>
    <div
      @click.stop
      class="flex flex-col border rounded overflow-hidden transition-updateTodo duration-500 ease-in-expo mr-10 sm:mx-10 cursor-default"
      :class="[
        isUpdateOpen
          ? 'max-h-48 border-gray-600 dark:border-gray-700'
          : 'max-h-0 border-transparent',
      ]"
    >
      <div class="text-center mt-2">Update Todo</div>
      <input
        class="bg-transparent border-b-2 font-black text-xl border-electric-violet-400 focus:border-candlelight-500 transition-border-color duration-500 ease-out w-3/4 ml-4 mb-2 mt-4"
        type="text"
        name="title"
        placeholder="Title. . ."
        v-model="updatedTodo.title"
      />
      <textarea
        class="bg-transparent border-b-2 border-electric-violet-400 focus:border-candlelight-500 transition-border-color duration-500 ease-out font-sans w-2/3 ml-8 mb-4"
        name="conent"
        placeholder="Content. . ."
        v-model="updatedTodo.content"
      />
      <div class="flex items-center justify-center">
        <button
          @click.stop="handleUpdate"
          class="w-1/2 rounded text-black bg-candlelight-400 dark:bg-candlelight-500 py-1 focus:outline-none shadow-lg mb-4"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Todo } from "../store/index";

export default defineComponent({
  name: "TodoComp",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    index: Number,
  },
  data() {
    return {
      isDrawerOpen: false,
      isUpdateOpen: false,
      updatedTodo: {
        title: this.todo.title,
        content: this.todo.content,
      },
    };
  },
  methods: {
    handleDelete() {
      if (confirm("Are you sure you want to delete this todo?")) {
        this.$store.dispatch("deleteTodo", this.todo.id);
      }
    },
    handleUpdate() {
      if (
        this.updatedTodo.title === this.todo.title &&
        this.updatedTodo.content === this.todo.content
      ) {
        this.isUpdateOpen = false;
        return;
      }

      this.$store.dispatch("updateTodo", {
        id: this.todo.id,
        index: this.index,
        updatedTodo: this.updatedTodo,
      });

      this.isUpdateOpen = false;
    },
  },
});
</script>
