<template>
  <Login/>
<!--  <Register/>-->
<!--  <Home/>-->
</template>

<!-- THIS IS WILL BE HOME  -->
<!--<template>-->
<!--  <div>-->

<!--    <router-link to="/">Home</router-link>-->
<!--    <div>-->
<!--      <router-view></router-view>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
import Home from "./components/Home"
import Login from "./components/Login";
import Register from "./components/Register";

export default {
  components: {
    Login,
    Register,
    Home
  },
  data() {
    return {};
  },
  methods: {

  }
};
</script>

