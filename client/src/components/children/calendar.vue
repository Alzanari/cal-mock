<template>
    <div>
        <Header />
        <Side />
        this is calendar
    </div>
</template>

<script>
import Header from "./headerBar.vue";
import Side from "./sideBar.vue";
import EventService from '../services/event.service';
import EventBus from "../common/EventBus";


export default {
    name:'calendar',
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
  }
}
</script>

<style>
</style>