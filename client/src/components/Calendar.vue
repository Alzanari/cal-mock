<template>
  <b-container class="my-3 calendar">
    <div class="mb-5">
      <b-button pill variant="primary" @click="showAddModal()">Add Event</b-button>
    </div>
    <b-modal
      ref="addEventModal"
      title="Add new event"
      @ok.prevent="submitFromAddModal()"
      @show="resetModal()"
      @hidden="resetModal()"
    >
      <AddForm ref="addEventForm" :event="event" />
    </b-modal>
    <full-calendar ref="calendar" class="full-calendar" :options="config">
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
import AddForm from "./forms/EventAddForm.vue";

export default {
  data() {
    return {
      event: {
        title: "",
        comment: "",
        start: "",
        end: "",
        allDay: false,
      },
    };
  },
  components: {
    FullCalendar,
    AddForm,
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
        firstDay: "1",
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
          endTime: "19:00", // an end time (7pm in this example)
        },
        initialView: "dayGridMonth",
        events: this.allEvents,
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
    showAddModal() {
      this.$refs.addEventModal.show();
    },
    resetModal() {
      this.event.title = "";
      this.event.comment = "";
      this.event.start = "";
      this.event.end = "";
      this.event.allDay = "";
    },
    submitFromAddModal() {
      const data = this.$refs.addEventForm.submit();
      // console.log(data);
      if (data) {
        this.$store.dispatch("event/addEvent", data);
        this.$nextTick(() => {
          this.$refs.addEventModal.hide();
        });
      }
    },
  },
};
</script>

<style scoped>
.fc-event-main span b {
  margin-right: 5px;
}
.fc-daygrid-dot-event span b {
  margin-right: 5px;
  color: black;
}
.fc-daygrid-dot-event span i {
  color: black;
}
</style>
