<template>
  <div>
    <label class="block text-sm font-medium text-gray-600 mb-2"
      >📝 Daily Note</label
    >
    <textarea
      :value="noteText"
      @input="handleInput"
      placeholder="How was your day? Write anything here..."
      rows="4"
      class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none bg-amber-50 placeholder-gray-400"
    ></textarea>
    <p class="text-xs text-gray-400 mt-1 text-right">Auto-saved</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ dateKey: string }>();
const { getNote, saveNote } = useDiaryNote();

const noteText = ref(getNote(props.dateKey));

watch(
  () => props.dateKey,
  (key) => {
    noteText.value = getNote(key);
  },
);

let saveTimer: ReturnType<typeof setTimeout>;
const handleInput = (e: Event) => {
  noteText.value = (e.target as HTMLTextAreaElement).value;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveNote(props.dateKey, noteText.value);
  }, 600);
};

onUnmounted(() => clearTimeout(saveTimer));
</script>
