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
      <b-form-group label="Username" label-for="input-username">
        <b-form-input id="input-username" v-model="event.user" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Title" label-for="input-title" invalid-feedback="Title is required">
        <b-form-input id="input-title" v-model="event.title" required></b-form-input>
      </b-form-group>
      <b-form-group label="Comment" label-for="input-comment">
        <b-form-input id="input-comment" v-model="event.comment"></b-form-input>
      </b-form-group>
      <b-form-group label="Start" label-for="input-start" invalid-feedback="Start is required">
        <b-form-input id="input-start" type="datetime-local" v-model="event.start" required></b-form-input>
      </b-form-group>
      <b-form-group label="End" label-for="input-end">
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
