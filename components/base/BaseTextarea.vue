<template>
  <div class="w-full">
    <BaseLabel v-if="label" :html-for="resolvedId" :required="required">
      {{ label }}
    </BaseLabel>
    <textarea
      :id="resolvedId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none transition-all"
    ></textarea>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
});

const autoId = useId();
const resolvedId = computed(() => props.id ?? `textarea-${autoId}`);

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
