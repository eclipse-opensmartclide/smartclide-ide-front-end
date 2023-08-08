<!-------------------------------------------------------------------------------
 - Copyright (c) 2021 Unparallel Innovation, Lda
 -
 - This program and the accompanying materials are made available under the
 - terms of the Eclipse Public License 2.0 which is available at
 - http://www.eclipse.org/legal/epl-2.0.
 -
 - SPDX-License-Identifier: EPL-2.0
 -------------------------------------------------------------------------------->

<template>
  <div class="main vh-100 d-flex flex-column">
    <template v-if="isLoggedIn || eclipseCheUser">
      <Layout :meteorUser="getMeteorUser" :eclipseCheUser="eclipseCheUser"/>
    </template>

    <template v-else-if="SmartCLIDELogin">
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
  import Login from "./components/Login/Login";
  import LoginSmartCLIDE from "./components/Login/LoginSmartCLIDE";
  import Layout from "./components/Layout/Layout";
  import Footer from "./components/Layout/Footer";
  import router from "../../client/routes";
  import {setTheme, unsetTheme} from "../../styles/functions";

  export default {
    components: { Login, LoginSmartCLIDE, Layout, Footer },
    data() {
      return {
        eclipseCheUser: undefined,
        SmartCLIDELogin: undefined
      };
    },
    beforeCreate() {
      setTheme();
    },
    destroyed() {
      unsetTheme();
    },
    created(){
      this.parseTheme();
      this.$store.state.keycloak = new Keycloak("/keycloak.json");

      this.$store.state.keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: true,
        loadUserProfileAtStartUp: true
      }).then(authenticated => {
        if(authenticated){
          this.eclipseCheUser = this.$store.state.keycloak.tokenParsed;
          this.addUserToDB();
        }
      }).catch(error => {
        console.log(error);
      });

      this.$store.state.keycloak.onTokenExpired = () => {
        this.$store.state.keycloak.updateToken(30);
      };

      this.$store.state.keycloak.onAuthLogout = () => {
        this.eclipseCheUser = undefined;
        router.push("/");
      };
    },
    methods: {
      parseTheme(){
        let ideName, themeName;

        if(this.$route.query.theme === "iotcat_ide"){
          ideName = "IoT Catalogue";
          themeName = "iotcat_ide";
        }
        else{
          ideName = "SmartCLIDE";
          themeName = "default";
        }

        document.title = `${ideName} IDE`;

        this.$store.state.theme = {
          name: themeName,
          images: {
            eclipseIcon: `/assets/themes/${themeName}/eclipseIcon.png`,
            euFlag: `/assets/themes/${themeName}/euFlag.png`,
            // ideIcon: `/assets/themes/${themeName}/ideIcon.png`,
            ideLogo: `/assets/themes/${themeName}/ideLogo.png`,
            welcomeCard:`/assets/themes/${themeName}/welcomeCard.png`
          }
        };
      },
      loginWithSmartCLIDE(){
        this.SmartCLIDELogin = true;
      },
      addUserToDB(){
        Meteor.call("exists", "users", this.$store.state.keycloak.subject, this.$store.state.keycloak.token,
          (error, result) => {
            if(!result)
              Meteor.call("request",{
                operationID: this.$store.state.apis.backend.endpoints.addUsers.operationID,
                requestBody: {
                  id: this.$store.state.keycloak.subject,
                  email: this.$store.state.keycloak.tokenParsed.email,
                  team_id: null
                },
                token: this.$store.state.keycloak.token
              });
          }
        );
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

<style>

</style>
