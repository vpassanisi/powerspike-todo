<template>
  <div
    class="fixed bottom-0 flex items-center justify-center w-full h-16 bg-red-700 text-center text-2xl text-white transform transition-error duration-700 ease-in-expo"
    :class="[
      error ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
    ]"
  >
    {{ error }}
  </div>
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
});
</script>
