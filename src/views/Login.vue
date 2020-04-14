<template>
  <div id="app">
    <Navbar />
    <Signin />
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue';
  import Signin from '@/components/Signin.vue';
  export default {
    name: 'login',
    components: {
      Navbar,
      Signin
    }
  }
</script>