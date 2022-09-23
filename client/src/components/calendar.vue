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

export default {
    name:'calendar',
    components: {
        Header,
        Side
    }
}
</script>

<style>
</style>