<template>
  <div id="app">
    <Signin />
  </div>
</template>
<script>
  import Signin from '@/components/Signin.vue';
  export default {
    name: 'login',
    components: {
      Signin
    },
    props: ['page']
  }
</script>