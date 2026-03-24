<template>
  <header class="header">
    <h1 class="header-title">Users Management</h1>
    <nav class="header-nav">
      <NuxtLink to="/" class="header-link" active-class="header-link-active"
        >Home</NuxtLink
      >
      <NuxtLink
        to="/users"
        class="header-link"
        active-class="header-link-active"
        >Users</NuxtLink
      >
      <NuxtLink
        to="/sign-up"
        class="header-link"
        active-class="header-link-active"
        >Sign Up</NuxtLink
      >
    </nav>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  padding: 2rem;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  background: linear-gradient(90deg, #4f8cff 0%, #15439c 100%);
  padding: 2rem 0 1.25rem;
  box-shadow: 0 4px 20px 0 rgba(80, 110, 180, 0.07);
  color: #fff;
  margin-bottom: 2rem;
}

.header-title {
  font-size: 2.3rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 8px rgba(21, 67, 156, 0.13);
}

.header-nav {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  font-size: 1.08rem;
  margin-top: 0.5rem;
}

.header-link {
  color: #e4ecff;
  font-weight: 500;
  border-bottom: 2.5px solid transparent;
  transition:
    border 0.15s,
    color 0.15s;
  padding-bottom: 0.13rem;
}

.header-link-active {
  color: #fff;
}

.header-link:hover {
  color: #b9d6ff;
}
</style>
