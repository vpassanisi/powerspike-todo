<template>
  <main class="font-montserrat">
    <Nav />
    <LoadingBar />
    <TodoList />
    <ErrorAlert />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "./components/Nav.vue";
import LoadingBar from "./components/LoadingBar.vue";
import ErrorAlert from "./components/ErrorAlert.vue";
import TodoList from "./components/TodoList.vue";
import "./css/taillwind.src.css";

export default defineComponent({
  name: "App",
  components: {
    Nav,
    TodoList,
    ErrorAlert,
    LoadingBar,
  },
});
</script>
