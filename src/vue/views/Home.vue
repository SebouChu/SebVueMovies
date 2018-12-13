<template>
<div class="container">
  <h1>{{ message }}</h1>

  <p v-if="loadingState">Loading...</p>
  <div v-if="!loadingState">C'est bon !</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Welcome.'
    }
  },
  computed: {
    loadingState() {
      return this.$store.state.loadingState;
    }
  }
}
</script>