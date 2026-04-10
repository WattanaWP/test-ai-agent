<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-gray-900 text-gray-100 fixed h-screen overflow-y-auto transition-transform duration-300"
      :class="{ '-translate-x-full md:translate-x-0': !sidebarOpen }"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-gray-800">
        <NuxtLink
          to="/"
          class="text-2xl font-bold text-indigo-400 hover:text-indigo-300"
        >
          Nuxt App
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="p-6">
        <ul class="space-y-4">
          <li>
            <NuxtLink
              to="/"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              :class="{ 'bg-gray-800 text-indigo-400': route.path === '/' }"
            >
              <span class="text-xl">🏠</span>
              <span>Home</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              :class="{
                'bg-gray-800 text-indigo-400': route.path === '/about',
              }"
            >
              <span class="text-xl">ℹ️</span>
              <span>About</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/products"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              :class="{
                'bg-gray-800 text-indigo-400': route.path === '/products',
              }"
            >
              <span class="text-xl">📦</span>
              <span>Products</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/form-demo"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              :class="{
                'bg-gray-800 text-indigo-400': route.path === '/form-demo',
              }"
            >
              <span class="text-xl">📋</span>
              <span>Form Demo</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/diary"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              :class="{
                'bg-gray-800 text-indigo-400': route.path === '/diary',
              }"
            >
              <span class="text-xl">📔</span>
              <span>Daily Diary</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer -->
      <div class="absolute bottom-0 w-full p-6 border-t border-gray-800">
        <!-- Role Switcher -->
        <div class="mb-4">
          <p class="text-xs text-gray-400 mb-2">
            Role:
            <span class="text-indigo-400 font-bold">{{
              currentUser.role
            }}</span>
          </p>
          <div class="flex gap-1">
            <button
              v-for="role in ['guest', 'user', 'admin'] as const"
              :key="role"
              @click="setRole(role)"
              :class="[
                'flex-1 text-xs py-1 rounded transition-colors',
                currentUser.role === role
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
              ]"
            >
              {{ role }}
            </button>
          </div>
        </div>
        <div class="text-xs text-gray-400">
          <p>Version {{ appVersion }}</p>
          <p class="mt-2">Built with Vue 3, Nuxt 4 & Tailwind</p>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 md:ml-64">
      <!-- Top Bar -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="px-6 py-4 flex justify-between items-center">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="md:hidden text-gray-600 hover:text-gray-900"
          >
            <span class="text-2xl">☰</span>
          </button>
          <div class="flex-1"></div>
          <div class="flex items-center gap-4">
            <button class="text-gray-600 hover:text-gray-900">🔔</button>
            <button class="text-gray-600 hover:text-gray-900">⚙️</button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const sidebarOpen = ref(true);
const appVersion = "1.0.0";
const route = useRoute();
const { currentUser, setRole } = useAuth();
</script>
