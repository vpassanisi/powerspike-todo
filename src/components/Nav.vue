<template>
  <nav
    class="h-16 shadow-default bg-electric-violet-300 dark:bg-electric-violet-500"
  >
    <div
      class="flex flex-row items-center justify-between h-full w-11/12 mx-auto"
    >
      <div class="flex items-center justify-center h-full">
        PowerSpike Todos
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
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
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
    ...mapState(["isDarkMode"]),
  },
  mounted() {
    this.$store.dispatch("init");
  },
});
</script>
