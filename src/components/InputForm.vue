<template>
  <div>
    <div class="relative w-full mb-4">
      <input
        class="relative z-10 border bg-transparent border-electric-violet-400 rounded w-full p-2 focus:outline-none"
        type="text"
        name="title"
        placeholder=" "
      />
      <label
        class="absolute inline top-2 left-2 bg-white dark:bg-dark-gray-900 text-gray-700 dark:text-gray-500"
        for="title"
        >Title</label
      >
    </div>
    <div class="relative w-full mb-4">
      <input
        class="relative z-10 border bg-transparent border-electric-violet-400 rounded w-full p-2 focus:outline-none"
        type="text"
        name="content"
        placeholder=" "
      />
      <label
        class="absolute inline top-2 left-2 bg-white dark:bg-dark-gray-900 text-gray-700 dark:text-gray-500"
        for="content"
        >Content</label
      >
    </div>
    <button
      class="bg-candlelight-500 w-full rounded py-2 text-black focus:outline-none hover:bg-electric-violet-400 hover:text-white transition-colors duration-300 ease-out"
    >
      Add
    </button>
  </div>
</template>

<style scoped>
input:not(:placeholder-shown) ~ label,
input:focus ~ label {
  transform: translateY(-80%) scale(0.85);
  z-index: 20;
}

label {
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 9999999s !important;
  -webkit-transition: background-color 9999s ease-in-out !important;
  -webkit-text-fill-color: var(--autofillColor) !important;
}
</style>
