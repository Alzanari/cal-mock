<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <b-form-group label="Titre" label-for="input-title" invalid-feedback="Le titre est requis">
        <b-form-input
          id="input-title"
          v-model="event.title"
          :state="validateState($v.event.title)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Commentaire" label-for="input-comment" invalid-feedback="Un commentaire est requis">
        <b-form-input id="input-comment" v-model="event.comment" :state="validateState($v.event.title)"></b-form-input>
      </b-form-group>
      <b-form-group label="Date de début" label-for="input-start" invalid-feedback="La date de début est requise">
        <b-form-input
          id="input-start"
          type="datetime-local"
          v-model="event.start"
          :state="validateState($v.event.start)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Date de fin" label-for="input-end">
        <b-form-input id="input-end" type="datetime-local" v-model="event.end"></b-form-input>
      </b-form-group>
      <b-form-group class="d-flex mt-2" label="Toute la journée?" label-for="allDay-input">
        <b-form-checkbox
          class="mx-3"
          id="allDay-input"
          v-model="event.allDay"
          name="allDay"
          value="true"
          unchecked-value="false"
        ></b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Soumettre</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  title: "EventAddForm",
  props: ["event"],
  mixins: [validationMixin],
  validations: {
    event: {
      title: {
        required,
      },
      comment: {
        required,
      },
      start: {
        required,
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
      return this.event;
    },
  },
};
</script>
