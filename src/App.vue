<script setup lang="ts">
import { onMounted, ref } from 'vue';

  const themeMode = ref('light');

  const toggleTheme = () => {
    document.body.classList.toggle('dark');

    if(themeMode.value === 'dark') {
      themeMode.value = 'light';
    } else {
      themeMode.value = 'dark';
    }
  } 

  onMounted(()=> {
    let theme = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(theme);
    
    if(theme.matches) {
      themeMode.value = 'dark';
      document.body.classList.add('dark')
    }
  })
</script>

<template>
  <div class="bg-main-white dark:bg-main-dark w-full h-screen">
    <div class="wrapper-bg pt-12 px-6">
      <div class="flex justify-between">
        <img class="w-28 h-5" src="./assets/img/logo.svg" alt="logo">
        <img 
          class="w-4 h-4" 
          :src="(themeMode === 'dark')? 'src/assets/img/moon.svg' : 'src/assets/img/sun.svg'" 
          alt="toggleThemeMode"
          @click="toggleTheme"
          >
      </div>
      <label>
        <input
          class="mt-10 w-full h-12 rounded-md outline-none pl-[52px] placeholder:text-xs todo-input dark:bg-dark-blue dark:text-grey-text"
          type="text"
          placeholder="Create a new todo…"
        >
        <span class="block w-[20px] h-[20px] rounded-[50%] border border-border-grey dark:border-border-blue relative top-[-35px] left-[20px]"></span>
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>
