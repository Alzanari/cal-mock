<template>
  <b-container class="mt-3 calendar">
    <div class="mb-5">
      <b-button class="Bfix" pill variant="primary" v-b-modal.modal-add-event>Add Event</b-button>
      <b-modal
        id="modal-add-event"
        ref="modal"
        title="Add Event"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Title" label-for="title-input" invalid-feedback="Title is required" :state="titleState">
            <b-form-input id="title-input" v-model="title" :state="titleState" required></b-form-input>
          </b-form-group>
          <b-form-group
            label="Comment"
            label-for="comment-input"
            invalid-feedback="Comment is required"
            :state="commentState"
          >
            <b-form-input id="comment-input" v-model="comment" :state="commentState" required></b-form-input>
          </b-form-group>
          <div class="d-flex">
            <b-form-group
              label="Start"
              label-for="start-input"
              invalid-feedback="Start is required"
              :state="startState"
            >
              <input
                class="form-control"
                type="datetime-local"
                id="start-input"
                v-model="start"
                :state="startState"
                required
              />
            </b-form-group>
            <b-form-group class="mx-auto" label="End" label-for="end-input" :state="endState">
              <input class="form-control" type="datetime-local" id="end-input" v-model="end" :state="endState" />
            </b-form-group>
          </div>
          <b-form-group class="d-flex mt-2" label="All Day?" label-for="allDay-input" :state="allDayState">
            <b-form-checkbox
              class="mx-3"
              id="allDay-input"
              v-model="allDay"
              name="allDay"
              :state="allDayState"
              value="true"
              unchecked-value="false"
            ></b-form-checkbox>
          </b-form-group>
        </form>
      </b-modal>
    </div>
    <full-calendar class="full-calendar" :options="config">
      <template #eventContent="{ timeText, event }">
        <b>{{ timeText }}</b>
        <i>{{ event.title }}</i>
      </template>
    </full-calendar>
  </b-container>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  data() {
    return {
      title: "",
      comment: "",
      start: "",
      end: "",
      allDay: "",
      titleState: null,
      commentState: null,
      startState: null,
      endState: null,
      allDayState: null,
    };
  },
  components: {
    FullCalendar,
  },
  computed: {
    allEvents() {
      return this.$store.getters["event/allEvents"];
    },
    weekendsVisible() {
      return this.$store.getters["event/weekendsVisible"];
    },

    config() {
      return {
        ...this.configOptions,
        ...this.eventHandlers,
      };
    },

    configOptions() {
      return {
        editable: false,
        selectable: false,
        selectMirror: false,
        navLinks: true,
        dayMaxEvents: true,
        events: this.$store.getters["event/allEvents"],
        weekends: this.$store.getters["event/weekendsVisible"],
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "prev,today,next",
        },
        businessHours: {
          // days of week. an array of zero-based day of week integers (0=Sunday)
          daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday

          startTime: "9:00", // a start time (9am in this example)
          endTime: "19:00", // an end time (6pm in this example)
        },
        initialView: "dayGridMonth",
      };
    },

    eventHandlers() {
      return {
        eventClick: this.onEventClick,
      };
    },
  },
  methods: {
    onEventClick({ event }) {
      // const confirmed = confirm(`Are you sure you want to delete the event '${event.title}'?`);

      // if (!confirmed) {
      //   return;
      // }

      // return this.deleteEvent(event.id);
      console.log(event);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid;
      this.commentState = valid;
      this.startState = valid;
      this.allDayState = valid;
      return valid;
    },
    resetModal() {
      this.title = "";
      this.titleState = null;
      this.comment = "";
      this.commentState = null;
      this.start = "";
      this.startState = null;
      this.end = "";
      this.endState = null;
      this.allDay = "";
      this.allDayState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      // submit event through action
      this.$store.dispatch("event/addEvent", {
        title: this.title,
        comment: this.comment,
        start: this.start,
        end: this.end,
        allDay: this.allDay ? 1 : 0,
      });

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>

<style scoped>
/* #Bfix {
  position: fixed;
  bottom: 20px;
  right: 20px;
} */

.fc-event-main span b {
  margin-right: 5px;
}
</style>
