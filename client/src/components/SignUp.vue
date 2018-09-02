<template>
    <div class="signUp">
        <div class="signUpList">
            <p>This is the sign up</p>
            <table v-for="shift in shifts" v-bind:key="shift.shift_id" class="table">
              <tr>
                <th>Shift {{ shift.shift_start }} - {{shift.shift_end }} (Cap: {{ shift.shift_capacity }}) {{ shift.shift_name }}</th>
              </tr>
              <ShiftList
                :shift = "shift.shift_id"
              ></ShiftList>
            </table>
        </div>
    </div>
</template>

<script>
import ShiftList from "@/components/ShiftList.vue";

export default {
  name: "SignUp",
  components: {
    ShiftList
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    shifts() {
      return this.$store.state.event.shifts;
    },
    list() {
      return this.$store.state.event.signUpList;
    }
  },
  mounted() {}
};
</script>
