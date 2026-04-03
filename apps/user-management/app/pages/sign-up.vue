<template>
  <main class="sign-up-page">
    <section class="sign-up-card">
      <h1 class="sign-up-title">Sign Up</h1>
      <p v-if="errorMessage" class="sign-up-message sign-up-message-error">
        {{ errorMessage }}
      </p>
      <form v-if="isAuthorized" class="sign-up-form" @submit.prevent="onSubmit">
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
type Role = "admin" | "user" | "guest";

type SignUpForm = {
  username: string;
  password: string;
  role: Role;
};

type CurrentUserResponse = {
  role: string;
};

const form = ref<SignUpForm>({
  username: "",
  password: "",
  role: "user",
});
const isAuthorized = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

const getAuthHeader = (token: string): Record<string, string> => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

const requireAuthToken = (): string => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("You are not signed in. Please sign in.");
  }

  return token;
};

const parseCurrentUserResponse = (value: unknown): CurrentUserResponse => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Invalid API response");
  }

  const record = value as Record<string, unknown>;
  if (typeof record.role !== "string") {
    throw new Error("Invalid user format");
  }

  return {
    role: record.role,
  };
};

const validateAdminAccess = async (): Promise<void> => {
  const token = requireAuthToken();
  const response = await fetch("http://localhost:3000/api/users/me", {
    headers: getAuthHeader(token),
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  const responseBody: unknown = await response.json();
  const currentUser = parseCurrentUserResponse(responseBody);
  if (currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
};

const onSubmit = async (): Promise<void> => {
  try {
    errorMessage.value = null;
    const token = requireAuthToken();

    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      headers: {
        ...getAuthHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password,
        role: form.value.role,
      }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "You are not authorized to create users. Please sign in.",
        );
      }

      throw new Error("Sign-up failed. Please try again.");
    }

    const responseBody: unknown = await response.json();
    void responseBody;
    await navigateTo("/users");
  } catch (error: unknown) {
    console.error("Sign-up request failed", error);
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Sign-up failed. Please try again.";
  }
};

onMounted(() => {
  void (async () => {
    try {
      await validateAdminAccess();
      isAuthorized.value = true;
      errorMessage.value = null;
    } catch (error: unknown) {
      isAuthorized.value = false;
      errorMessage.value = "Unauthorized";
      console.error("Admin access validation failed", error);
    }
  })();
});
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

.sign-up-message {
  margin: 0 0 1rem;
}

.sign-up-message-error {
  color: #b91c1c;
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
