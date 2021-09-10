
<template>
  <BContainer class="vh-100 d-flex justify-content-center align-items-center" >

    <div class="login-container d-flex flex-column align-items-center">

      <BImg class="main-logo mt-4" src="/assets/SmartClideRGBColor.png"/>

      <BForm @submit.prevent="login">
        <!-- username -->
        <div class="icon-and-input mt-4">
          <div class="icon-container bg-primary">
            <BIconPerson class="icon p-1"/>
          </div>
          <BFormInput class="form-input" placeholder="Username" v-model="username" required/>
        </div>

        <!-- password -->
        <div class="icon-and-input mt-3">
          <div class="icon-container bg-primary">
            <BIconKey class="icon p-1"/>
          </div>
          <BFormInput class="form-input" type="password" placeholder="Password" v-model="password" required/>
        </div>

        <div class="login mt-3 d-flex justify-content-center">
          <BButton class="bg-primary text-white" name="login" type="submit">Log in</BButton>
        </div>
      </BForm>

    </div>
  </BContainer>
</template>

<script>

export default {
  props: ["keycloak"],
  components: {

  },
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function (ev){
      Meteor.loginWithPassword(this.username, this.password)
    }
  }
}

</script>

<style scoped>

.login-container{
  background: #E5EEFD;
  width: 351px;
  height: 397px;
  border-radius: 10px;
}

.main-logo{
  width: 274px;
}

.icon-and-input{
  display: flex;
  flex-direction: row;
  width: 298px;
}

.icon-container{
  display: flex;
  align-content: center;
  height: 38px;
  width: 38px;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.icon{
  color: white;
  width: 100%;
  height: 100%;
}

.form-input{
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  font-size: 14px;
  height: 38px;
}

</style>

