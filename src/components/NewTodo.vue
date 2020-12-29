<template>
  <div
    class="relative flex flex-col items-start justify-center border-t rounded-b border-gray-600 overflow-hidden transition-updateTodo duration-500 ease-in-expo"
    :class="[isNewTodoOpen ? 'max-h-52 border-b ' : 'max-h-0']"
  >
    <div class="text-center mt-2 text-2xl w-full">New Todo</div>
    <input
      class="bg-transparent border-b-2 font-black text-xl border-electric-violet-400 focus:border-candlelight-500 transition-border-color duration-500 ease-out w-3/4 ml-4 mb-2 mt-4"
      type="text"
      name="title"
      placeholder="Title. . ."
      v-model="title"
    />
    <textarea
      class="bg-transparent border-b-2 border-electric-violet-400 focus:border-candlelight-500 transition-border-color duration-500 ease-out font-sans w-2/3 ml-8 mb-4"
      name="conent"
      placeholder="Content. . ."
      v-model="content"
    />
    <div class="flex flex-row items-center justify-center w-full mb-4">
      <button
        @click="handleAddTodo"
        class="w-1/2 rounded text-black bg-candlelight-400 dark:bg-candlelight-500 py-1 focus:outline-none shadow-lg"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewTodo",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
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
    handleAddTodo(): void {
      this.$store.dispatch("addTodo", {
        title: this.title,
        content: this.content,
      });

      this.$store.commit("closeNewTodo");

      this.title = "";
      this.content = "";
    },
  },
});
</script>

<style scoped>
input:not(:placeholder-shown),
textarea:not(:placeholder-shown) {
  border-color: rgba(250, 204, 20);
}
</style>
