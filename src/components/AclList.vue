<template>
  <div>
    <mdb-modal size="lg" :show="modal" @close="modal = false" info>
      <mdb-modal-header>
        <mdb-modal-title>Acls details</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="d-flex flex-row  py-2">
          <div class="flex-fill px-2"><h3><mdb-badge color="primary" class="w-100 p-2">ID: {{acl.id}}</mdb-badge></h3></div>
          <div class="flex-fill px-2"><h3><mdb-badge :color="acl.action_color" class="w-100 p-2">Action: {{acl.action}}</mdb-badge></h3></div>
          <div class="flex-fill px-2"><h3><mdb-badge color="info" class="w-100 p-2">created: {{acl.created_humain}}</mdb-badge></h3></div>
          <div class="flex-fill px-2"><h3><mdb-badge color="info" class="w-100 p-2">modified: {{acl.updated_humain}}</mdb-badge></h3></div>
        </div>
        <div>
          <mdb-tbl responsive>
            <mdb-tbl-body>
              <tr >
                <th class="default-color text-white text-center" style="width: 100px">Weight</th>
                <td>{{acl.weight}}</td>
              </tr>
              <tr>
                <th class="default-color text-white text-center">comment</th>
                <td>{{acl.comment}}</td>
              </tr>
              <tr>
                <th :rowspan="users.length + 1" class="default-color text-white text-center">{{ acl.user_groups.name }}<br/>(user group)</th>
              </tr>
              <tr v-for="user in users" :key="user.name">
                <td><router-link :to="{ name: 'acls' }">{{ user.name }}</router-link></td>
              </tr>
              <tr>
                <th :rowspan="hosts.length + 1" class="default-color text-white text-center">{{ acl.host_groups.name }}<br/>(host group)</th>
              </tr>
              <tr v-for="host in hosts" :key="host.name">
                <td><router-link :to="{ name: 'acls' }">{{ host.name }}</router-link></td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="info" @click.native="modal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <div style="padding-top: 60px">
      <section id="events" class="p-5">
        <mdb-row>
          <mdb-col xl="12" lg="12" md="12" class="mb-r">
            <h1>Acls list</h1><small>click on row to view details</small>
          </mdb-col>
          <mdb-col xl="12" lg="12" md="12" class="mt-4">
            <!-- scrollY :maxHeight="xxx" -->
            <mdb-datatable id="mytable" name="mytable" v-on:selectRow="viewDetails"
              :data="tableData"
              striped
              bordered
              responsive
              hover
              hoverColor="red"
              selectColor="red"
              :selected=2
              :borderless="true"
              :display="3"
              :tfoot="false"
            />
          </mdb-col>
        </mdb-row>
      </section>
    </div>
  </div>
</template>
<style>
.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #33b5e5;
  color: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
      modal: false,
      acl: {
        host_groups: {},
        user_groups: {},
        action_color: 'warning',
      },
      users: [],
      hosts: [],
    }
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    },
  },
  methods: {
    viewDetails(row) {
      // some error here, id not always found, and host not working...
      this.$http.get(process.env.VUE_APP_API_URL + "/v1/acl/" + this.tableData.rows[row]['id'])
      .then(response => {
        this.acl = response.data
        this.acl.created_humain = this.timeSince(new Date(response.data.created_at), true)
        this.acl.updated_humain = this.timeSince(new Date(response.data.updated_at), true)
        this.acl.action_color = response.data.action == "allow" ? "success" : "danger"

        this.$http.get(process.env.VUE_APP_API_URL + "/v1/usergroup/" + this.acl.user_groups.id).then(response => {
          this.users = response.data.users
        })
        this.$http.get(process.env.VUE_APP_API_URL + "/v1/host_group/" + this.acl.host_groups.id).then(response => {
          this.hosts = response.data.hosts
        })
        this.$nextTick(function () {
          this.modal = true
        })
      })
      .catch(err => {
        console.log(err);
        this.modal = false
      });
    },
    timeSince(date, short_format) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return !short_format ? interval + " years ago" : interval + "y ago"
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return !short_format ? interval + " months ago" : interval + "mth ago"
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return !short_format ? interval + " days ago" : interval + "d ago"
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return !short_format ? interval + " hours ago" : interval + "h ago"
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return !short_format ? interval + " minutes ago" : interval + "min ago"
      }
      return !short_format ? interval + " secondes ago" : interval + "s ago"
    },
    timeBetween(start, end, short_format) {
      var duration = new Date(end - start);
      var h = duration.getHours() - 1;
      var m = duration.getMinutes();
      var s = duration.getSeconds();
      if (short_format) {
        return h > 0 ? h + "h" : m > 0 ? m + "m" : s > 0 ? s + "s" : "";
      }
        return h > 0 ? h + " hours" : m > 0 ? m + " minutes" : s > 0 ? s + " secondes" : "";
    }
  },
  mounted() {
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
};
</script>
