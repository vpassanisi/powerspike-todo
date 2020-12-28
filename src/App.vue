<template>
  <main class="font-montserrat">
    <Nav />
    <TodoList />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "./components/Nav.vue";
import TodoList from "./components/TodoList.vue";
import "./css/taillwind.src.css";

export default defineComponent({
  name: "App",
  components: {
    Nav,
    TodoList,
  },
});
</script>
