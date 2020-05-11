<template>
  <div id="app">
    <HostList/>
  </div>
</template>
<script>
  import HostList from '@/components/HostList.vue';
  export default {
    name: 'sessions',
    components: {
      HostList,
    },
  }
</script>