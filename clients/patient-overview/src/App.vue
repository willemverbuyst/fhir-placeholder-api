<script setup lang="ts">
import ListComponent from './components/ListComponent.vue'
import TitleComponent from './components/TitleComponent.vue'
</script>

<template>
  <header>
    <TitleComponent msg="Patients" />
  </header>

  <main>
    <ListComponent />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
