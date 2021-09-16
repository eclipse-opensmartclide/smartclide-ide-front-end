<template>
  <div>
    My Account
  </div>
</template>

<script>
export default {
  name: "MyAccount",
  mounted(){
    this.$store.state.context = 'my-account';
  }
}
</script>
