<template>
  <div class="header">

    <!-- LOGO -->
    <BCol>
      <RouterLink to="/"> <BImg class="logo" src="/assets/SmartClideRGBColor.png" @click="optionClicked('main')"/></RouterLink>
    </BCol>

    <!-- IDE SETTINGS -->
    <div class="ide float-right" >
      <RouterLink to="/settings"><BIconGear class="icon" @click="optionClicked('settings')"/></RouterLink>
    </div>

    <!-- USER SETTINGS -->
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
        <BDropdownItem @click="optionClicked('my-account')">
          <RouterLink class="nav_item" to="/my-account">My Account</RouterLink>
        </BDropdownItem>
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
      // TODO go to initial page
      if(this.eclipseCheUser){
        this.keycloak.logout()
      }
      else{
        Meteor.logout();
      }
    },
    optionClicked(option){
      this.$store.state.context = option;
    }
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

.nav_item{
  color: black;
  text-decoration: none;
}
</style>
