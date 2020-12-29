<template>
  <transition name="alert">
    <div
      v-if="error"
      class="fixed bottom-0 flex items-center justify-center w-full h-16 bg-red-700 text-center text-2xl text-white"
    >
      {{ error }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorAlert",
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  watch: {
    error() {
      setTimeout(() => this.$store.commit("clearError"), 3000);
    },
  },
});
</script>

<style scoped>
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.alert-enter-active,
.alert-leave-active {
  transition: opacity 0.75s cubic-bezier(0.075, 0.245, 0, 0.93),
    transform 0.75s cubic-bezier(0.075, 0.245, 0, 0.93);
}
</style>
