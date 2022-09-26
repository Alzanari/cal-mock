<template>
    <div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem">
    <a
        href="/"
        class="d-block p-3 link-dark text-decoration-none"
        title=""
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-original-title="Logo"
    >
        <img
        scr="../assets/images/image-4.jpeg"
        class="bi"
        width="40"
        height="32"
        />
        <span class="visually-hidden">Logo</span>
    </a>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
        <router-link 
            to="/"
            class="nav-link active py-3 border-bottom"
            aria-current="page"
            title=""
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Calendar"
        >
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
        </router-link>
        </li>
        <li>
        <router-link
            v-if="!isAdmin"
            to="/list-view"
            class="nav-link py-3 border-bottom"
            title=""
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="List"
        >
            <font-awesome-icon icon="fa-solid fa-bars" />
        </router-link>
        </li>
        <li>
        <router-link
            v-if="isAdmin"
            to="/list-manage"
            class="nav-link py-3 border-bottom"
            title=""
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="List"
        >
            <font-awesome-icon icon="fa-solid fa-bars" />
        </router-link>
        </li>
        <li>
        <router-link
            v-if="isAdmin"
            to="/users"
            class="nav-link py-3 border-bottom"
            title=""
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Users"
        >
            <font-awesome-icon icon="fa-solid fa-user" />
        </router-link>
        </li>
    </ul>
    </div>
</template>

<script>

export default {
  name: 'sidebar',
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>

<style>
</style>