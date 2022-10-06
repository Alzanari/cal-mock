<template>
  <div>
    <h2 class="my-2">Liste des utilisateurs</h2>
    <b-row>
      <b-col class="my-2">
        <b-button pill variant="outline-secondary" @click="showAddModal()">Ajouter un utilisateur</b-button>
      </b-col>
      <b-col cols="3">
        <b-form-input v-model="filter" type="search" placeholder="Rechercher"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          ref="userTableAdmin"
          striped
          hover
          selectable
          no-select-on-click
          responsive
          primary-key="id"
          :items="users"
          :fields="fields"
          :head-variant="headVariant"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template v-slot:cell(select)="data">
            <b-form-checkbox
              v-if="currentAdmin.id !== data.item.id"
              v-model="selected"
              :value="data.item"
              name="selected-rows"
              @change="onRowSelected(data.index, data.rowSelected)"
            >
            </b-form-checkbox>
          </template>
          <template v-slot:cell(permissions)="data">
            <b-button
              v-if="data.item.admin == 'No' && globalSelect"
              @click="setAdmin(data.item.id)"
              class="mx-auto"
              variant="outline-success"
              ><font-awesome-icon icon="fa-solid fa-plus" color="green"
            /></b-button>
            <b-button
              v-if="data.item.admin == 'Yes' && currentAdmin.id !== data.item.id && globalSelect"
              @click="removeAdmin(data.item.id)"
              class="mx-auto"
              variant="outline-danger"
              ><font-awesome-icon icon="fa-solid fa-minus" color="red"
            /></b-button>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button v-if="globalSelect" @click="showPassModal(data.item)" variant="outline-info"
              >Mot de passe</b-button
            >
            <b-button v-if="globalSelect" @click="showEditModal(data.item)" variant="outline-secondary" class="mx-1"
              >Modifié</b-button
            >
            <b-button
              v-if="currentAdmin.id !== data.item.id && globalSelect"
              @click="showDeleteModal(data.item)"
              variant="outline-dark"
              >Supprimé</b-button
            >
          </template>
        </b-table>
        <b-modal ref="editPassModal" title="Edit User's Password" @ok.prevent="submitFromPassModal">
          <PassForm ref="editPassForm" :user="currentUser" />
        </b-modal>

        <b-modal ref="editUserModal" title="Edit User" @ok.prevent="submitFromEditModal">
          <EditForm ref="editUserForm" :user="currentUser" />
        </b-modal>

        <b-modal ref="deleteUserModal" title="Delete User" @ok.prevent="submitFromDeleteModal">
          <DeleteForm ref="deleteUserForm" :user="currentUser" />
        </b-modal>
        <b-modal ref="addUserModal" title="Add User" @ok.prevent="submitFromAddModal">
          <AddForm ref="addUserForm" />
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex">
        <div class="me-auto">
          <b-button-group v-if="!globalSelect">
            <b-button id="deleteAll" @click="globalAction($event.target.id)">Supprimé</b-button>
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
import EditForm from "./forms/UserEditForm.vue";
import PassForm from "./forms/UserPassForm.vue";
import DeleteForm from "./forms/UserDeleteForm.vue";
import AddForm from "./forms/UserAddForm.vue";
import exportFromJSON from "export-from-json";

export default {
  name: "ListUser",
  components: {
    EditForm,
    PassForm,
    DeleteForm,
    AddForm,
  },
  data() {
    return {
      fields: ["sélection", "id", "username", "email", "admin", "permissions", "actions"],
      headVariant: "dark",
      filter: "",
      perPage: 10,
      currentPage: 1,
      currentUser: null,
      selected: [],
    };
  },
  computed: {
    rows() {
      return this.users.length;
    },
    users() {
      return this.$store.getters["user/allUsers"];
    },
    currentAdmin() {
      return this.$store.getters["auth/getUser"];
    },
    globalSelect() {
      return this.selected.length == 0;
    },
  },
  methods: {
    onRowSelected(index, checked) {
      let tableRef = this.$refs.userTableAdmin;
      if (checked === false) {
        tableRef.selectRow(index);
      } else {
        tableRef.unselectRow(index);
      }
    },
    exportExcel() {
      const data = this.$store.getters["user/allUsers"];
      const fileName = "all_users";
      const exportType = exportFromJSON.types.csv;

      exportFromJSON({ data, fileName, exportType });
    },
    setAdmin(id) {
      this.$store.dispatch("user/setAdmin", {
        id: id,
      });
    },
    removeAdmin(id) {
      this.$store.dispatch("user/removeAdmin", {
        id: id,
      });
    },
    showAddModal() {
      this.$refs.addUserModal.show();
    },
    showPassModal(user) {
      let task = JSON.parse(JSON.stringify(user));
      this.currentUser = task;
      this.$refs.editPassModal.show();
    },
    showEditModal(user) {
      let task = JSON.parse(JSON.stringify(user));
      this.currentUser = task;
      this.$refs.editUserModal.show();
    },
    showDeleteModal(user) {
      let task = JSON.parse(JSON.stringify(user));
      this.currentUser = task;
      this.$refs.deleteUserModal.show();
    },
    submitFromAddModal() {
      const data = this.$refs.addUserForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("user/addUser", data);
        this.$nextTick(() => {
          this.$refs.addUserModal.hide();
        });
      }
    },
    submitFromPassModal() {
      const data = this.$refs.editPassForm.submit();
      if (data) {
        this.$store.dispatch("user/updatePassword", data);
        this.$nextTick(() => {
          this.$refs.editPassModal.hide();
        });
      }
    },
    submitFromEditModal() {
      const data = this.$refs.editUserForm.submit();
      if (data) {
        this.$store.dispatch("user/updateUser", data);
        this.$nextTick(() => {
          this.$refs.editUserModal.hide();
        });
      }
    },
    submitFromDeleteModal() {
      const data = this.$refs.deleteUserForm.submit();
      if (data) {
        this.$store.dispatch("user/deleteUser", data);
        this.$nextTick(() => {
          this.$refs.deleteUserModal.hide();
        });
      }
    },
    globalAction(elementId) {
      if (elementId === "deleteAll") {
        this.selected.forEach((select) => {
          this.$store.dispatch("user/deleteUser", select);
          this.selected = [];
          this.$refs.userTableAdmin.clearSelected();
        });
      }
    },
  },
};
</script>

<style scoped>
button:hover > .fa-plus {
  color: white;
}
.fa-plus:hover {
  color: white;
}
button:hover > .fa-minus {
  color: white;
}
.fa-minus:hover {
  color: white;
}
</style>
