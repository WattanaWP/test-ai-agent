<template>
  <div>
    <!-- Hero Section -->
    <section class="mb-12">
      <div
        class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-12 text-center"
      >
        <h1 class="text-5xl font-bold mb-4">Welcome to Nuxt 3</h1>
        <p class="text-xl mb-8 opacity-90">
          A modern Vue 3 + Nuxt 4 + Tailwind application
        </p>
        <div class="flex gap-4 justify-center">
          <Button variant="primary" size="lg" permission="create"
            >Get Started</Button
          >
          <Button variant="secondary" size="lg">Learn More</Button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-8">Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-bold mb-2 text-gray-900">Fast Performance</h3>
          <p class="text-gray-600">
            Built on Vue 3 and Nuxt 4 for blazingly fast applications.
          </p>
        </Card>
        <Card>
          <div class="text-4xl mb-4">🎨</div>
          <h3 class="text-xl font-bold mb-2 text-gray-900">Tailwind CSS</h3>
          <p class="text-gray-600">
            Utility-first CSS for rapid UI development and customization.
          </p>
        </Card>
        <Card>
          <div class="text-4xl mb-4">🚀</div>
          <h3 class="text-xl font-bold mb-2 text-gray-900">Ready to Deploy</h3>
          <p class="text-gray-600">
            Pre-configured and ready to deploy to your favorite platform.
          </p>
        </Card>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gray-100 rounded-lg p-12 text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to build something amazing?</h2>
      <p class="text-gray-600 mb-8">
        Start building your next project with this starter template.
      </p>
      <Button variant="primary" size="lg">Start Building</Button>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "sidebar",
});
</script>
