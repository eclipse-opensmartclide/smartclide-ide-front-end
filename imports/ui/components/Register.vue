<template>

  <BContainer class="vh-100 d-flex justify-content-center align-items-center flex-column" >


    <BImg class="main-logo" src="/assets/SmartClideRGBColor.png"/>

    <BForm>

      <!-- email  -->
      <div class="icon-and-input">
        <div class="icon-container bg-primary">
          <BIconEnvelope class="icon p-1"/>
        </div>
        <BFormInput class="form-input" placeholder="Email" v-model="email" required/>
      </div>

      <!-- username  -->
      <div class="icon-and-input mt-2">
        <div class="icon-container bg-primary">
          <BIconPerson class="icon p-1"/>
        </div>
        <BFormInput class="form-input" placeholder="Username" v-model="username" required/>
      </div>

      <!-- password  -->
      <div class="icon-and-input mt-2">
        <div class="icon-container bg-primary">
          <BIconKey class="icon p-1"/>
        </div>
        <BFormInput class="form-input" type="password" placeholder="Password" v-model="password" required/>
      </div>

      <!-- password  confirm -->
      <div class="icon-and-input mt-2">
        <div class="icon-container bg-primary">
          <BIconKey class="icon p-1"/>
        </div>
        <BFormInput class="form-input" type="password" placeholder="Confirm your password" v-model="passwordConfirm" required/>
      </div>

      <div class="sign-in-up">
        <BRow class="mt-2 ml-0">
          <BCol cols="8">
            <div class="login text">
              <div>Already have an account?</div>
              <BLink href="/login" class="ml-1">Login</BLink>
            </div>
          </BCol>

          <BCol>
            <BButton  v-on:click="register" class="float-right bg-primary text-white" type="submit">Register</BButton>
          </BCol>
        </BRow>
      </div>

    </BForm>

  </BContainer>
</template>


<script>
export default {
  components: {

  },
  data(){
    return {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    register: function (event){


    },
  }


}

</script>




<style scoped>
.main-logo{
  width: 365px;
}

.icon-and-input{
  display: flex;
  flex-direction: row;
  width: 400px;
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
}

.login{
  margin-left: -15px;
  margin-right: -15px;
  display: flex;
  align-items: center;
  height: 100%;
}

.sign-in-up{
  width: 400px;
}

.text{
  font-size: 14px;
}

</style>
