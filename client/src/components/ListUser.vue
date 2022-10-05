<template>
  <div>
    <h2 class="my-2">Liste des tâches</h2>
    <b-row>
      <b-col class="my-2">
        <b-button id="all" @click="statusFilter($event.target.id)" pill variant="outline-secondary">Tous</b-button>
        <b-button id="pending" @click="statusFilter($event.target.id)" pill class="mx-1" variant="warning"
          >En attente</b-button
        >
        <b-button id="validated" @click="statusFilter($event.target.id)" pill class="mx-1" variant="success"
          >Valide</b-button
        >
        <b-button id="rejected" @click="statusFilter($event.target.id)" pill variant="danger">Rejeté</b-button>
      </b-col>
      <b-col cols="3">
        <b-form-input v-model="filter" type="search" placeholder="Seach"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          responsive
          primary-key="id"
          :items="events"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
        >
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex">
        <b-button id="export" @click="exportExcel" class="me-auto" pill variant="outline-success">Exporter</b-button>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="my-auto"></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import exportFromJSON from "export-from-json";

export default {
  name: "ListUser",
  data() {
    return {
      fields: ["id", "user", "title", "comment", "start", "end", "allDay", "status"],
      sortBy: "id",
      sortDesc: true,
      filter: "",
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.events.length;
    },
    events() {
      return this.$store.getters["event/eventsTable"];
    },
  },
  methods: {
    statusFilter(status) {
      if (status == "all") {
        status = "";
      }
      this.filter = status;
    },
    exportExcel() {
      const data = this.$store.getters["event/eventsTable"];
      const fileName = "all_events";
      const exportType = exportFromJSON.types.csv;

      exportFromJSON({ data, fileName, exportType });
    },
  },
};
</script>

<style></style>
