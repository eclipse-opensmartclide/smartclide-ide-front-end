<template>
  <div class="main vh-100 d-flex flex-column">
    <template v-if="isLoggedIn || this.eclipseCheUser">
      <Main :meteorUser="getMeteorUser" :eclipseCheUser="eclipseCheUser"/>
    </template>

    <template v-else-if="this.SmartCLIDELogin">
      <LoginSmartCLIDE/>
      <Footer/>
    </template>

    <template v-else>
      <Login @SmartCLIDELogin="loginWithSmartCLIDE()"/>
      <Footer/>
    </template>
  </div>
</template>

<script>
import Keycloak from "keycloak-js";
import Login from "./components/Login";
import LoginSmartCLIDE from "./components/LoginSmartCLIDE";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default {
  components: {
    Login,
    LoginSmartCLIDE,
    Header,
    Main,
    Footer
  },
  data() {
    return {
      eclipseCheUser: undefined,
      SmartCLIDELogin: undefined
    };
  },
  created(){
    const keycloak = new Keycloak("/keycloak.json");

    keycloak.init({
      onLoad: 'check-sso',
      loadUserProfileAtStartUp: true,
      checkLoginIframe: false,
      // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
      console.log("authenticated: ", authenticated);

      this.eclipseCheLogin = authenticated
      this.$store.state.keycloak = keycloak

      // Get Eclipse Che user
      if(keycloak.tokenParsed)
        this.eclipseCheUser = keycloak.tokenParsed
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    loginWithSmartCLIDE(){
      this.SmartCLIDELogin = true;
    }
  },
  meteor: {
    getMeteorUser(){
      const meteorUser = Meteor.user();

      if(meteorUser)
        this.SmartCLIDELogin = false;

      return meteorUser;
    },
    isLoggedIn(){
      return !!Meteor.userId();
    }
  }
};
</script>

<style scoped>

</style>
