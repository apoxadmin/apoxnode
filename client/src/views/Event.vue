<template>
    <div class="event">
      <h1>This is an event page</h1>
      <ShowEvent />
    </div>
  </template>
  
<script>
// @ is an alias to /src
import ShowEvent from "@/components/ShowEvent.vue";

export default {
  name: "event",
  components: {
    ShowEvent
  }
};
</script>
