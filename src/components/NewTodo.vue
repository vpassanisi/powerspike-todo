<template>
  <div>
    hello
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NewTodo",
  computed: {
    isNewTodoOpen(): boolean {
      return this.$store.state.isNewTodoOpen;
    },
  },
});
</script>
