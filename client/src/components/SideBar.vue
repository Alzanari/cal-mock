<template>
  <div class="d-flex flex-column flex-shrink-0 bg-light vh-100" style="width: 100px">
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <router-link to="/calendar" class="nav-link py-3 border-bottom">
          <font-awesome-icon icon="fa-solid fa-calendar-days" />
          <small>Calendrier</small>
        </router-link>
      </li>
      <li>
        <router-link v-if="!isAdmin" to="/list-view" class="nav-link py-3 border-bottom">
          <font-awesome-icon icon="fa-solid fa-list" /> <small>Liste</small>
        </router-link>
      </li>
      <li>
        <router-link v-if="isAdmin" to="/list-adm" class="nav-link py-3 border-bottom">
          <font-awesome-icon icon="fa-solid fa-list" /> <small>Liste</small>
        </router-link>
      </li>
      <li>
        <router-link v-if="isAdmin" to="/users" class="nav-link py-3 border-bottom">
          <font-awesome-icon icon="fa-solid fa-users" /> <small>Utilisateurs</small>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
  },
};
</script>

<style scoped>
body {
  background-color: #eee;
}
.nav-link {
  border-radius: 0px !important;
  transition: all 0.5s;
  width: 100px;
  display: flex;
  flex-direction: column;
}
.nav-link small {
  font-size: 12px;
}
.nav-link:hover {
  background-color: #52525240 !important;
}
.nav-link .svg-inline--fa {
  transition: all 0.5s;
  font-size: 20px;
}
.nav-link:hover .svg-inline--fa {
  transform: scale(1.3, 1.3);
}
</style>
