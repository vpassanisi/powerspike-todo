<template>
  <nav class="h-16 shadow-default bg-candlelight-500 text-black">
    <div
      class="flex flex-row items-center justify-between h-full w-11/12 mx-auto"
    >
      <div class="flex items-center justify-center h-full">
        PowerSpike
      </div>
      <div class="flex items-center justify-center h-full">
        <button
          @click="handleToggleDarkMode"
          class="h-full px-3 focus:outline-none"
        >
          <i v-if="isDarkMode" class="flex material-icons">brightness_low</i>
          <i v-else class="flex material-icons">brightness_high</i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    handleToggleDarkMode() {
      if (this.isDarkMode) {
        this.$store.dispatch("turnOff");
      } else {
        this.$store.dispatch("turnOn");
      }
    },
  },
  computed: {
    isDarkMode(): boolean {
      return this.$store.state.isDarkMode;
    },
  },
  mounted() {
    this.$store.dispatch("init");
  },
});
</script>
