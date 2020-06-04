<template>
  <div id="app">
    <UserRolesList/>
  </div>
</template>
<script>
  import UserRolesList from '@/components/UserRolesList.vue';
  export default {
    name: 'userroleslist',
    components: {
      UserRolesList,
    },
    props: ['page']
  }
</script>