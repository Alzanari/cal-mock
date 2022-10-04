<template>
  <div id="log">
    <b-row class="d-flex justify-content-center">
      <b-col cols="4">
        <b-card class="px-5 py-2" id="card">
          <div class="mx-auto py-3" style="width: 130px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4c0 17-13.8 30.7-30.7 30.7H265.1 182.9 30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z"
              />
            </svg>
          </div>
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
  </div>
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

<style scoped>
#log {
  height: 100vh;
  padding-top: 10%;
}
#card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
