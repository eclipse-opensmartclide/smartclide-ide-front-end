<template>
  <div class="header">

    <!-- LOGO -->
    <BCol>
      <RouterLink to="/"> <BImg class="logo" src="/assets/SmartClideRGBColor.png" /></RouterLink>
    </BCol>

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
          <BDropdownItem>{{meteorUser.username}}</BDropdownItem>
        </template>
        <template v-if="eclipseCheUser">
          <BDropdownItem>{{eclipseCheUser.name}}</BDropdownItem>
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
import NavigationBar from "./NavigationBar";

export default {
  components: {
    NavigationBar,
  },
  name: "Header",
  props: ["meteorUser", "eclipseCheUser", "keycloak"],
  methods: {
    logout(){
      // TODO go to initial page
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
.logo{
  width: 122px;
}

.header{
  display: flex;
  align-items: center;
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
