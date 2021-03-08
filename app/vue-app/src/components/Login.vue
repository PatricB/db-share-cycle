<template>
  <div class="sc-login">
    <button @click="authenticate()">
      Login with GitHub
    </button>
  </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        authenticate() {
            this.$store.dispatch('authenticate')
        }
    },
};
</script>

<style lang="scss">

.sc-login {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
