<template>
  <div>
    <b-form ref="form" @submit.prevent="submit">
      <div class="mt-1">
        <p>
          L'événement suivant sera supprimé: <strong>{{ event.title }}</strong>
        </p>
      </div>
      <b-form-group label="Id" label-for="input-id" style="display: none">
        <b-form-input id="input-id" v-model="event.id" readonly></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="display: none">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  title: "EventDeleteForm",
  props: ["event"],
  methods: {
    submit() {
      return this.event;
    },
  },
};
</script>

<style scoped>
#Id {
  display: none;
}
</style>
