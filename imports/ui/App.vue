<template>
  <div class="main">

    <template v-if="currentUser">
      <div class="user" v-on:click="logout">
        {{currentUser.username}} 🚪
      </div>
      <Home/>
    </template>

    <template v-else>
      <Login />
    </template>
  </div>
</template>


<script>
import Home from "./components/Home"
import Login from "./components/Login";

export default {
  components: {
    Login,
    Home
  },
  data() {
    return {};
  },
  methods: {
    logout(){
      Meteor.logout();
    }
  },
  meteor: {
    currentUser(){
      return Meteor.user()
    }
  }
};
</script>

<style scoped>

.user {
  display: flex;
  cursor: pointer;
  align-self: flex-end;
  margin: 8px 16px 0;
  font-weight: bold;
}

</style>

