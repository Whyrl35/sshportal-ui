
<template>
  <div>
    <mdb-modal size="lg" :show="modal" @close="modal = false" info>
      <mdb-modal-header :color="$globalThemeColorDark">
        <mdb-modal-title>UserGroups details</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="d-flex flex-row pb-3">
          <div class="flex-fill pr-1">
            <h3>
              <mdb-badge :color="$globalBadgeColor" class="w-100 p-2">ID: {{group.id}}</mdb-badge>
            </h3>
          </div>
          <div class="flex-fill">
            <h3>
              <mdb-badge :color="$globalBadgeColor" class="w-100 p-2">Name: {{group.name}}</mdb-badge>
            </h3>
          </div>
        </div>
        <div>
          <mdb-tbl responsive>
            <mdb-tbl-body>
              <tr>
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">Users</th>
                <td>
                  <div style="max-height:150px; overflow:auto;">
                    <div v-for="item in group.users" :key="item.id">
                        <a href="#">
                            {{ item.name }}
                            <mdb-icon icon="external-link-alt" />
                        </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">Created at</th>
                <td>{{group.created_at}}</td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">Updated at</th>
                <td>{{group.updated_at}}</td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="info" @click.native="modal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <div>
      <section id="events" class="p-5">
        <mdb-row>
          <mdb-col xl="12" lg="12" md="12" class="mb-r">
            <h1>UserRoles list</h1>
            <small>click on row to view details</small>
          </mdb-col>
          <mdb-col xl="12" lg="12" md="12" class="mt-4">
            <!-- scrollY :maxHeight="xxx" -->
            <mdb-datatable
              id="mytable"
              name="mytable"
              v-on:selectRow="viewDetails"
              :data="tableData"
              striped
              bordered
              responsive
              hover
              hoverColor="red"
              selectColor="red"
              :selected="2"
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
<script>
export default {
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
      modal: false,
      group: {}
    };
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    }
  },
  methods: {
    viewDetails(row) {
      // some error here, id not always found, and host not working...
      this.$http
        .get(
          process.env.VUE_APP_API_URL + "/v1/usergroup/" + this.tableData.rows[row]["id"]
        )
        .then(response => {
            this.group = response.data;
            this.group.created_at = new Date(this.group.created_at).toLocaleString()
            this.group.updated_at = new Date(this.group.updated_at).toLocaleString()

          this.$nextTick(function() {
            this.modal = true;
          });
        })
        .catch(err => {
          console.log(err);
          this.modal = false;
        });
    },
  },
  beforeMount() {
    this.$http
      .get(process.env.VUE_APP_API_URL + "/v1/userroles")
      .then(response => {
        let data = response.data.reverse();
        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({
          label: "NAME",
          field: "name",
          sort: true
        });
        this.tableData.columns.push({
          label: "USERS",
          field: "users_count",
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

        for (const item of data) {
          item["updated_at"] = this.timeSince(new Date(item["updated_at"]));
          item["created_at"] = this.timeSince(new Date(item["created_at"]));
          item["users_count"] = item['users'].length;
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
