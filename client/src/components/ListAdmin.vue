<template>
  <div>
    <h2>Events table</h2>
    <b-row>
      <b-col>
        <b-button id="all" @click="statusFilter($event.target.id)" pill variant="outline-secondary">All</b-button>
        <b-button id="pending" @click="statusFilter($event.target.id)" pill class="mx-1" variant="warning"
          >Pending</b-button
        >
        <b-button id="validated" @click="statusFilter($event.target.id)" pill class="mx-1" variant="success"
          >Validated</b-button
        >
        <b-button id="rejected" @click="statusFilter($event.target.id)" pill variant="danger">Rejected</b-button>
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
          :items="events"
          :fields="fields"
          :head-variant="headVariant"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template v-slot:cell(update)="data">
            <b-button id="pending" @click="statusUpdate(data.item.id, $event.target.id)">P</b-button>
            <b-button id="validated" @click="statusUpdate(data.item.id, $event.target.id)" class="mx-1">V</b-button>
            <b-button id="rejected" @click="statusUpdate(data.item.id, $event.target.id)">R</b-button>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button @click="showEditModal(data.item)">Edit</b-button>
            <b-button @click="showDeleteModal(data.item)" class="mx-1">Delete</b-button>
          </template>
        </b-table>
        <b-modal ref="editEventModal" title="Edit Event" @ok.prevent="submitFromEditModal">
          <EditForm ref="editEventForm" :event="currentEvent" />
        </b-modal>

        <b-modal ref="deleteEventModal" title="Delete Event" @ok.prevent="submitFromDeleteModal">
          <DeleteForm ref="deleteEventForm" :event="currentEvent" />
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex">
        <b-button id="export" @click="exportExcel" class="me-auto" pill variant="outline-success">Export</b-button>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="my-auto"></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EditForm from "./forms/EventEditForm.vue";
import DeleteForm from "./forms/EventDeleteForm.vue";
import exportFromJSON from "export-from-json";

export default {
  name: "ListAdmin",
  components: {
    EditForm,
    DeleteForm,
  },
  data() {
    return {
      fields: ["id", "user", "title", "comment", "start", "end", "allDay", "status", "update", "actions"],
      headVariant: "dark",
      filter: "",
      perPage: 10,
      currentPage: 1,
      currentEvent: null,
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
    statusUpdate(eventId, status) {
      let color = "";
      switch (status) {
        case "pending":
          color = "#FF6F0E";
          break;

        case "validated":
          color = "#0CB100";
          break;

        case "rejected":
          color = "#DA0303";
          break;
        default:
          break;
      }
      this.$store.dispatch("event/updateStatus", {
        id: eventId,
        status: status,
        color: color,
      });
    },
    showEditModal(event) {
      let task = JSON.parse(JSON.stringify(event));
      this.currentEvent = task;
      this.$refs.editEventModal.show();
    },
    showDeleteModal(event) {
      let task = JSON.parse(JSON.stringify(event));
      this.currentEvent = task;
      this.$refs.deleteEventModal.show();
    },
    submitFromEditModal() {
      const data = this.$refs.editEventForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("event/updateEvent", data);
      }
    },
    submitFromDeleteModal() {
      const data = this.$refs.deleteEventForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("event/deleteEvent", data);
      }
    },
    exportExcel() {
      const data = this.$store.getters["event/eventsTable"];
      const fileName = "all_events";
      const exportType = exportFromJSON.types.csv;

      exportFromJSON({ data, fileName, exportType });
    },
  },
  mounted() {
    this.$store.dispatch("event/fetchEvents");
  },
};
</script>

<style></style>
