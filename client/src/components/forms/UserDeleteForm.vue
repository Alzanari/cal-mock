<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <div class="mt-1">
        <p>
          This will delete the following user: <strong>{{ user.username }}</strong>
        </p>
      </div>
      <b-form-group label="Id" label-for="input-id" style="display: none">
        <b-form-input id="input-id" v-model="user.id" readonly></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  title: "UserDeleteForm",
  props: ["user"],
  methods: {
    submit() {
      return this.user;
    },
  },
};
</script>

<style scoped>
#Id {
  display: none;
}
</style>
