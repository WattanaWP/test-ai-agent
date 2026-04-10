<template>
  <form @submit.prevent="submit" class="flex gap-2">
    <input
      v-model="title"
      type="text"
      placeholder="Add a new task..."
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
    <button
      type="submit"
      :disabled="!title.trim()"
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      + Add
    </button>
  </form>
</template>

<script setup lang="ts">
import type { DaySlot } from "~/types/diary";

const props = defineProps<{ day: DaySlot }>();
const emit = defineEmits<{ add: [title: string, day: DaySlot] }>();

const title = ref("");

const submit = () => {
  if (!title.value.trim()) return;
  emit("add", title.value, props.day);
  title.value = "";
};
</script>
