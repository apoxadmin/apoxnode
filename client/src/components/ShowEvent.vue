<template>
    <div class="showEvent">
        <p>{{ info }}</p>
        <p>{{ $route.params.eventID }}</p>
        <div class="eventTable">
          <table>
            <tr>
              <th>Event Information</th>
            </tr>
            <tr>
              <th>Name</th>
              <td>{{ info["event"]["event_name"] }}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{{ info["event"]["eventtype_id"] }}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{ info["event"]["event_date"] }}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{{ info["event"]["event_date"] }} - {{ info["event"]["event_enddate"] }}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{{ info["event"]["event_name"] }}</td>
            </tr>
            <tr>
              <th>Shifts</th>
              <td></td>
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
              <td></td>
            </tr>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  name: "ShowEvent",
  data: function() {
    return {
      login: {},
      info: {
        "event": "no info",
        "shifts": "no info",
        "comments": "no info",
        "signUpList": "no info"
      }
    };
  },
  methods: {},
  computed: {},
  mounted() {
    this.$axios
      .get(`/event/${this.$route.params.eventID}`)
      .then(response => {
        console.log(response);
        this.info = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
