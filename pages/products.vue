<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Products</h1>

    <div class="mb-8">
      <p class="text-gray-600 mb-6">
        Explore our collection of sample products. This page demonstrates how to
        display product lists with Tailwind CSS and Vue components.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <Card v-for="product in products" :key="product.id">
        <div class="mb-4">
          <div
            class="w-full h-48 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center text-4xl"
          >
            {{ product.emoji }}
          </div>
        </div>
        <h3 class="text-xl font-bold mb-2 text-gray-900">{{ product.name }}</h3>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-indigo-600"
            >${{ product.price }}</span
          >
          <Button variant="primary">Add to Cart</Button>
        </div>
      </Card>
    </div>

    <div class="text-center">
      <NuxtLink to="/">
        <Button variant="primary" size="lg">Back to Home</Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

definePageMeta({
  layout: "sidebar",
});

const products: Product[] = [
  {
    id: 1,
    name: "Vue 3 Guide",
    description: "Complete guide to mastering Vue 3 Composition API",
    price: 29.99,
    emoji: "📚",
  },
  {
    id: 2,
    name: "Nuxt 4 Course",
    description: "Learn full-stack development with Nuxt 4",
    price: 49.99,
    emoji: "🎓",
  },
  {
    id: 3,
    name: "Tailwind Mastery",
    description: "Master utility-first CSS with Tailwind",
    price: 39.99,
    emoji: "🎨",
  },
  {
    id: 4,
    name: "TypeScript Pro",
    description: "Advanced TypeScript patterns and practices",
    price: 44.99,
    emoji: "💻",
  },
  {
    id: 5,
    name: "Web Performance",
    description: "Optimize your web applications for speed",
    price: 34.99,
    emoji: "⚡",
  },
  {
    id: 6,
    name: "Web Design",
    description: "Modern web design principles and practices",
    price: 39.99,
    emoji: "🖼️",
  },
];
</script>
