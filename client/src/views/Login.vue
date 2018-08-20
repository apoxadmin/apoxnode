<template>
        <div class="login">
          <h1>This is a login page</h1>
          <LoginForm />
          <Test />
        </div>
      </template>
      
      <script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";
import Test from "@/components/Test.vue";

export default {
  name: "login",
  components: {
    LoginForm,
    Test
  }
};
</script>
