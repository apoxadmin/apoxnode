<template>
        <div class="login">
          <form>
              <label for="username">User Name</label>
              <input type="text" name="username" v-model="login.username" required>
              <br />
              <label for="password">Password</label>
              <input type="password" name="password" v-model="login.password" required>
              <br />
              <button v-on:click="submitLogin" type="submit">Login</button>
          </form>
          <p>{{ info }}</p>
        </div>
</template>

<script>
export default {
  name: "LoginForm",
  data: function() {
    return {
      login: {},
      info: "no info"
    };
  },
  methods: {
    submitLogin: function(e) {
      e.preventDefault();
      this.$axios
        .post("http://localhost:5000/login", {
          username: this.login.username,
          password: this.login.password
        })
        .then(response => {
          console.log(response);
          this.info = response.data.cookie;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {}
};
</script>
