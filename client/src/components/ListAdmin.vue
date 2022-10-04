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
          ref="tableAdmin"
          striped
          hover
          selectable
          no-select-on-click
          :items="events"
          :fields="fields"
          :head-variant="headVariant"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template v-slot:cell(select)="data">
            <b-form-checkbox
              v-model="selected"
              :value="data.item"
              name="selected-rows"
              @change="onRowSelected(data.index, data.rowSelected)"
            >
            </b-form-checkbox>
          </template>
          <template v-slot:cell(update)="data">
            <b-button v-if="globalSelect" id="pending" @click="statusUpdate(data.item.id, $event.target.id)"
              >P</b-button
            >
            <b-button
              v-if="globalSelect"
              id="validated"
              @click="statusUpdate(data.item.id, $event.target.id)"
              class="mx-1"
              >V</b-button
            >
            <b-button v-if="globalSelect" id="rejected" @click="statusUpdate(data.item.id, $event.target.id)"
              >R</b-button
            >
          </template>
          <template v-slot:cell(actions)="data">
            <b-button v-if="globalSelect" @click="showEditModal(data.item)">Edit</b-button>
            <b-button v-if="globalSelect" @click="showDeleteModal(data.item)" class="mx-1">Delete</b-button>
          </template>
        </b-table>
        <b-modal id="editModal" ref="editEventModal" title="Edit Event" @ok.prevent="submitFromEditModal">
          <EditForm ref="editEventForm" :event="currentEvent" />
        </b-modal>

        <b-modal id="deleteModal" ref="deleteEventModal" title="Delete Event" @ok.prevent="submitFromDeleteModal">
          <DeleteForm ref="deleteEventForm" :event="currentEvent" />
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex">
        <div class="me-auto">
          <b-button-group v-if="!globalSelect">
            <b-button id="deleteAll" @click="globalAction($event.target.id)">delete</b-button>
            <b-button id="pendAll" @click="globalAction($event.target.id)" variant="warning">pending</b-button>
            <b-button id="validateAll" @click="globalAction($event.target.id)" variant="success">validate</b-button>
            <b-button id="rejectAll" @click="globalAction($event.target.id)" variant="danger">reject</b-button>
          </b-button-group>
          <b-button v-if="globalSelect" id="export" @click="exportExcel" pill variant="outline-success" class="mx-1"
            >Export</b-button
          >
        </div>

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
      fields: ["select", "id", "user", "title", "comment", "start", "end", "allDay", "status", "update", "actions"],
      headVariant: "dark",
      filter: "",
      perPage: 10,
      currentPage: 1,
      currentEvent: null,
      selected: [],
    };
  },
  computed: {
    rows() {
      return this.events.length;
    },
    events() {
      return this.$store.getters["event/eventsTable"];
    },
    globalSelect() {
      return this.selected.length == 0;
    },
  },
  methods: {
    onRowSelected(index, checked) {
      let tableRef = this.$refs.tableAdmin;
      if (checked === false) {
        tableRef.selectRow(index);
      } else {
        tableRef.unselectRow(index);
      }
    },
    statusFilter(status) {
      if (status == "all") {
        status = "";
      }
      this.filter = status;
    },
    statusUpdate(eventId, status) {
      this.$store.dispatch("event/updateStatus", {
        id: eventId,
        status: status,
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
        this.$nextTick(() => {
          this.$refs.editEventModal.hide();
        });
      }
    },
    submitFromDeleteModal() {
      const data = this.$refs.deleteEventForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("event/deleteEvent", data);
        this.$nextTick(() => {
          this.$refs.deleteEventModal.hide();
        });
      }
    },
    exportExcel() {
      const data = this.$store.getters["event/eventsTable"];
      const fileName = "all_events";
      const exportType = exportFromJSON.types.csv;

      exportFromJSON({ data, fileName, exportType });
    },
    globalAction(elementId) {
      if (elementId === "deleteAll") {
        this.selected.forEach((select) => {
          this.$store.dispatch("event/deleteEvent", select);
        });
      }
      if (elementId === "pendAll") {
        this.selected.forEach((select) => {
          this.statusUpdate(select.id, "pending");
        });
      }
      if (elementId === "validateAll") {
        this.selected.forEach((select) => {
          this.statusUpdate(select.id, "validated");
        });
      }
      if (elementId === "rejectAll") {
        this.selected.forEach((select) => {
          this.statusUpdate(select.id, "rejected");
        });
      }
      this.selected = [];
      this.$refs.tableAdmin.clearSelected();
    },
  },
};
</script>

<style></style>
