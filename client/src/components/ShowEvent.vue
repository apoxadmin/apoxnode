<template>
    <div class="showEvent">
        <button v-on:click="checkEvent">x</button>
        <p>{{ info }}</p>
        <p>{{ $route.params.eventID }}</p>
        <table>
            <tr>
                <th>{{ info[0]["event_name"] }}</th>
            </tr>
            <tr>
                <td>{{ info[0]["event_description"] }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: "ShowEvent",
  data: function() {
    return {
      login: {},
      info: "no info"
    };
  },
  methods: {
    checkEvent: function(e) {
      e.preventDefault();
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
  },
  computed: {}
};
</script>
