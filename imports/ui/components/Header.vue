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
      <RouterLink to="/"> <BImg class="logo" src="/assets/SmartClideRGBColor.png" @click="optionClicked('main')"/></RouterLink>
    </div>

    <!-- TODO: avoid this -->
    <div class="dummy"/>

      <!-- IDE SETTINGS -->
      <div class="ide" >
        <RouterLink to="/settings"><BIconGear class="icon" @click="optionClicked('settings')"/></RouterLink>
      </div>

      <!-- USER SETTINGS -->
      <div class="user">
        <BDropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <BIconPersonCircle class="icon"/>
          </template>
          <template>
            <BDropdownItem disabled>{{meteorUser ? meteorUser.username : eclipseCheUser.name}}</BDropdownItem>
          </template>
          <BDropdownDivider/>
          <BDropdownItem router to="/my-account" @click="optionClicked('my-account')">
            My Account
          </BDropdownItem>
          <BDropdownItem router to="/" @click="logout">Log out</BDropdownItem>
        </BDropdown>
      </div>
    </div>
</template>
<script>

export default {
  name: "Header",
  props: ["meteorUser", "eclipseCheUser"],
  methods: {
    logout(){
      if(this.eclipseCheUser)
        this.$store.state.keycloak.logout();
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

.ide{
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
