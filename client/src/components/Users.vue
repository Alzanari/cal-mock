<template>
  <div>
    <h2>Users' table</h2>
    <b-row>
      <b-col>
        <b-button pill variant="outline-secondary" @click="showAddModal()">Add new user</b-button>
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
          :items="users"
          :fields="fields"
          :head-variant="headVariant"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template v-slot:cell(permissions)="data">
            <b-button v-if="data.item.admin == 'No'" @click="setAdmin(data.item.id)">Add</b-button>
            <b-button v-if="data.item.admin == 'Yes'" @click="removeAdmin(data.item.id)" class="mx-1">remove</b-button>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button @click="showEditModal(data.item)">Edit</b-button>
            <b-button v-if="currentAdmin.id !== data.item.id" @click="showDeleteModal(data.item)" class="mx-1"
              >Delete</b-button
            >
          </template>
        </b-table>
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
        <b-button id="export" @click="exportExcel" class="me-auto" pill variant="outline-success">Export</b-button>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="my-auto"></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EditForm from "./forms/UserEditForm.vue";
import DeleteForm from "./forms/UserDeleteForm.vue";
import AddForm from "./forms/UserAddForm.vue";
import exportFromJSON from "export-from-json";

export default {
  name: "ListUser",
  components: {
    EditForm,
    DeleteForm,
    AddForm,
  },
  data() {
    return {
      fields: ["id", "username", "email", "admin", "permissions", "actions"],
      headVariant: "dark",
      filter: "",
      perPage: 10,
      currentPage: 1,
      currentUser: null,
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
  },
  methods: {
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
      }
    },
    submitFromEditModal() {
      const data = this.$refs.editUserForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("user/updateUser", data);
      }
    },
    submitFromDeleteModal() {
      const data = this.$refs.deleteUserForm.submit();
      // console.log("data here ", data);
      if (data) {
        this.$store.dispatch("user/deleteUser", data);
      }
    },
  },
};
</script>

<style></style>
