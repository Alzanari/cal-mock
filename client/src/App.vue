<template>
  <b-container fluid :class="{ otherColor: isLoggingIn }" style="height: 100%">
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  computed: {
    isLoggingIn() {
      return this.$route.path === "/login";
    },
  },
};
</script>

<style>
.otherColor {
  background-color: #63f2fcde;
}
</style>
