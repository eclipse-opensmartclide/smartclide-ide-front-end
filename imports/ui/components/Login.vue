
<template>
  <BContainer class="vh-100 d-flex justify-content-center align-items-center flex-column" >

    <BImg class="main-logo" src="/assets/SmartClideRGBColor.png"/>

    <div class="icon-and-input">

      <div class="icon-container bg-primary">
        <BIconPerson class="icon p-1"/>
      </div>
      <BFormInput class="form-input" placeholder="Name"/>
    </div>

    <div class="icon-and-input mt-2">
      <div class="icon-container bg-primary">
        <BIconKey class="icon p-1"/>
      </div>
      <BFormInput class="form-input" type="password" placeholder="Password"/>
    </div>


    <div class="sign-in-up">
      <BRow class="mt-2 ml-0">
        <BCol>
          <BRow class="text">
            Don't have an account? <BLink class="ml-1 text">Sign Up</BLink>
          </BRow>
          <BRow class="text">
            <BLink>Forgot your password?</BLink>
          </BRow>
        </BCol>
        <BCol>
          <BButton class="float-right bg-primary text-white">Log in</BButton>
        </BCol>
      </BRow>
    </div>

  </BContainer>
</template>

<script>

</script>

<style scoped>
  .main-logo{
    width: 200px;
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

  .sign-in-up{
    width: 400px;
  }

  .text{
    font-size: 14px;
  }

</style>

