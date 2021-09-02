<template>
  <div class="header">

    <!-- smartclide logo -->
    <BCol>

      <router-link to="/"> <BImg class="logo" src="/assets/SmartClideRGBColor.png" /></router-link>
    </BCol>

    <!-- navigation bar -->
    <BCol cols="6">
      <NavigationBar/>
    </BCol>

    <!-- settings -->
    <BCol>
      <div>
        <BDropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <BIconGear class="user-icon"/>
          </template>
          <BDropdownItem>Statistics</BDropdownItem>
          <BDropdownItem>Logs</BDropdownItem>
          <BDropdownItem>Appearance</BDropdownItem>
          <BDropdownItem>Help</BDropdownItem>
        </BDropdown>
      </div>
    </BCol>

    <!-- user -->
    <BCol>
      <div class="user" >
        <template v-if="meteorUser">
          {{meteorUser.username}}
        </template>
        <template v-if="eclipseCheUser">
          {{eclipseCheUser.name}}
        </template>
        <div>
          <BDropdown variant="bg-transparent text-primary" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <BIconPersonCircle class="user-icon"/>
            </template>
            <BDropdownItem>Profile</BDropdownItem>
            <BDropdownItem>Team</BDropdownItem>
            <BDropdownItem>Sources</BDropdownItem>
            <BDropdownItem>Credentials</BDropdownItem>
            <BDropdownItem @click="logout">Log out</BDropdownItem>
          </BDropdown>
        </div>
      </div>
    </BCol>
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
