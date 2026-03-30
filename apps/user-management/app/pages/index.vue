<template>
  <main class="login-page">
    <section class="login-card">
      <h1 class="login-title">Sign In</h1>

      <p v-if="errorMessage" class="login-message login-message-error">
        {{ errorMessage }}
      </p>

      <form class="login-form" @submit.prevent="onSubmit">
        <div class="login-field">
          <label class="login-label" for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            class="login-input"
            type="text"
            name="username"
            autocomplete="username"
            required
          />
        </div>

        <div class="login-field">
          <label class="login-label" for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            class="login-input"
            type="password"
            name="password"
            autocomplete="current-password"
            required
          />
        </div>

        <button class="login-button" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Signing in..." : "Sign in" }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
type LoginForm = {
  username: string;
  password: string;
};

type SignInResponse = {
  token: string;
};

const form = ref<LoginForm>({
  username: "",
  password: "",
});
const errorMessage = ref<string | null>(null);
const isSubmitting = ref<boolean>(false);

const parseSignInResponse = (value: unknown): SignInResponse => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Invalid sign-in response");
  }

  const record = value as Record<string, unknown>;
  if (typeof record.token !== "string" || record.token.length === 0) {
    throw new Error("Sign-in response did not include a valid token");
  }

  return { token: record.token };
};

const resetForm = (): void => {
  form.value = {
    username: "",
    password: "",
  };
};

const onSubmit = async (): Promise<void> => {
  try {
    isSubmitting.value = true;
    errorMessage.value = null;

    const response = await fetch("http://localhost:3000/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Sign-in failed. Please check your credentials.");
    }

    const responseBody: unknown = await response.json();
    const parsedResponse = parseSignInResponse(responseBody);
    localStorage.setItem("authToken", parsedResponse.token);

    await navigateTo("/users");
  } catch (error: unknown) {
    console.error("Sign-in request failed", error);
    resetForm();
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Sign-in failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #f3f4f6;
}

.login-card {
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.login-title {
  margin: 0 0 1rem;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 700;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.login-label {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.login-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: #fff;
  color: #111827;
  font-size: 1rem;
}

.login-input:focus {
  outline: 2px solid #93c5fd;
  outline-offset: 1px;
  border-color: #3b82f6;
}

.login-button {
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

.login-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.login-button:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}

.login-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.login-message {
  margin: 0 0 1rem;
}

.login-message-error {
  color: #b91c1c;
}
</style>
