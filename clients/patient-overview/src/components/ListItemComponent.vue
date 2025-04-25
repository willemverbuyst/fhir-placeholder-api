<script setup lang="ts">
defineProps<{
  id: string
  active: boolean
}>()
</script>

<template>
  <div class="item">
    <span :class="{ active: active }" @click="$emit('updateActive', id)">
      {{ id.split('-')[1] }}
    </span>

    <div class="details">
      <h3>
        <slot name="name"></slot>
      </h3>
      <p>
        <slot name="id"></slot>
      </p>
      <p><slot name="birthDate"></slot></p>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

span {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-red);
  color: #111;
}

span.active {
  background: var(--color-green);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 2rem;
  }

  span {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    background: var(--color-red);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  span.done {
    background: var(--color-green);
  }
}
</style>
