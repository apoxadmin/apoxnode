<template>
    <div class="signUp">
        <div class="signUpList">
            <p>This is the sign up list</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "SignUp",
  data: function() {
    return {
      login: {},
      info: "no info"
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
