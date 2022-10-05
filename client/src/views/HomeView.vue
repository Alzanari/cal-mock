<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <NavBar></NavBar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="1">
        <SideBar></SideBar>
      </b-col>
      <b-col>
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import router from "../router";

export default {
  components: {
    NavBar,
    SideBar,
  },
  mounted() {
    this.$store
      .dispatch("event/fetchEvents")
      .then(() => {
        this.$store.dispatch("user/fetchUsers");
      })
      .then(() => {
        if (this.$route.path == "/") {
          router.push("/calendar");
        } else {
          router.push(this.$route.path);
        }
      });
  },
};
</script>

<style>
body {
  background-color: whitesmoke;
}
button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
}
</style>
