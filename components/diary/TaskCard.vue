<template>
  <div
    class="flex items-center gap-3 p-3 rounded-lg border bg-white transition-colors group"
    :class="
      task.status === 'completed'
        ? 'border-gray-100 opacity-60'
        : 'border-gray-200 hover:border-indigo-200'
    "
  >
    <!-- Checkbox -->
    <button
      @click="$emit('toggle', task.id)"
      class="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
      :class="
        task.status === 'completed'
          ? 'bg-indigo-600 border-indigo-600 text-white'
          : 'border-gray-300 hover:border-indigo-400'
      "
    >
      <span v-if="task.status === 'completed'" class="text-xs leading-none"
        >✓</span
      >
    </button>

    <!-- Title / Inline Edit -->
    <div class="flex-1 min-w-0">
      <input
        v-if="isEditing"
        v-model="editValue"
        @blur="saveEdit"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
        class="w-full text-sm border-b border-indigo-400 focus:outline-none bg-transparent"
        ref="editRef"
      />
      <span
        v-else
        class="text-sm text-gray-800 truncate block cursor-pointer select-none"
        :class="{ 'line-through text-gray-400': task.status === 'completed' }"
        @dblclick="startEdit"
        :title="'Double-click to edit'"
      >
        {{ task.title }}
      </span>
    </div>

    <!-- Action Buttons -->
    <div
      class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        @click="startEdit"
        class="p-1 text-gray-400 hover:text-indigo-500 transition-colors text-xs"
        title="Edit"
      >
        ✏️
      </button>
      <button
        @click="$emit('delete', task.id)"
        class="p-1 text-gray-400 hover:text-red-500 transition-colors text-xs"
        title="Delete"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/diary";

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  toggle: [id: string];
  edit: [id: string, title: string];
  delete: [id: string];
}>();

const isEditing = ref(false);
const editValue = ref("");
const editRef = ref<HTMLInputElement | null>(null);

const startEdit = () => {
  editValue.value = props.task.title;
  isEditing.value = true;
  nextTick(() => editRef.value?.focus());
};

const saveEdit = () => {
  if (editValue.value.trim()) {
    emit("edit", props.task.id, editValue.value);
  }
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};
</script>
