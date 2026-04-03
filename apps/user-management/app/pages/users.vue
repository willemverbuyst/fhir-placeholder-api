<template>
  <main class="users-page">
    <section class="users-card">
      <h1 class="users-title">Users</h1>

      <p v-if="isCheckingAccess" class="users-message">Checking access...</p>
      <p v-else-if="isLoading" class="users-message">Loading users...</p>
      <p v-else-if="errorMessage" class="users-message users-message-error">
        {{ errorMessage }}
      </p>
      <table v-else class="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="2" class="users-empty">No users found.</td>
          </tr>
          <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
type User = {
  username: string;
  role: string;
};

type UsersListResponse = {
  users: User[];
};

type CurrentUserResponse = {
  role: string;
};

const users = ref<User[]>([]);
const isCheckingAccess = ref<boolean>(true);
const isLoading = ref<boolean>(true);
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

const isUser = (value: unknown): value is User => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.username === "string" && typeof record.role === "string";
};

const parseUsersListResponse = (value: unknown): UsersListResponse => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Invalid API response");
  }

  const record = value as Record<string, unknown>;
  const maybeUsers = record.users;
  if (!Array.isArray(maybeUsers) || !maybeUsers.every(isUser)) {
    throw new Error("Invalid users list format");
  }

  return { users: maybeUsers };
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

const ensureAdminAccess = async (): Promise<void> => {
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

const fetchUsers = async (): Promise<void> => {
  try {
    isLoading.value = true;
    errorMessage.value = null;
    const token = requireAuthToken();

    const response = await fetch("http://localhost:3000/api/users/list", {
      headers: getAuthHeader(token),
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("You are not authorized to view users.");
      }

      throw new Error("Failed to fetch users");
    }

    const responseBody: unknown = await response.json();
    const parsedResponse = parseUsersListResponse(responseBody);
    users.value = parsedResponse.users;
  } catch (error: unknown) {
    console.error("Failed to load users", error);
    users.value = [];
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Unable to load users. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  void (async () => {
    try {
      await ensureAdminAccess();
      await fetchUsers();
    } catch (error: unknown) {
      users.value = [];
      errorMessage.value =
        error instanceof Error
          ? error.message
          : "Unable to load users. Please try again.";
      isLoading.value = false;
    } finally {
      isCheckingAccess.value = false;
    }
  })();
});
</script>

<style scoped>
.users-page {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #f3f4f6;
}

.users-card {
  width: 100%;
  max-width: 42rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.users-title {
  margin: 0 0 1.25rem;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 700;
}

.users-message {
  margin: 0;
  color: #1f2937;
}

.users-message-error {
  color: #b91c1c;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
}

.users-table th,
.users-table td {
  padding: 0.7rem 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.users-table th {
  background: #f9fafb;
  color: #111827;
  font-weight: 700;
}

.users-empty {
  text-align: center;
  color: #6b7280;
}
</style>
