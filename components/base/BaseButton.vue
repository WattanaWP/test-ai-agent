<template>
  <button
    v-show="isVisible"
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2',
      sizeClass,
      variantClass,
      { 'opacity-50 cursor-not-allowed': disabled || loading },
    ]"
  >
    <span v-if="loading" class="animate-spin">⏳</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  permission?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
});

const { hasPermission } = useAuth();

const isVisible = computed(() => {
  if (!props.permission) return true;
  return hasPermission(props.permission);
});

const variantClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800";
    case "secondary":
      return "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400";
    case "danger":
      return "bg-red-600 text-white hover:bg-red-700 active:bg-red-800";
    case "success":
      return "bg-green-600 text-white hover:bg-green-700 active:bg-green-800";
    default:
      return "";
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "";
  }
});
</script>
