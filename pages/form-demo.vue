<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Form Demo</h1>

    <Card>
      <h2 class="text-2xl font-bold mb-6 text-gray-900">
        Base Components Showcase
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Text Input -->
        <BaseInput
          v-model="form.name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          required
          :error="errors.name"
        />

        <!-- Email Input -->
        <BaseInput
          v-model="form.email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          :error="errors.email"
        />

        <!-- Phone Input -->
        <BaseInput
          v-model="form.phone"
          type="tel"
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          :error="errors.phone"
        />

        <!-- Select -->
        <BaseSelect
          v-model="form.category"
          label="Category"
          :options="categoryOptions"
          required
          :error="errors.category"
        />

        <!-- Textarea -->
        <BaseTextarea
          v-model="form.message"
          label="Message"
          placeholder="Enter your message here..."
          :rows="5"
          required
          :error="errors.message"
        />

        <!-- Checkboxes -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-gray-700">Preferences</h3>
          <BaseCheckbox
            v-model="form.newsletter"
            label="Subscribe to newsletter"
          />
          <BaseCheckbox
            v-model="form.notifications"
            label="Enable notifications"
          />
          <BaseCheckbox
            v-model="form.terms"
            label="I agree to terms and conditions"
            required
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-6 border-t border-gray-200">
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="isSubmitting"
          >
            Submit Form
          </BaseButton>
          <BaseButton
            type="reset"
            variant="secondary"
            size="lg"
            @click="resetForm"
          >
            Reset
          </BaseButton>
        </div>
      </form>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <p class="text-green-800">✅ Form submitted successfully!</p>
      </div>

      <!-- Form Data Display -->
      <div
        v-if="Object.keys(form).length > 0"
        class="mt-8 p-4 bg-gray-50 rounded-lg"
      >
        <h3 class="font-bold mb-3 text-gray-900">Current Form Data:</h3>
        <pre class="text-sm text-gray-700 overflow-x-auto">{{
          JSON.stringify(form, null, 2)
        }}</pre>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

definePageMeta({
  layout: "sidebar",
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  newsletter: boolean;
  notifications: boolean;
  terms: boolean;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  message?: string;
}

const form = reactive<FormData>({
  name: "",
  email: "",
  phone: "",
  category: "",
  message: "",
  newsletter: false,
  notifications: false,
  terms: false,
});

const errors = reactive<Errors>({});
const isSubmitting = ref(false);
const showSuccess = ref(false);

const categoryOptions = [
  { label: "General Inquiry", value: "general" },
  { label: "Support", value: "support" },
  { label: "Sales", value: "sales" },
  { label: "Feedback", value: "feedback" },
];

const validateForm = (): boolean => {
  errors.name = form.name ? "" : "Name is required";
  errors.email = form.email ? "" : "Email is required";
  errors.category = form.category ? "" : "Category is required";
  errors.message = form.message ? "" : "Message is required";

  return !errors.name && !errors.email && !errors.category && !errors.message;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  showSuccess.value = false;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  showSuccess.value = true;
  isSubmitting.value = false;
};

const resetForm = () => {
  form.name = "";
  form.email = "";
  form.phone = "";
  form.category = "";
  form.message = "";
  form.newsletter = false;
  form.notifications = false;
  form.terms = false;
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof Errors];
  });
  showSuccess.value = false;
};
</script>
