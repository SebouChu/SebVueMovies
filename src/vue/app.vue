<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <a class="navbar-brand" href="#">{{ title }}</a>
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