<template>
  <div class="flex items-center">
    <input
      :id="resolvedId"
      :checked="modelValue"
      type="checkbox"
      :disabled="disabled"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
      class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
    />
    <BaseLabel v-if="label" :html-for="resolvedId" class="ml-2 mb-0">
      {{ label }}
    </BaseLabel>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const autoId = useId();
const resolvedId = computed(() => props.id ?? `checkbox-${autoId}`);

defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>
