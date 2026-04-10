<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">About Us</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <Card>
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed">
          We aim to provide a robust, scalable, and modern foundation for
          building web applications with Vue 3, Nuxt 4, and Tailwind CSS.
        </p>
      </Card>

      <Card>
        <h2 class="text-2xl font-bold mb-4 text-gray-900">
          Our Technology Stack
        </h2>
        <ul class="text-gray-600 space-y-2">
          <li>✓ Vue 3 Composition API</li>
          <li>✓ Nuxt 4 Meta Framework</li>
          <li>✓ Tailwind CSS</li>
          <li>✓ TypeScript</li>
          <li>✓ Bun Package Manager</li>
        </ul>
      </Card>
    </div>

    <Card class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-900">
        Why Choose This Stack?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
        <div>
          <h3 class="font-bold text-gray-900 mb-2">Vue 3</h3>
          <p>
            A progressive JavaScript framework with an intuitive API and
            excellent developer experience.
          </p>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 mb-2">Nuxt 4</h3>
          <p>
            A full-stack meta-framework providing file-based routing, SSR, and
            auto-imports out of the box.
          </p>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 mb-2">Tailwind CSS</h3>
          <p>
            A utility-first CSS framework that allows you to build modern
            designs quickly without leaving HTML.
          </p>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 mb-2">Bun</h3>
          <p>
            A fast, all-in-one JavaScript runtime and package manager for modern
            development.
          </p>
        </div>
      </div>
    </Card>

    <div class="text-center">
      <NuxtLink to="/">
        <Button variant="primary" size="lg">Back to Home</Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "sidebar",
});
</script>
