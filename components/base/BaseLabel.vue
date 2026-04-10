<template>
  <label :for="htmlFor" class="block text-sm font-medium text-gray-700 mb-1">
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  htmlFor?: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  required: false,
});
</script>
