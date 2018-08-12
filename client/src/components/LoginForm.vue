<template>
        <div class="login">
          <form>
              <label for="username">User Name</label>
              <input type="text" name="username" required>
              <br />
              <label for="password">Password</label>
              <input type="password" name="password" required>
              <br />
              <button type="submit">Login</button>
          </form>
        </div>
</template>

<script>
export default {
  name: "LoginForm"
};
</script>
