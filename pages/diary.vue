<template>
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">📔 Daily Diary</h1>
      <p class="text-gray-500 mt-1">{{ formattedDate }}</p>
    </div>

    <!-- Tab Switcher -->
    <div class="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all"
        :class="
          activeTab === tab.key
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        "
      >
        {{ tab.label }}
        <span
          v-if="tasksByDay[tab.key].length"
          class="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full"
          :class="
            activeTab === tab.key
              ? 'bg-indigo-100 text-indigo-600'
              : 'bg-gray-200 text-gray-500'
          "
        >
          {{ tasksByDay[tab.key].length }}
        </span>
      </button>
    </div>

    <!-- Progress Bar -->
    <div class="mb-6">
      <DiaryProgressBar :percent="progressByDay[activeTab]" />
    </div>

    <!-- Task Input -->
    <div class="mb-4">
      <DiaryTaskInput :day="activeTab" @add="addTask" />
    </div>

    <!-- Task List -->
    <div class="mb-8 min-h-[80px]">
      <TransitionGroup name="task-list" tag="div" class="space-y-2">
        <DiaryTaskCard
          v-for="task in tasksByDay[activeTab]"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @edit="editTask"
          @delete="deleteTask"
        />
      </TransitionGroup>
      <div
        v-if="!tasksByDay[activeTab].length"
        class="flex flex-col items-center justify-center py-12 text-gray-400"
      >
        <span class="text-4xl mb-2">{{ emptyIcon }}</span>
        <p class="text-sm">{{ emptyMessage }}</p>
      </div>
    </div>

    <!-- Daily Note -->
    <div class="border-t border-gray-100 pt-6">
      <DiaryDailyNote :date-key="activeDateKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DaySlot } from "~/types/diary";
import { todayKey, offsetKey } from "~/utils/dateKeys";

definePageMeta({ layout: "sidebar" });

const {
  tasksByDay,
  progressByDay,
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  rollover,
} = useTasks();

const activeTab = ref<DaySlot>("today");

const tabs = [
  { key: "yesterday" as DaySlot, label: "⏮ Yesterday" },
  { key: "today" as DaySlot, label: "📌 Today" },
  { key: "tomorrow" as DaySlot, label: "⏭ Tomorrow" },
];

const activeDateKey = computed(() => {
  if (activeTab.value === "yesterday") return offsetKey(-1);
  if (activeTab.value === "tomorrow") return offsetKey(1);
  return todayKey();
});

const formattedDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
);

const emptyIcon = computed(() => {
  if (activeTab.value === "yesterday") return "🌅";
  if (activeTab.value === "tomorrow") return "🌙";
  return "✅";
});

const emptyMessage = computed(() => {
  if (activeTab.value === "yesterday") return "Nothing recorded for yesterday";
  if (activeTab.value === "tomorrow")
    return "Plan ahead — add tasks for tomorrow";
  return "All clear! Add a task to get started";
});

onMounted(() => rollover());
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.25s ease;
}
.task-list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.task-list-leave-to {
  opacity: 0;
  transform: translateX(16px);
}
</style>
