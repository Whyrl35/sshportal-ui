<template>
  <div id="app">
    <UserGroupsList/>
  </div>
</template>
<script>
  import UserGroupsList from '@/components/UserGroupsList.vue';
  export default {
    name: 'usergroupslist',
    components: {
      UserGroupsList,
    },
    props: ['page']
  }
</script>