<template>
  <div id="app">
    <ItemListModal v-bind:title="title" v-bind:listInfo="modalInfo" v-bind:showModal="showModal" v-on:update-show="showModal=$event"/>
    <ItemList v-bind:tableData="tableData" v-bind:title="title" v-on:details="viewDetails($event)" />
  </div>
</template>
<script>
import ItemList from "@/components/ItemListing.vue";
import ItemListModal from "@/components/ItemListingModal.vue";
export default {
  name: "hostgroups",
  components: {
    ItemListModal,
    ItemList
  },
  props: ["page"],
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
      title: "HostGroups",
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
          process.env.VUE_APP_API_URL + "/v1/host_group/" + this.tableData.rows[row]["id"]
        )
        .then(response => {
          this.modalInfo.badges = [
            { title: "ID", value: response.data.id, color: this.$globalBadgeColor },
            { title: "Name", value: response.data.name, color: this.$globalBadgeColor }
          ];
          this.modalInfo.data = [
            { title: "ACLs", links: response.data.acls.map(x => 'acl: ' + x.id) },
            { title: "Hosts", links: response.data.hosts.map(x => x.name) },
            { title: "Created", value: new Date(response.data.created_at).toLocaleString() },
            { title: "Updated", value: new Date(response.data.updated_at).toLocaleString() },
            { title: "Comment", value: response.data.comment }
          ];
          this.$nextTick(function() {
            this.showModal = true;
          });
        })
        .catch(err => {
          console.log(err);
          this.showModal = false;
        });
    }
  },
  beforeMount() {
    this.$http
      .get(process.env.VUE_APP_API_URL + "/v1/host_groups")
      .then(response => {
        let data = response.data.reverse();
        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({
          label: "NAME",
          field: "name",
          sort: true
        });
        this.tableData.columns.push({
          label: "HOSTS",
          field: "hosts",
          sort: true
        });
        this.tableData.columns.push({
          label: "ACLS",
          field: "acls",
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
          item["hosts"] = item["hosts"].length;
          item["acls"] = item["acls"].length;
          item["updated_at"] = this.timeSince(new Date(item["updated_at"]));
          item["created_at"] = this.timeSince(new Date(item["created_at"]));
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
};
</script>