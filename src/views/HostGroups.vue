<template>
  <div id="app">
    <HostGroupsList/>
  </div>
</template>
<script>
  import HostGroupsList from '@/components/HostGroupsList.vue';
  export default {
    name: 'sessions',
    components: {
      HostGroupsList,
    },
    props: ['page']
  }
</script>