<template>
  <div class="header">
    <!-- LOGO -->
      <div class="logo-container">
        <RouterLink to="/"> <BImg class="logo" src="/assets/SmartClideRGBColor.png" /></RouterLink>
      </div>

    <!-- TODO: avoid this -->
    <div class="dummy"/>

    <!-- IDE -->
    <div class="ide float-right">
      <BDropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <BIconGear class="icon"/>
        </template>
        <BDropdownItem>Statistics</BDropdownItem>
        <BDropdownItem>Logs</BDropdownItem>
        <BDropdownItem>Appearance</BDropdownItem>
        <BDropdownItem>Help</BDropdownItem>
      </BDropdown>
    </div>

    <!-- USER -->
    <div class="user float-right">
      <BDropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <BIconPersonCircle class="icon"/>
        </template>
        <template v-if="meteorUser">
          <BDropdownItem disabled>{{meteorUser.username}}</BDropdownItem>
        </template>
        <template v-if="eclipseCheUser">
          <BDropdownItem disabled>{{eclipseCheUser.name}}</BDropdownItem>
        </template>
        <BDropdownDivider/>
        <BDropdownItem>Profile</BDropdownItem>
        <BDropdownItem>Team</BDropdownItem>
        <BDropdownItem>Sources</BDropdownItem>
        <BDropdownItem>Credentials</BDropdownItem>
        <BDropdownItem @click="logout">Log out</BDropdownItem>
      </BDropdown>
    </div>
  </div>
</template>
<script>

export default {
  name: "Header",
  props: ["meteorUser", "eclipseCheUser", "keycloak"],
  methods: {
    logout(){
      if(this.eclipseCheUser){
        this.keycloak.logout()
      }
      else{
        Meteor.logout();
      }
    },
  }
}


</script>

<style scoped>

.header{
  display: flex;
  align-items: center;
}

.logo-container{
  width: 200px;
  display: flex;
  justify-content: center;
}

.logo{
  width: 122px;
}

.dummy{
  flex-grow: 1;
}

.ide{
  margin-right: 50px;
}

.user {
  margin-right: 100px;
}

.icon{
  width: 40px;
  height: 40px;
  color: var(--primary);

}
</style>
