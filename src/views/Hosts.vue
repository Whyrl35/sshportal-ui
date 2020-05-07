<template>
  <div id="app">
    <Navbar/>
    <HostList/>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue';
  import HostList from '@/components/HostList.vue';
  export default {
    name: 'sessions',
    components: {
      Navbar,
      HostList,
    },
  }
</script>