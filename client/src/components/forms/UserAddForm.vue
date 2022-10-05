<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <b-form-group
        label="Username"
        label-for="input-username"
        invalid-feedback="Username is required and must be at least 6 characters."
      >
        <b-form-input
          id="input-username"
          v-model="user.username"
          :state="validateState($v.user.username)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Email"
        label-for="input-email"
        invalid-feedback="Email is required and must have email format"
      >
        <b-form-input
          id="input-email"
          v-model="user.email"
          :state="validateState($v.user.email)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password"
        label-for="input-password"
        invalid-feedback="Password is required and must be at least 8 characters."
      >
        <b-form-input
          id="input-password"
          type="password"
          v-model="user.password"
          :state="validateState($v.user.password)"
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
  title: "UserAddForm",
  mixins: [validationMixin],
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
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
      password: {
        required,
        minLength: minLength(8),
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
