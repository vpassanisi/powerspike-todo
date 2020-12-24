<template>
  <main class="font-montserrat">
    <Nav />
    <TodoList />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Nav from "./components/Nav.vue";
import TodoList from "./components/TodoList.vue";
import "./css/taillwind.src.css";

export default Vue.extend({
  name: "App",
  components: {
    Nav,
    TodoList,
  },
});
</script>
