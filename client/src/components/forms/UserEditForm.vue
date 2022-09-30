<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <b-form-group label="Id" label-for="input-id">
        <b-form-input id="input-id" v-model="user.id" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Username" label-for="input-username" invalid-feedback="Username is required">
        <b-form-input id="input-username" v-model="user.username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email" label-for="input-email" invalid-feedback="Email is required">
        <b-form-input id="input-email" v-model="user.email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="input-password" invalid-feedback="Password is required">
        <b-form-input id="input-password" type="password" v-model="pass" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  title: "UserEditForm",
  data() {
    return {
      pass: null,
    };
  },
  props: ["user"],
  methods: {
    submit() {
      let mod = {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: this.pass,
      };
      return mod;
    },
  },
};
</script>
<style></style>
