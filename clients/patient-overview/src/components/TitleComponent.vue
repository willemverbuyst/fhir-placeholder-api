<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="title">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

.title h1 {
  text-align: center;
}
</style>
