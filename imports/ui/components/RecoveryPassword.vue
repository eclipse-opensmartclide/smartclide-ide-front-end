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

      <div class="recovery">
        <BRow class="mt-2 ml-0">
          <BCol cols="8">
            <div class="login text">
              <div>Already have an account?</div>
              <BLink href="/login" class="ml-1">Login</BLink>
            </div>
          </BCol>
          <BCol>
            <BButton  v-on:click="recovery" class="float-right bg-primary text-white" type="submit">Submit</BButton>
          </BCol>
        </BRow>
      </div>

    </BForm>

  </BContainer>
</template>

<script>
export default {
  name: "RecoveryPassword"
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

  .text{
    font-size: 14px;
  }
</style>
