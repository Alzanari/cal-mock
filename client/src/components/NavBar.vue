<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/" class="mx-2"><b>Task App</b> </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
          <b-nav-item-dropdown right class="mx-3">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em class="text-light font-weight-bold mx-1">{{ getUser.username }}</em>
            </template>
            <b-dropdown-item href="#" @click="logout">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  computed: {
    getUser: function () {
      return this.$store.getters["auth/getUser"];
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped></style>
