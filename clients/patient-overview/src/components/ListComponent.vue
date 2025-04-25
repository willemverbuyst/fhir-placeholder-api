<script setup lang="ts">
import type { BundleEntry, Patient } from "fhir/r5";
import { type Ref, computed, ref } from "vue";
import ListItemComponent from "./ListItemComponent.vue";

const list: Ref<(Patient & { id: string })[]> = ref([]);
const status: Ref<"active" | "inactive" | "all"> = ref("all");
const error = ref(null);

async function getPatients() {
  return await fetch("http://localhost:3000/api/v2/r5/Patient")
    .then((response) => response.json())
    .then((json) => {
      list.value = json.entry.map(
        (e: BundleEntry<Patient & { id: string }>) => e.resource,
      );
    })
    .catch((err) => {
      error.value = err;
    });
}

function updateActive(id: string) {
  const todo = list.value.find((i) => i.id === id);

  if (!todo) throw new Error("No todo found");

  const wasDone = todo.active;

  todo.active = !wasDone;
}

console.error(error);
getPatients();

function filterDone() {
  status.value = "active";
}
function removeFilter() {
  status.value = "all";
}
function filterTodo() {
  status.value = "inactive";
}

const classObjectAll = computed(() => ({
  selected: status.value === "all",
}));
const classObjectDone = computed(() => ({
  selected: status.value === "active",
}));
const classObjectTodo = computed(() => ({
  selected: status.value === "inactive",
}));
</script>

<template>
  <section class="btn-group">
    <button :class="classObjectAll" @click="removeFilter">All</button>
    <button :class="classObjectDone" @click="filterDone">Active</button>
    <button :class="classObjectTodo" @click="filterTodo">Inactive</button>
  </section>
  <div
    v-for="item in list.filter((i) =>
      status === 'all' ? i : status === 'active' ? i.active : !i.active
    )"
    :key="item.id"
  >
    <ListItemComponent
      :id="item.id"
      :active="Boolean(item.active)"
      @update-active="updateActive"
    >
      <template #id>{{ item.id }}</template>
      <template #name>{{
        item.name?.map((n) => n.given?.join(" ") + " " + n.family).join(", ")
      }}</template>
      <template v-if="item.active" #birthDate>{{ item.birthDate }}</template>
    </ListItemComponent>
  </div>
</template>

<style>
.btn-group button {
  border: 1px solid hsla(160, 100%, 37%, 1);
  color: white;
  padding: 10px 24px;
  cursor: pointer;
}

.btn-group button:not(:last-child) {
  border-right: none;
}

.btn-group button:hover,
.selected {
  background-color: hsla(160, 100%, 37%, 0.2);
}

button {
  background-color: hsla(160, 100%, 37%, 1);
}
</style>
