<template>
    <div class="test">
        <button v-on:click="checkEvent">x</button>
        <p>{{ info }}</p>
    </div>
</template>

<script>
export default {
  name: "Test",
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
        .get("/event/12765")
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
