<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <b-form-group label="Id" label-for="input-id">
        <b-form-input id="input-id" v-model="user.id" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Nom d'utilisateur" label-for="input-username">
        <b-form-input id="input-username" v-model="user.username" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="Mot de passe"
        label-for="input-password"
        invalid-feedback="Le mot de passe est obligatoire et doit comporter au moins 8 caractères."
      >
        <b-form-input
          id="input-password"
          type="password"
          v-model="$v.password.$model"
          :state="validateState($v.password)"
          required
          autofocus
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Confirmation mot de passe"
        label-for="input-password_conf"
        invalid-feedback="La confirmation du mot de passe est obligatoire et doit être identique au mot de passe."
      >
        <b-form-input
          id="input-password_conf"
          type="password"
          v-model="$v.password_conf.$model"
          :state="validateState($v.password_conf)"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  title: "UserPassForm",
  props: ["user"],
  mixins: [validationMixin],
  data() {
    return {
      password: "",
      password_conf: "",
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    password_conf: {
      required,
      sameAsPassword: sameAs("password"),
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
