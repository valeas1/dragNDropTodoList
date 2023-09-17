<script setup lang="ts">
import { onUpdated } from 'vue';
import type { ITodo } from './todos';

const emit = defineEmits(['remove', 'completedToggle', 'moveItems'])
const { id, title, completed } = defineProps<ITodo>();

onUpdated(()=> {
    emit('moveItems', id)
})

</script>

<template>
    <li class="list_item h-[52px] flex items-center bg-white px-5
                dark:bg-dark-blue
                min-[768px]:h-[64px]">
        <label class="flex items-center">
            <input class="sr-only" type="checkbox" :checked="completed" @change="emit('completedToggle', id)">
            <span class="checkbox block w-5 h-5 border-[1px] border-solid border-border-grey rounded-[50%] mr-3 relative bg-inherit
                        dark:border-border-blue
                        min-[768px]:w-6 min-[768px]:h-6 min-[768px]:hover:cursor-pointer"></span>
            <span class="text text-text-blue dark:text-grey-text
                        min-[768px]:text-lg min-[768px]:cursor-pointer">
                        {{title}}
            </span>
        </label>
        <img class="cross ml-auto block w-3 h-3
                    min-[768px]:cursor-pointer min-[768px]:w-4 min-[768px]:h-4" 
            src="./assets/img/cross-light.svg" 
            alt="del"
            @click="emit('remove', id)">
    </li>


</template>

<style scoped>


</style>