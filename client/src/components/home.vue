<template>
    <div>
        <Header />
        <div class="d-flex">
          <Side />
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from "./children/headerBar.vue";
import Side from "./children/sideBar.vue";
import EventService from '../services/event.service';
import EventBus from "../common/EventBus";


export default {
    name:'home',
    components: {
        Header,
        Side
    },
    mounted() {
    EventService.getAllEvents().then(
      response => { console.log(response) },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      }
    );
    console.log(this.$store.state.auth);
  }
}
</script>

<style scoped>
</style>