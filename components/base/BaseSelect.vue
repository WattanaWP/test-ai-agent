<template>
  <div class="w-full">
    <BaseLabel v-if="label" :html-for="resolvedId" :required="required">
      {{ label }}
    </BaseLabel>
    <select
      :id="resolvedId"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
    >
      <option value="">{{ placeholder || "Select an option" }}</option>
      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number;
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const autoId = useId();
const resolvedId = computed(() => props.id ?? `select-${autoId}`);

defineEmits<{
  "update:modelValue": [value: string | number];
}>();
</script>
