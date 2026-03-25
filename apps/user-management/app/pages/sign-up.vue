<template>
  <main class="sign-up-page">
    <section class="sign-up-card">
      <h1 class="sign-up-title">Sign Up</h1>
      <form class="sign-up-form" @submit.prevent="onSubmit">
        <div class="sign-up-field">
          <label class="sign-up-label" for="username">Username</label>
          <input
            class="sign-up-input"
            id="username"
            v-model="form.username"
            type="text"
            name="username"
            autocomplete="username"
            required
          />
        </div>

        <div class="sign-up-field">
          <label class="sign-up-label" for="password">Password</label>
          <input
            class="sign-up-input"
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            autocomplete="new-password"
            required
          />
        </div>

        <div class="sign-up-field">
          <label class="sign-up-label" for="role">Role</label>
          <select
            class="sign-up-input sign-up-select"
            id="role"
            v-model="form.role"
            name="role"
            required
          >
            <option value="admin">admin</option>
            <option value="super admin">super admin</option>
            <option value="manager">manager</option>
            <option value="editor">editor</option>
            <option value="user">user</option>
            <option value="guest">guest</option>
          </select>
        </div>

        <button class="sign-up-button" type="submit">Create account</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
type Role = "admin" | "super admin" | "manager" | "editor" | "user" | "guest";

type SignUpForm = {
  username: string;
  password: string;
  role: Role;
};

const form = ref<SignUpForm>({
  username: "",
  password: "",
  role: "user",
});

const onSubmit = (): void => {
  console.log({
    username: form.value.username,
    password: form.value.password,
    role: form.value.role,
  });
};
</script>

<style scoped>
.sign-up-page {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #f3f4f6;
}

.sign-up-card {
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.sign-up-title {
  margin: 0 0 1.25rem;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 700;
}

.sign-up-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sign-up-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sign-up-label {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.sign-up-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: #fff;
  color: #111827;
  font-size: 1rem;
}

.sign-up-input:focus {
  outline: 2px solid #93c5fd;
  outline-offset: 1px;
  border-color: #3b82f6;
}

.sign-up-select {
  cursor: pointer;
}

.sign-up-button {
  margin-top: 0.5rem;
  padding: 0.7rem 0.85rem;
  border: none;
  border-radius: 0.5rem;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.sign-up-button:hover {
  background: #1d4ed8;
}

.sign-up-button:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}
</style>
