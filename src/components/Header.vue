<template>
  <div
    class="bg-gradient-to-br from-pink-200 dark:from-pink-500 to-electric-violet-300 dark:to-electric-violet-600 rounded-t p-4"
  >
    <div class="flex flex-row">
      <div class="text-5xl flex items-center justify-center px-2">
        {{ day }}
      </div>
      <div class="">
        <div>{{ weekday }}</div>
        <div>{{ `${month}, ${year}` }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  data() {
    return {
      day: "",
      month: "",
      year: "",
      weekday: "",
    };
  },
  mounted() {
    const date = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
    });
    [
      { value: this.weekday },
      ,
      { value: this.month },
      ,
      { value: this.day },
      ,
      { value: this.year },
    ] = dateTimeFormat.formatToParts(date);
  },
});
</script>
