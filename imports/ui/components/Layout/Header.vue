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
  <div class="header">

    <!-- LOGO -->
    <div class="logo-container">
      <router-link to="/"> <b-img class="logo" src="/assets/SmartCLIDERGBColor.png" @click="optionClicked('home')"/></router-link>
    </div>

    <!-- TODO: avoid this -->
    <div class="dummy"/>

    <!-- HELP -->
    <div>
      <b-dropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <b-icon-question-circle class="icon"/>
        </template>
        <b-dropdown-item href="https://eclipse-opensmartclide.github.io/smartclide-docs" target="_blank">
          <b-row>
            <b-col>Help</b-col>
            <b-col class="text-right"><b-icon-box-arrow-up-right variant="primary" class="mb-1" font-scale="0.75"/></b-col>
          </b-row>
        </b-dropdown-item>
        <b-dropdown-item v-b-modal.modal-about>About</b-dropdown-item>
        <About/>
      </b-dropdown>
    </div>

    <!-- USER SETTINGS -->
    <div class="user">
      <b-dropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <b-icon-person-circle class="icon"/>
        </template>
        <template>
          <b-dropdown-item disabled>{{meteorUser ? meteorUser.username : eclipseCheUser.name}}</b-dropdown-item>
        </template>
        <b-dropdown-divider/>
        <b-dropdown-item router to="/profile" @click="optionClicked('my-account')">
          My Account
        </b-dropdown-item>
        <b-dropdown-item router to="/" @click="logout">Log out</b-dropdown-item>
      </b-dropdown>
    </div>
    </div>
</template>

<script>
  import About from "../Help/About";

  export default {
    name: "Header",
    props: ["meteorUser", "eclipseCheUser"],
    components: {
      About
    },
    methods: {
      logout(){
        if(this.eclipseCheUser){
          this.$store.state.keycloak.logout();
          this.eclipseCheUser = undefined;
        }
        else
          Meteor.logout();
      },
      optionClicked(option){
        this.$store.state.context = option;
      }
    }
  }
</script>

<style scoped>
  .header{
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #e7ebf3;
  }

  .logo-container{
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo{
    width: 100px;
    padding: 4px;
  }

  .dummy{
    flex-grow: 1;
  }

  .help{
    margin-right: 8px;
  }

  .user {
    margin-right: 10px;
  }

  .icon{
    width: 30px;
    height: 30px;
    color: var(--primary);
  }
</style>
