<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <!-- <div>
        <span>Created by :</span>
        <span>{{ event.user }}</span>
      </div> -->
      <b-form-group label="Id" label-for="input-id">
        <b-form-input id="input-id" v-model="event.id" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Nom d'utilisateur" label-for="input-username">
        <b-form-input id="input-username" v-model="event.user" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Titre" label-for="input-title" invalid-feedback="Le titre est requis">
        <b-form-input id="input-title" v-model="event.title" required></b-form-input>
      </b-form-group>
      <b-form-group label="Commentaire" label-for="input-comment" invalid-feedback="Un commentaire est requis">
        <b-form-input id="input-comment" v-model="event.comment" required></b-form-input>
      </b-form-group>
      <b-form-group label="Date de début" label-for="input-start" invalid-feedback="La date de début est requise">
        <b-form-input id="input-start" type="datetime-local" v-model="event.start" required></b-form-input>
      </b-form-group>
      <b-form-group label="Date de fin" label-for="input-end">
        <b-form-input id="input-end" type="datetime-local" v-model="event.end"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  title: "EventEditForm",
  props: ["event"],
  methods: {
    submit() {
      return this.event;
    },
  },
};
</script>
<style></style>
