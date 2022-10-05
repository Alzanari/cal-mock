<template>
  <div>
    <h2 class="my-2">Liste des tâches</h2>
    <b-alert
      v-model="showBottom"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000"
      variant="warning"
      dismissible
    >
      L'action n'a pas réussi
    </b-alert>
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
        <b-form-input v-model="filter" type="search" placeholder="Rechercher"></b-form-input>
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
            <b-button
              v-if="globalSelect"
              variant="outline-warning"
              id="pending"
              @click="statusUpdate(data.item.id, $event.target.id)"
              ><font-awesome-icon icon="fa-solid fa-spinner" color="orange" @click.prevent
            /></b-button>
            <b-button
              v-if="globalSelect"
              variant="outline-success"
              id="validated"
              @click="statusUpdate(data.item.id, $event.target.id)"
              class="mx-1"
              ><font-awesome-icon icon="fa-solid fa-check" color="green"
            /></b-button>
            <b-button
              v-if="globalSelect"
              variant="outline-danger"
              id="rejected"
              @click="statusUpdate(data.item.id, $event.target.id)"
              ><font-awesome-icon icon="fa-solid fa-xmark" color="red"
            /></b-button>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button v-if="globalSelect" @click="showEditModal(data.item)" variant="outline-secondary"
              >Modifié</b-button
            >
            <b-button v-if="globalSelect" @click="showDeleteModal(data.item)" variant="outline-dark" class="mx-1"
              >Supprimé</b-button
            >
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
            <b-button id="deleteAll" @click="globalAction($event.target.id)">Supprimé</b-button>
            <b-button id="pendAll" @click="globalAction($event.target.id)" variant="warning">En attente</b-button>
            <b-button id="validateAll" @click="globalAction($event.target.id)" variant="success">Valide</b-button>
            <b-button id="rejectAll" @click="globalAction($event.target.id)" variant="danger">Rejeté</b-button>
          </b-button-group>
          <b-button v-if="globalSelect" id="export" @click="exportExcel" pill variant="outline-success" class="mx-1"
            >Exporter</b-button
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
      sortBy: "id",
      sortDesc: true,
      filter: "",
      perPage: 10,
      currentPage: 1,
      currentEvent: null,
      selected: [],
      showBottom: false,
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
      console.log(status);
      this.$store
        .dispatch("event/updateStatus", {
          id: eventId,
          status: status,
        })
        .then((value) => {
          if (value.status !== 200 || value.status !== 401) {
            this.showBottom = true;
          }
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
        this.$store.dispatch("event/updateEvent", data).then((value) => {
          if (value.status !== 200 || value.status !== 401) {
            this.showBottom = true;
          }
        });
        this.$nextTick(() => {
          this.$refs.editEventModal.hide();
        });
      }
    },
    submitFromDeleteModal() {
      const data = this.$refs.deleteEventForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("event/deleteEvent", data).then((value) => {
          if (value.status !== 200 || value.status !== 401) {
            this.showBottom = true;
          }
        });
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
          this.$store.dispatch("event/deleteEvent", select).then((value) => {
            if (value.status !== 200 || value.status !== 401) {
              this.showBottom = true;
            }
          });
        });
      }
      if (elementId === "pendAll") {
        this.selected.forEach((select) => {
          this.statusUpdate(select.id, "pending").then((value) => {
            if (value.status !== 200 || value.status !== 401) {
              this.showBottom = true;
            }
          });
        });
      }
      if (elementId === "validateAll") {
        this.selected.forEach((select) => {
          this.statusUpdate(select.id, "validated").then((value) => {
            if (value.status !== 200 || value.status !== 401) {
              this.showBottom = true;
            }
          });
        });
      }
      if (elementId === "rejectAll") {
        this.selected.forEach((select) => {
          this.statusUpdate(select.id, "rejected").then((value) => {
            if (value.status !== 200 || value.status !== 401) {
              this.showBottom = true;
            }
          });
        });
      }
      this.selected = [];
      this.$refs.tableAdmin.clearSelected();
    },
  },
};
</script>

<style scoped>
button > svg {
  pointer-events: none;
}
button:hover > .fa-spinner {
  color: white;
}
.fa-spinner:hover {
  color: white;
}
button:hover > .fa-check {
  color: white;
}
.fa-check:hover {
  color: white;
}
button:hover > .fa-xmark {
  color: white;
}
.fa-xmark:hover {
  color: white;
}
</style>
