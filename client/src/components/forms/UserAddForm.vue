<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <b-form-group
        label="Nom d'utilisateur"
        label-for="input-username"
        invalid-feedback="Le nom d'utilisateur est obligatoire et doit comporter au moins 6 caractères."
      >
        <b-form-input
          id="input-username"
          v-model="user.username"
          :state="validateState($v.user.username)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="E-mail"
        label-for="input-email"
        invalid-feedback="L'e-mail est obligatoire et doit avoir le format d'e-mail"
      >
        <b-form-input
          id="input-email"
          v-model="user.email"
          :state="validateState($v.user.email)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Mot de passe"
        label-for="input-password"
        invalid-feedback="Le mot de passe est obligatoire et doit comporter au moins 8 caractères."
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
