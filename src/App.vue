<template>
  <Nav />
</template>

<script lang="ts">
import Vue from "vue";
import Nav from "./components/Nav.vue";
import "./css/taillwind.src.css";

export default Vue.extend({
  name: "App",
  components: {
    Nav,
  },
});
</script>
