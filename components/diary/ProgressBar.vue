<template>
  <div class="w-full">
    <div class="flex justify-between text-sm text-gray-500 mb-1">
      <span>Progress</span>
      <span class="font-semibold" :class="percentColor">{{ percent }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="h-2.5 rounded-full transition-all duration-500"
        :class="barColor"
        :style="{ width: `${percent}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ percent: number }>();

const barColor = computed(() => {
  if (props.percent >= 100) return "bg-green-500";
  if (props.percent >= 50) return "bg-indigo-500";
  return "bg-yellow-400";
});

const percentColor = computed(() => {
  if (props.percent >= 100) return "text-green-600";
  if (props.percent >= 50) return "text-indigo-600";
  return "text-yellow-600";
});
</script>
