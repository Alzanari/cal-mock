<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand mx-3 me-auto">Task App</a>


      <div class="navbar-nav mx-3">
        <li class="nav-item">
          <font-awesome-icon icon="fa-solid fa-user" />
            {{ currentUser.username }}
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
</style>