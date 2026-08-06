<template>
  <div class="layout-default">
    <AppHeader />
    <main class="layout-default__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Default layout with header + main + footer
</script>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-default__main {
  flex: 1;
  padding-top: var(--header-height);
}
</style>
