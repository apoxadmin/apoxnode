<template>
        <div class="login">
          <h1>This is a login page</h1>
          <LoginForm />
        </div>
      </template>
      
      <script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm
  }
};
</script>
