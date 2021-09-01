<template>
  <div class="main">
    <template v-if="currentUser||eclipseCheLogin">

      <header>
        <Header v-bind:user="currentUser"/>
      </header>

      <Home/>
    </template>

    <template v-else>
      <Login @eclipseCheLogin="checkEclipseCheLogin"/>
    </template>
  </div>
</template>


<script>
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";

export default {
  components: {
    Header,
    NavigationBar,
    Login,
    Home
  },
  data() {
    return {
      eclipseCheLogin: false
    };
  },
  methods: {
    checkEclipseCheLogin(){
      console.log("check eclipse che login")
      this.eclipseCheLogin = !this.eclipseCheLogin
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

.logo{
  width: 122px;
}

.header{
  display: flex;
  align-items: center;
}

.user {
  display: flex;
  align-items: center;
}

.user-icon{
  width: 40px;
  height: 40px;
  color: var(--primary);
  margin-left: 8px;
}



</style>

