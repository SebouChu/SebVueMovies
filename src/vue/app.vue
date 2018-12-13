<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <router-link :to="{ name: 'home' }" class="navbar-brand">{{ title }}</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'SebVueMovies'
    }
  }
}
</script>