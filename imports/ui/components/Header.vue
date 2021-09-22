<template>
  <div class="header">

    <!-- LOGO -->
    <div class="logo-container">
      <RouterLink to="/"> <BImg class="logo" src="/assets/SmartCLIDE_logo.png" @click="optionClicked('main')"/></RouterLink>
    </div>

    <!-- TODO: avoid this -->
    <div class="dummy"/>

      <!-- IDE -->
      <div class="ide" >
        <RouterLink to="/settings"><BIconGear class="icon" @click="optionClicked('settings')"/></RouterLink>
      </div>

      <!-- USER -->
      <div class="user">
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
  props: ["meteorUser", "eclipseCheUser", "keycloak"],
  methods: {
    logout(){
      if(this.eclipseCheUser)
        this.keycloak.logout();
      else {
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

.header{
  display: flex;
  align-items: center;
  height: 60px;
}

.logo-container{
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo{
  width: 200px;
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
