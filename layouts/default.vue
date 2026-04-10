<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
          Nuxt App
        </NuxtLink>
        <ul class="flex gap-6">
          <li>
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/products"
              class="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Products
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-white font-bold mb-4">About</h3>
            <p class="text-sm">Built with Vue 3, Nuxt 4, and Tailwind CSS</p>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Links</h3>
            <ul class="text-sm space-y-2">
              <li><a href="https://nuxt.com" class="hover:text-white">Nuxt Docs</a></li>
              <li><a href="https://vue.org" class="hover:text-white">Vue Docs</a></li>
              <li><a href="https://tailwindcss.com" class="hover:text-white">Tailwind Docs</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Contact</h3>
            <p class="text-sm">hello@example.com</p>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 Nuxt App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout component - wraps all pages
</script>
