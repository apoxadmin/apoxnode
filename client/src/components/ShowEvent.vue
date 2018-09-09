<template>
    <div class="showEvent">
        <p>{{ info }}</p>
        <p>{{ $route.params.eventID }}</p>
        <div class="eventTable table">
          <table>
            <tr>
              <th colspan="2">Event Information</th>
            </tr>
            <tr>
              <th>Name</th>
              <td>{{ info["event"]["event_name"] }}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{{ info["event"]["eventtype_name"] }}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{ eventDate["event_date"].getMonth() + 1 }}/{{ eventDate["event_date"].getDate() }}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{{ eventDate["event_date"].getHours() }}:{{ zeroMinutes(eventDate["event_date"].getMinutes()) }}{{ eventDate["event_date"].getMinutes() }} - {{ eventDate["event_enddate"].getHours() }}:{{ zeroMinutes(eventDate["event_enddate"].getMinutes()) }}{{ eventDate["event_enddate"].getMinutes() }}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{{ info["event"]["event_location"] }}</td>
            </tr>
            <tr>
              <th>Shifts</th>
              <td>
                <span v-for="shift in info['shifts']" v-bind:key="shift.shift_id">{{ shift.shift_start }} - {{ shift.shift_end }}<br/></span>
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ info["event"]["event_description"] }}</td>
            </tr>
            <tr>
              <th>Event Contact</th>
              <td>{{ info["event"]["event_contact"] }}</td>
            </tr> 
            <tr>
              <th>Show Emails</th>
              <td>
                <span v-for="brother in info.signUpList">{{ brother.user_email }} </span>
              </td>
            </tr>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  name: "ShowEvent",
  data: function() {
    return {};
  },
  methods: {
    zeroMinutes(minutes) {
      if (minutes < 10) {
        return 0;
      } else {
        return null;
      }
    }
  },
  computed: {
    info() {
      return this.$store.state.event;
    },
    eventDate() {
      let event_date = new Date(this["info"]["event"]["event_date"]);
      let event_enddate = new Date(this["info"]["event"]["event_enddate"]);
      return {
        event_date: event_date,
        event_enddate: event_enddate
      };
    }
  },
  mounted() {
    this.$store.dispatch("getEvent", {
      eventID: this.$route.params.eventID
    });
  }
};
</script>
