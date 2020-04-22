<template>
  <div id="app">
    <Navbar/>
    <AclList/>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue';
  import AclList from '@/components/AclList.vue';
  export default {
    name: 'sessions',
    components: {
      Navbar,
      AclList,
    },
  }
</script>