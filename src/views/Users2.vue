<template>
  <div>
    <ItemListModal v-bind:listInfo="modalInfo" v-bind:showModal="showModal" v-on:update-show="showModal=$event"/>
    <ItemList v-bind:tableData="tableData" v-bind:title="title" v-on:details="viewDetails($event)"/>
  </div>
</template>
<script>
import ItemList from '@/components/ItemListing.vue';
import ItemListModal from '@/components/ItemListingModal.vue';
export default {
  name: 'userlist',
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
      title: "User",
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
          process.env.VUE_APP_API_URL + "/v1/user",
          { params: {'name': this.tableData.rows[row]["name"]} }
        )
        .then(response => {
            console.log(response)
            this.modalInfo.badges = [
              { title: "ID", value: response.data.id, color: this.$globalBadgeColor },
              { title: "Name", value: response.data.name, color: this.$globalBadgeColor },
            ];
            this.modalInfo.data = [
              { title: 'Email', value: response.data.email, links: undefined },
              { title: 'Roles', value: undefined, links: response.data.roles.map(x => x.name) },
              { title: 'Keys', value: undefined, links: response.data.keys.map(x => "key: " + x.id) },
              { title: 'Groups', value: undefined, links: response.data.groups.map(x => x.name) },
              { title: 'Invite token', value: response.data.invite_token, links: undefined },
              { title: 'Created', value: new Date(response.data.created_at).toLocaleString(), links: undefined },
              { title: 'Updated', value: new Date(response.data.updated_at).toLocaleString(), links: undefined },
              { title: 'Comment', value: response.data.comment, links: undefined },
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
      .get(process.env.VUE_APP_API_URL + "/v1/users")
      .then(response => {
        let data = response.data.users.reverse();
        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({
          label: "NAME",
          field: "name",
          sort: true
        });
        this.tableData.columns.push({
          label: "PASSWORD",
          field: "password",
          sort: true
        });
        this.tableData.columns.push({
          label: "EMAIL",
          field: "email",
          sort: true
        });
        this.tableData.columns.push({
          label: "INVITE-TOKEN",
          field: "invite_token",
          sort: true
        });
        this.tableData.columns.push({
          label: "IS ADMIN",
          field: "is_admin",
          sort: true
        });
        this.tableData.columns.push({
          label: "UPDATED",
          field: "updated_at",
          sort: true
        });
        this.tableData.columns.push({
          label: "CREATED",
          field: "created_at",
          sort: true
        });
        this.tableData.columns.push({
          label: "COMMENT",
          field: "comment",
          sort: true
        });

        for (const item of data) {
          item["updated_at"] = this.timeSince(new Date(item["updated_at"]));
          item["created_at"] = this.timeSince(new Date(item["created_at"]));
          item["password"] = item['password'] ? "********" : null
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