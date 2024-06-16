<template>
  <div>
    <AppHeader />
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div class="px-4 mt-16 sm:px-6 lg:px-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
useHead(
  {
    htmlAttrs: {
      class: 'h-full bg-gray-50',
    },
  }
)
</script>
