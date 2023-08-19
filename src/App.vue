<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { todosItems, type ITodo } from './todos';
import draggable from 'vuedraggable'

  const inputValue = ref('');

  const themeMode = ref('light');

  const todos = ref([...todosItems]);

  const activeFilter = ref('all');

  const toggleTheme = () => {
    document.body.classList.toggle('dark');

    if(themeMode.value === 'light') {
      themeMode.value = 'dark';
    } else {
      themeMode.value = 'light'
    }

    if(localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    inputValue.value = target.value;
  }

  const addTodoHandler = () => {
    const todo: ITodo = {
      id: new Date().getTime(),
      title: inputValue.value,
      completed: false
    }

    todos.value.push(todo);

    inputValue.value = '';
  }

  const removeTodoHandler = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  const removeCompletedHandler = () => {
    todos.value = todos.value.filter((todo) => todo.completed === false);
  }

  const completedToggleHandler = (id: number) => {
    const idx = todos.value.findIndex(todo => todo.id === id)
        
    todos.value[idx] = {...todos.value[idx], completed: !todos.value[idx].completed};
  }

  const showAllTodos = () => {
    activeFilter.value = 'all';
  }

  const showActiveTodos = () => {
    activeFilter.value = 'active';
  }

  const showCompletedTodos = () => {
    activeFilter.value = 'completed';
  }

  const isShow = (todo: ITodo) => {
    if(activeFilter.value === 'all') {
      return true;
    }
    if(activeFilter.value === 'active') {
      if(todo.completed === false) {
        return true;
      }
    }
    if(activeFilter.value === 'completed') {
      if(todo.completed === true) {
        return true;
      }
    }
  } 

  onMounted(()=> {
    let theme = window.matchMedia("(prefers-color-scheme: dark)");
    
    if(localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark')
      themeMode.value = 'dark';
    }

    if(theme.matches && !localStorage.getItem('theme')) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeMode.value = 'dark';
    }
  })
</script>

<template>
  <div class="bg-main-white dark:bg-main-dark w-full h-full min-h-screen">
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
            class="mt-10 w-full h-12 rounded-md outline-none pl-[52px] 
                  placeholder:text-xs placeholder:text-text-disable todo-input dark:bg-dark-blue dark:text-grey-text 
                  min-[768px]:h-16 min-[768px]:text-lg min-[768px]:placeholder:text-lg min-[768px]:pl-[72px]"
            type="text"
            placeholder="Create a new todo…"
            :value="inputValue"
            @input="onInput"
            @keyup.enter="addTodoHandler"
          >
          <span class="block w-[20px] h-[20px] rounded-[50%] border border-border-grey dark:border-border-blue relative top-[-35px] left-[20px]
                      min-[768px]:w-[24px] min-[768px]:h-[24px] min-[768px]:top-[-45px]"
          ></span>
        </label>
      </div>
    </div>
    <div class="px-6 relative top-[-26px] mx-auto pb-16
                min-[768px]:max-w-xl min-[768px]:px-0 min-[768px]:top-[-32px]">
        <draggable 
          v-model="todos" 
          tag="ul" 
          item-key="order"
          class="shadow flex flex-col"
        >
          <template #item="{element: todo}">
            <TodoItem
              v-if="isShow(todo)"
              :key="todo.id" 
              :id="todo.id"
              :title="todo.title" 
              :completed="todo.completed" 
              @remove="removeTodoHandler"
              @completed-toggle="completedToggleHandler">
            </TodoItem>
          </template>
          </draggable>
      <div>
        <div class="h-[52px] bg-white flex justify-between px-5 items-center shadow rounded-b-[5px]
                    dark:bg-dark-blue
                    min-[768px]:h-[64px]">
          <span class="text-text-disable hover:text-text-blue
                        dark:text-dark-text-disable dark:hover:text-border-grey
                        min-[768px]:cursor-pointer min-[768px]:z-10 min-[768px]:text-[14px]">
                        {{ todos.filter((item)=> item.completed === false).length }} items left
          </span>
          <span class="text-text-disable hover:text-text-blue
                      dark:text-dark-text-disable dark:hover:text-border-grey
                      min-[768px]:cursor-pointer min-[768px]:z-10 min-[768px]:text-[14px]"
                @click="removeCompletedHandler">
                Clear Completed
          </span>
        </div>
        <div class="h-[52px] bg-white flex mt-4 justify-center items-center gap-[19px] shadow rounded-[5px]
                  dark:bg-dark-blue
                  min-[768px]:bg-transparent min-[768px]:shadow-none min-[768px]:mt-0 min-[768px]:relative min-[768px]:top-[-58px] 
                  min-[768px]:dark:bg-transparent min-[768px]:dark:shadow-none">
          <span class="text-text-disable hover:text-text-blue
                      dark:text-dark-text-disable dark:hover:text-border-grey
                      min-[768px]:cursor-pointer min-[768px]:text-[14px]"
                @click="showAllTodos">All</span>
          <span class="text-text-disable hover:text-text-blue
                      dark:text-dark-text-disable dark:hover:text-border-grey
                      min-[768px]:cursor-pointer min-[768px]:text-[14px]"
                @click="showActiveTodos">Active</span>
          <span class="text-text-disable hover:text-text-blue
                      dark:text-dark-text-disable dark:hover:text-border-grey
                      min-[768px]:cursor-pointer min-[768px]:text-[14px]"
                @click="showCompletedTodos">Completed</span>
        </div>
      </div>
      <footer class="text-center text-text-disable mt-10">Drag and drop to reorder list</footer>
    </div>
  </div>
</template>

<style scoped>

</style>
