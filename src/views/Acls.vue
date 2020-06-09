<template>
  <div id="app">
    <ItemListModal v-bind:title="title" v-bind:listInfo="modalInfo" v-bind:showModal="showModal" v-on:update-show="showModal=$event"/>
    <ItemList v-bind:tableData="tableData" v-bind:title="title" v-on:details="viewDetails($event)"/>
  </div>
</template>
<script>
  import ItemList from '@/components/ItemListing.vue';
  import ItemListModal from '@/components/ItemListingModal.vue';
  export default {
    name: 'acls',
    components: {
      ItemListModal,
      ItemList,
    },
    props: ['page'],
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
      title: "Acls",
      showModal: false,
      modalInfo: {}
    };
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    }
  },
  methods: {
    viewDetails(event) {
      let row = event;
      this.$http
        .get(
          process.env.VUE_APP_API_URL + "/v1/acl/" + this.tableData.rows[row]['id']
        )
        .then(response => {
            this.modalInfo.badges = [
              { title: "ID", value: response.data.id, color: this.$globalBadgeColor },
              { title: "Action", value: response.data.action, color: response.data.action == "allow" ? "success-color":"danger-color" },
            ];
            this.modalInfo.data = [
              { title: 'Weigth', value: response.data.weigth },
              { title: 'UserGroup', links: [ response.data.user_groups.name ] },
              { title: 'HostGroup', links: [ response.data.host_groups.name ] },
              { title: 'Created', value: new Date(response.data.created_at).toLocaleString(), },
              { title: 'Updated', value: new Date(response.data.updated_at).toLocaleString(), },
              { title: 'Comment', value: response.data.comment, },
            ];
          this.$nextTick(function() {
            this.showModal = true;
          });
        })
        .catch(err => {
          console.log(err);
          this.showModal = false;
        });
    },
  },
  beforeMount() {
    this.$http
      .get(process.env.VUE_APP_API_URL + "/v1/acls")
      .then(response => {
        let data = response.data.reverse();

        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({ label: "WEIGHT", field: "weight", sort: true });
        this.tableData.columns.push({ label: "USER GROUP", field: "usergroup", sort: true });
        this.tableData.columns.push({ label: "HOST GROUP", field: "hostgroup", sort: true });
        this.tableData.columns.push({ label: "HOST PATTERN", field: "host_pattern", sort: true });
        this.tableData.columns.push({ label: "ACTION", field: "action", sort: true });
        this.tableData.columns.push({ label: "UPDATED", field: "updated_at", sort: true });
        this.tableData.columns.push({ label: "CREATED", field: "created_at", sort: true });
        this.tableData.columns.push({ label: "COMMENT", field: "comment", sort: true });

        for (const item of data) {
          item['usergroup'] = item['user_groups']['name']
          item['hostgroup'] = item['host_groups']['name']
          item['updated_at'] = this.timeSince(new Date(item['updated_at']))
          item['created_at'] = this.timeSince(new Date(item['created_at']))
          this.tableData.rows.push(item);
        }
      })
      .catch(err => {
        console.log(err);
        this.$bvToast.toast(err.message, {
            title: "Error when getting sessions",
            autoHideDelay: 15000,
            variant: "danger",
            solid: true,
            appendToast: true
        });
      });
    }
  }
</script>