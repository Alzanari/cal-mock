<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <b-form-group label="Id" label-for="input-id">
        <b-form-input id="input-id" v-model="user.id" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="Username"
        label-for="input-username"
        invalid-feedback="Username is required and must be at least 6 characters"
      >
        <b-form-input
          id="input-username"
          v-model="user.username"
          :state="validateState($v.user.username)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Email" label-for="input-email" invalid-feedback="Email is required and must in email format">
        <b-form-input
          id="input-email"
          v-model="user.email"
          :state="validateState($v.user.email)"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  title: "UserEditForm",
  mixins: [validationMixin],
  props: ["user"],
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(6),
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    validateState(item) {
      const { $dirty, $error } = item;
      return $dirty ? !$error : null;
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      let mod = {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
      };
      return mod;
    },
  },
};
</script>
<style></style>
