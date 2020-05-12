<template>
  <div id="app">
    <AclList/>
  </div>
</template>
<script>
  import AclList from '@/components/AclList.vue';
  export default {
    name: 'sessions',
    components: {
      AclList,
    },
    props: ['page']
  }
</script>