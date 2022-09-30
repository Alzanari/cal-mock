<template>
  <b-container fluid>
    <b-row class="d-flex justify-content-center" style="margin-top: 10%">
      <b-col cols="4">
        <b-card class="px-5 py-5">
          <h2 class="my-5 text-center">Sign In</h2>
          <b-form @submit.prevent="login">
            <b-form-group id="input-username" label="Username:" label-for="input-username">
              <b-form-input
                id="input-username"
                type="text"
                v-model="username"
                placeholder="Enter username"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-password" label="Password:" label-for="input-password">
              <b-form-input id="input-password" type="password" v-model="password" required></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" class="my-3">Submit</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  <!-- <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User Name</label>
      <input required v-model="username" type="text" placeholder="Name" />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("auth/login", { username, password })
        .then(() =>
          this.$router.push("/").catch((error) => {
            console.info(error.message);
          })
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
body {
  background-color: antiquewhite;
}
</style>
