<template>
    <div class="event">
      <h1>This is an event page</h1>
      <ShowEvent />
      <SignUp />
    </div>
  </template>
  
<script>
// @ is an alias to /src
import ShowEvent from "@/components/ShowEvent.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  name: "event",
  components: {
    ShowEvent,
    SignUp
  }
};
</script>
