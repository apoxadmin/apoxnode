<template>
    <tbody class="shiftList">
      <th>Name</th>
      <th>Chair</th>
      <th>Driving</th>
      <th>Needs Ride</th>
      <!--for loop of table header cells
      for each of the items in the header array
      print out a th with the event field-->
        <tr v-for="brother in list" v-if="brother.shift_id == shift">
            <!--omit the user-->
            <td v-for="field in brother">{{ field }}</td>
            <!--edit the fields so that they match the proper context-->
        </tr>
        <!--create a row for the user so they can add or take themselves off the event-->
    </tbody>
</template>

<script>
export default {
  name: "ShiftList",
  data: function() {
    return {};
  },
  props: ["shift"],
  methods: {},
  computed: {
    headers() {
      let eventFields = [
        "position",
        "name",
        "chairing",
        "driving",
        "riding",
        "replacing"
        //make the names better
      ];
      //for all custom fields in event
      //check if field is not blank
      //push it to the array
      return eventFields;
    },
    list() {
      return this.$store.state.event.signUpList;
    }
  },
  mounted() {}
};
</script>
