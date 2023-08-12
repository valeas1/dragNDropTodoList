<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';

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
    <div class="wrapper-bg pt-12 px-6 h-[200px]
                min-[768px]:h-[300px] min-[768px]:pt-[70px]">
      <div class="max-w-xl mx-auto">
        <div class="flex justify-between items-center">
          <img class="w-28 h-5 min-[768px]:w-40 min-[768px]:h-10" src="./assets/img/logo.svg" alt="logo">
          <img 
            class="w-4 h-4 
                  min-[768px]:w-5 min-[768px]:h-5
                  min-[1024px]:hover:cursor-pointer" 
            :src="(themeMode === 'dark')? 'src/assets/img/moon.svg' : 'src/assets/img/sun.svg'" 
            alt="toggleThemeMode"
            @click="toggleTheme"
            >
        </div>
        <label>
          <input
            class="mt-10 w-full h-12 rounded-md outline-none pl-[52px] placeholder:text-xs todo-input dark:bg-dark-blue dark:text-grey-text 
                  min-[768px]:h-16 min-[768px]:text-lg min-[768px]:placeholder:text-lg min-[768px]:pl-[72px]"
            type="text"
            placeholder="Create a new todo…"
          >
          <span class="block w-[20px] h-[20px] rounded-[50%] border border-border-grey dark:border-border-blue relative top-[-35px] left-[20px]
                      min-[768px]:w-[24px] min-[768px]:h-[24px] min-[768px]:top-[-45px]"
          ></span>
        </label>
      </div>
    </div>
    <div class="px-6 relative top-[-26px] mx-auto
                min-[768px]:max-w-xl min-[768px]:px-0">
      <ul class="shadow flex flex-col">
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
