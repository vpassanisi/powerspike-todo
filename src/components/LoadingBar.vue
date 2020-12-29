<template>
  <div
    ref="progressLine"
    class="progress-line"
    :class="[isLoading ? 'visible' : 'invisible']"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingBar",
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
});
</script>

<style scoped>
.progress-line,
.progress-line:before {
  height: 3px;
  width: 100%;
}
.progress-line {
  background-color: #c3aafd;
  display: -webkit-flex;
  display: flex;
}
.progress-line:before {
  background-color: #5914fa;
  content: "";
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@-webkit-keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}
@keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}
</style>
