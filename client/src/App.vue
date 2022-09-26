<template>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
  import EventBus from "./common/EventBus";

export default {
  name: 'App',
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  }
};
</script>

<style>
</style>
